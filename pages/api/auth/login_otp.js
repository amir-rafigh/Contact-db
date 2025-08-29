import users from "@/models/users";
import ConnectDB from "@/utils/connectdb"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export default async function handler(req , res){
    const {code , phone} = req.body
    await ConnectDB();
    const get_code = await users.findOne({Code:code , Phone:phone})
    if(!get_code){
        res.status(422).json({message:"code is invalid"})
    }
    if(new Date().getTime()>get_code.Exp_time){
        res.status(422).json({message:"code is expired"})

    }
    
    const JWT = jwt.sign({Email:get_code.Email , Role :get_code.Role , User_Id :get_code._id}, process.env.Secret_Key ,
        {expiresIn:"2h"})
    
    res.setHeader("Set-Cookie" , serialize("token" , JWT , {
        httpOnly: true,
        sameSite:"lax",
        path:"/",
        maxAge: 60 *60 * 3,
        secure : true

    }))

    res.status(200).json({message:"login  successfully"})

    
    
    
    
}