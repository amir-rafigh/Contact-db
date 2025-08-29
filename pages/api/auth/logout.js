import { serialize } from "cookie";

export default async function handler(req , res){
  if (req.method !== "POST") return res.status(405).end();
  const isProd = process.env.NODE_ENV === "production";
  const base = { httpOnly:true, secure:isProd, sameSite:"lax" };

  res.setHeader("Set-Cookie", [
    serialize("token", "", { ...base, path:"/",   maxAge:0, expires:new Date(0) }),
    serialize("token", "", { ...base, path:"/api", maxAge:0, expires:new Date(0) }), // احتیاط
  ]);
  res.setHeader("Cache-Control", "no-store, private");
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
