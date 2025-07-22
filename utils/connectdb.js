import mongoose from "mongoose";
export default async function ConnectDB(){
    try{
        if(mongoose.connection.readyState==1){
            console.log("Already connected")
            return
        }
       await mongoose
        .connect("mongodb://localhost:27017/next-contact-2")
        .then(() => {
            console.log("successfully connected")
             
          })
          
        
    }catch(error){
        console.log(error);      

    }
    
}