import bcrypt from "bcrypt"
import users from "@/models/users"
import ConnectDB from "@/utils/connectdb"
export default async function handler(req, res){
    if(req.method !=="POST"){
       return res.status(405).json({message:"Method not allowed"})
      }


    try{      

    const {FirstName , LastName , Email , Password , Role , Phone}= req.body
    if(!FirstName || !LastName || !Email || !Password || !Role || !Phone){
        return res.status(422).json({message:"all fields must be fill"})
    }

      
      if(Password.length<8){
        return res.status(422).json({message:"password must to be more than 8 character"})
      }

      if(!Phone.match(/09\d{9}/)|| Phone.length>11){
        return res.status(422).json({message:"please enter a valid phone number"})
        }

      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if(!regexEmail.test(Email)){
        return res.status(422).json({message:"email is invalid"})
      }
      
      await ConnectDB();
      const isEmail = await users.findOne({Email})
      if(isEmail){
        return res.status(409).json({message :"This email Already registered"})
      }
      
      const hashpass = await bcrypt.hash(Password , 10)
      
      const countUser = await users.countDocuments()
      await users.create({...req.body , Password:hashpass , Role: countUser>0?"user":"admin"})
      res.status(201).json({message:"regiter successfully"})
      
    }catch(error){
      res.status(500).json({message:"error server"})
    }
    
    


}