import ConnectDB from "@/utils/connectdb";
import modelcontacts from "@/models";

export default async function (req , res){

    await ConnectDB();
    if(req.method==="GET"){
        const contacts = await modelcontacts.find()
        const{gen , search}=req.query
        if(search && gen){
            const data = await modelcontacts.find({$and:[{$or:[{FirstName:search},{LastName:search}]},{Gender:gen}]})
            if(data.length>0){
                res.json(data)
            }
            else{
                res.json("")
            }
        }
        else if(gen){            
            const data= await modelcontacts.find({Gender:gen})
            if(data.length>0){
                res.json(data)
            }
            else{
                res.json("")
            }


        }
        else if(search){
            const data = await modelcontacts.find({$or:[{FirstName:search},{LastName:search}]})
            if(data.length>0){
                res.json(data)
            }
            else{
                res.json("")
            }
        }



        try{
            const contacts = await modelcontacts.find()
            res.status(200).json(contacts)
            

        }catch(error){
            res.status(500).json({message:"error server"})

        }
    }
    else if(req.method=="POST"){
        try{
            await modelcontacts.create(req.body)
            res.status(201).json("create new contact successfully")
        }
        catch(error){            
            res.status(500).json(error.message)
        }
    }

    
    
    


}