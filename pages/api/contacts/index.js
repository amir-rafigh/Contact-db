import ConnectDB from "@/utils/connectdb";
import modelcontacts from "@/models";
import { verify } from "jsonwebtoken";
import generateFilter from "@/utils/generatefilter";

export default async function (req , res){
    
    await ConnectDB();
    if(req.method==="GET"){
        gethandler(req , res)      
    }
    else if(req.method=="POST"){
        posthandler(req , res)
        
    }
}


async function gethandler(req , res){
    try{
        const{gen , search , User_Id} = req.query
        const contacts = await modelcontacts.find(generateFilter({gen , search},User_Id)).populate("User_Id" , "-Password -Role")
        res.status(200).json(contacts)
        

    }catch(error){
        res.status(500).json({message:"error server"})

    }
}


async function posthandler(req , res){
    try{
        await modelcontacts.create(req.body)
        res.status(201).json({message:"create new contact successfully"})
    }
    catch(error){            
        res.status(500).json(error.message)
    }

}
