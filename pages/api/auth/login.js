import users from "@/models/users"
import ConnectDB from "@/utils/connectdb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"
export default async function handler(req , res){
    if(req.method !== "POST"){
        return res.status(405).json({message:"method not allowed"})
    }
    try{

        await ConnectDB()
        const {Email , Password}= req.body
        if(!Email || !Password){
            return res.status(422).json({message:"All fields must be filled "})
        }
        const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!regexEmail.test(Email)){
            return res.status(422).json({message:"Email or password is invalid"})
        }
        const isValidUser = await users.findOne({Email})
        
        if(!isValidUser){
            return res.status(422).json({message:"Email or PassWord is invalid"})
        }
        const isValidPassword = await bcrypt.compare(Password , isValidUser.Password)    
        if(!isValidPassword){
            return res.status(422).json({message:"Email or password is invalid"})
        }      

        const JWT = jwt.sign({Email:isValidUser.Email , Role :isValidUser.Role , User_Id :isValidUser._id}, process.env.Secret_Key ,
           {expiresIn:"2h"})
        

        // res.setHeader("Set-Cookie" , serialize("token" , JWT , {
        //     httpOnly:true,
        //     sameSite:"strict",
        //     path:"/",
        //     maxAge: 60 *60 * 3

        // }))

        ///////////////////////////////////
        // because the secure true in the local didn't run

        res.setHeader(
            "Set-Cookie",
            serialize("token", JWT, {
              httpOnly: true,
              secure: true,        
              sameSite: "lax",       
              path: "/",
              maxAge: 60 * 60 * 3,
            })
          );



        res.status(200).json({message:"login  successfully"})
        




    }catch(err){
        res.status(500).json({message:"server error"})
    }
}