const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[30,"Please Enter the less then 30 charctor"],
        minLength:[4,"please Enter at lest 5"]
    },
    email: {
        type:String,
        required:[true,"please Enter the Email"],
        validate:[validator.isEmail,"please Enter the valid Email"],
        unique:true
    },
    password: {
        type:String,
        required:[true,"please Enter the Password"],
        minLength:[6,"Enter atleast 6 characters"],
        select:false

    },
    avatar: {
        
            public_id:{
                type:String,
                required:true
            },
           url:{
               type:String,
               required:true
            }
        
    },
    role: {
        type:String,
        default:"user",
    },
    createAt:{
       type:Date,
       default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})
// password bcrypt
UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//jwt token
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password
UserSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword ,this.password)
}


// generate password reset Token
UserSchema.methods.getresetPasswordToken = async function(){
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing to resetToken and userSchima
     this.resetPasswordToken = crypto
     .createHash('sha256')
     .update(resetToken)
     .digest("hex");

     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //

     return resetToken;
}

var User =  mongoose.model("User",UserSchema);
module.exports = User;