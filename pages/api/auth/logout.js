import { serialize } from "cookie";

export default async function handler(req , res){
    res.setHeader("Set-Cookie" , serialize("token" , "" , {
        sameSite:"strict",
        path:"/",
        httpOnly:"true",
        maxAge:0       

    }))
    res.status(200).json({message:"successfully logout"})
}