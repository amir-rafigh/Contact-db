import { verify } from "jsonwebtoken"

 export default async function handler(req , res){
    const {token} = req.cookies
    if(!token){
        res.status(401).json({message:"unauthorized"})
    }
    try{
        const Payload = verify(token , process.env.Secret_Key)
        console.log(Payload);
        

    }catch(error){
        res.status(401).json({message:"error"})
    }


    
 }