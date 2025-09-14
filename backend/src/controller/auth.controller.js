import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";




// WHY helper function? Keeps our code DRY

const generateToken =(userId)=>{
    return jwt.sign({ userId },process.env.JWT_SECRET,{ expiresIn:"7d" })
} ;


const register = async (req,res)=>{
    try {
        const { email, password,username} = req.body;
     
        //  check the  given Credential are true or not 

         if(!username || !email || !password){
            return res.status(400).json({error:"All fields are required"})
         }

         //password checking
            if(password.length < 6){
                return res.status(400).json({error: "Password must be at least 6 characters"})
            }

         //check if user already exists or not
          const existingUser = await User.findOne({email})
          if(existingUser){
            return res.status(400).json({error : "User already exists"})
          }

            //create new user
            const newUser =  new User({
                username,
                email,
                password
            })
            await newUser.save();
            const token = generateToken(newUser._id)

    res.status(201).json({
         message:"user registered successfully",
         token,
       user:{
        id:newUser._id,
        username:newUser.username,
        email:newUser.email
       }
    })

    } catch (error) {
           console.error(error);
        res.status(500).json({message:"server error",error: error.message
        })
    }
};

const  login = async (req, res)=>{
    try {
        const {email,password} = req.body ;
//check if the credentials are true  or not

if (!email || !password){
    return  res.status(400).json({error : "Email and Password is required"})
};

//check if user exists
const  existingUser =  await User.findOne ({email});
if(!existingUser){
    return res.status(400).json({error :"User does not exist . Please register first"})
};
//check if password matches or not
const isPasswordCorrect = await existingUser.isPasswordMatch(password)
if(!isPasswordCorrect){
    return res.status(400).json({error : "Invalid Password"})
}
const token = generateToken(existingUser._id)

res.status(200).json({
    message:"Login Successful",
    token,
    user:{
        id:existingUser._id,
        username:existingUser.username,
        email:existingUser.email
    }
})


    } catch (error) {
           console.error(error);
        res.status(500).json({message:"server error",error: error.message
        })
    }
}


export {register , login}