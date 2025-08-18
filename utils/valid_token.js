import { verify } from "jsonwebtoken"
import { redirect } from "next/dist/server/api-utils"

export default async function ValidToken(context){
    const{token}=context.req.cookies
    if(!token){
        return false       
    }
    try{
       const Payload = verify(token , process.env.Secret_Key)
       return Payload  
        
    }catch(error){
        return false        
    }

}