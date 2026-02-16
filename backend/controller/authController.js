import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{
    try {
        const{name,email,password}=req.body;
        const userExist=await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User already exists..!"});
        }

        const hashedpassword=await bcrypt.hash(password,10);


        const user =await User.create(
            {
            name,
            email,
            password:hashedpassword
            }
        );

        res.status(200).json(
            {
                _id:user._id,
                name:user.name,
                email:user.email
            }
        );


    } catch (error) {
        res.status(400).json({message:error.message});
        
    }
}

export const loginUser=async(req,res)=>{
    try {
        
        const{email,password}=req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid CRedentails"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        );

        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}