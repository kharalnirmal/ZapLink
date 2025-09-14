import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema =   new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true ,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
},{timestamps:true})



// WHY hash password before saving? Never store plain text passwords
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
    })


// WHY instance method? Reusable way to compare passwords
    userSchema.methods.isPasswordMatch = async function (password){
        return await bcrypt.compare(password,this.password)
    }



export const User = mongoose.model("User",userSchema)