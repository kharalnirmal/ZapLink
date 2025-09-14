import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
// import bcrypt from "bcrypt";

export const protect = async (req,res,next)=>{
try {
        let token;
        
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
           token =  req.headers.authorization.split(" ")[1];
        }
    
        if(!token){
            return res.status(401).json({message:"Not authorized, no token"})
        }
    
        // WHY verify token? Make sure it's valid and not expired
    
        const decode = jwt.verify(token,process.env.JWT_SECRET);
    // WHY find user? Attach user info to request for use in controllers
    req.user = await User.findById(decode.userId).select("-password");
    
     if (!req.user) {
          return res.status(401).json({ error: 'User not found' });
        }
    
        next(); // Continue to the protected route
} 
catch (error) {
    console.error(error)
    res.status(401).json({message:"Not authorized, token failed",error: error.message })}

}