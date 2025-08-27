// import mongoose from "mongoose";
// export default async function ConnectDB(){
//     try{
//         if(mongoose.connection.readyState==1){
//             console.log("Already connected")
//             return
//         }
//        await mongoose
//        .connect(process.env.API_URI)
//         .then(() => {
//             console.log("successfully connected")
             
//           })
          
        
//     }catch(err){
//         console.log("disconnected");      

//     }
    
// }


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


// /utils/connectdb.js
import mongoose from "mongoose";
let cached = global._mongoose || (global._mongoose = { conn:null, promise:null });
export default async function ConnectDB(){
  if (cached.conn) return cached.conn;
  if (!cached.promise)
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { bufferCommands:false }).then(m=>m);
  cached.conn = await cached.promise;
  return cached.conn;
}
