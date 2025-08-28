import users from "@/models/users";
import ConnectDB from "@/utils/connectdb";

export default async function handler(req , res) {
    if(req.method !== "POST"){
        return res.status(405).json({message:"method not allowed"})
    }
    const {phone} = req.body;

    if(!phone.match(/09\d{9}/)|| phone.length>11){
        return res.status(422).json({message:"please enter a valid phone number"})
        }


        await ConnectDB();
        const item  = await users.findOne({Phone:phone})
        if(!item){
            return res.status(422).json({message:"you must register to continue"})
        }

    const code = Math.floor(Math.random()*9000)+1000    
    const exp_time = new Date().getTime()+(120*1000)
    try{
        const send_sms = await fetch("https://api.sms.ir/v1/send/liketolike",{
            method:"POST",
            headers:{
                'ACCEPT' : "application/json",
                'Content-Type' : "application/json",
                'X-API-KEY' : process.env.X_API_KEY
            },
            body:JSON.stringify({
                lineNumber:"30002108003898",
                MessageTexts:[`کد تایید شما به سایت ${code} هستش. next1code.ir`],
                Mobiles:[phone],        
                SendDateTime: null

            })
            
        })
        if(send_sms.status===200){
            await users.findByIdAndUpdate(item._id , {$set:{Code:code , Exp_time:exp_time}})
            return res.status(200).json({message:"code send successfully"})
        }        
        

    }catch(err){
        res.status(500).json(err.message)
    }

    
    

    
}