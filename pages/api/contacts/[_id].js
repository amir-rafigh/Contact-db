import modelcontacts from "@/models";
import ConnectDB from "@/utils/connectdb";

export default async function handler(req , res){
    const{_id}= req.query
    await ConnectDB()
    if(req.method=="PUT"){
        try{
            await modelcontacts.findByIdAndUpdate(_id , req.body , {
                runValidators: true
            })
            res.status(200).json({message:"Document successfully updated"})
        }
        catch(error){
            res.status(400).json({ message: error.message });
        }
        

    }
    if(req.method=="DELETE"){
        try{
           const response = await modelcontacts.findByIdAndDelete(_id)
           if(response){
             res.json({message:"document successfully Deleeeted"})
           }
           else{
            res.json({message:"user already deleted"})  
              }


        }
        catch(error){
            res.json(error)
        }
        

    }

}