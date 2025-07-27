import users from "@/models/users"
import ConnectDB from "@/utils/connectdb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

        const Secret_Key = "adslkjf0934r9302tfr&*(^&*df"
        const JWT = jwt.sign({Email:isValidUser.Email , Role : isValidUser.Role},Secret_Key ,
            {expiresIn:"120m"}
        )
        res.status(200).json({message:"your login is successfully" , JWT })

    }catch(err){
        res.status(500).json({message:"server error"})
    }

}
