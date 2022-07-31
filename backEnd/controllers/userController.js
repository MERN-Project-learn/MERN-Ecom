const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require("../models/userModules");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const cloudinary = require("cloudinary");

//register user model
exports.registerUser = catchAsyncError( async(req,res,next)=>{

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id:myCloud.public_id,
          url:myCloud.secure_url,
        },
      });
     sendToken(user,201,res)
})

    // login 
    exports.loginUser =  catchAsyncError(async(req,res,next)=>{
       
         const {email,password} = req.body

         //checkhing email and password
         if(!email || !password){
             return next(new ErrorHandler('Invalid email or password'),400)
         }
         const user = await User.findOne({email}).select("+password");
         
         if(!user){
             return next(new ErrorHandler('Invalid email or password'),401)
         }
         const ispasswordMatched = user.comparePassword(password);

         if(!ispasswordMatched){
             return next(new ErrorHandler('Invalid email and password'),401)
         }

         sendToken(user,200,res)
    })

// logout user
exports.userLogout = catchAsyncError( async(req,res,next)=>{
res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly: true
})

    res.status(200).json({
        success: true,
        message:"logout user"
    })
})

//forget Password
exports.forgetPassword =  catchAsyncError(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})
     
    if(!user){
        return next(new ErrorHandler("user not found",404))
    }
    
    //get reset password token
    const resetToken = user.getresetPasswordToken()
    
    await user.save({validateBeforeSave:false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    console.log(resetPasswordUrl)
    const message = `your password has been reset is : - n\n ${resetPasswordUrl} n\nIf you have not requested this email then please ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: "kingstep Password Recovery",
            message,

        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })

        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(console.log(error.message),500));
        
    }

})

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  // update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });

  // update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
  
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

  // Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });

  // Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  // update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });
