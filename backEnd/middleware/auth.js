const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModules");


exports.isAuthentictedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("please login to access this resource"));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY)

     req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRole = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(  new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource` ,403
            ))
        }
        next()
    }
}