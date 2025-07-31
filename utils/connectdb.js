import mongoose from "mongoose";
export default async function ConnectDB(){
    try{
        if(mongoose.connection.readyState==1){
            console.log("Already connected")
            return
        }
       await mongoose
        .connect(process.env.API_URI)
        .then(() => {
            console.log("successfully connected")
             
          })
          
        
    }catch(error){
        console.log(error);      

    }
    
}