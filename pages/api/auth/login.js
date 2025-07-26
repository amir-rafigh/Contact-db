export default function handler(req , res){
    if(req.method !== "POST"){
        return res.status(405).json({message:"method not allowed"})
    }
    const {Email , Password}= req.body
    if(!Email || !Password){
        return res.status(422).json({message:"All fields must be filled "})
    }

    

}