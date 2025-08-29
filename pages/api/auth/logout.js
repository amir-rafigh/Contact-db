import { serialize } from "cookie";

export default async function handler(req , res){
    const isProd = process.env.NODE_ENV === "production";

    res.setHeader("Set-Cookie" , serialize("token" , "" , {
        sameSite:"lax",
        path:"/",
        httpOnly:true,
        maxAge:0  ,
        secure: isProd,
     

    }))
    res.status(200).json({message:"successfully logout"})
}



// const isProd = process.env.NODE_ENV === "production";

// const cookie = serialize("token", "", {
//   httpOnly: true,
//   secure: isProd,
//   sameSite: "lax",   // اگر هنگام set هم lax بوده
//   path: "/",
//   maxAge: 0,
//   expires: new Date(0),
// });
