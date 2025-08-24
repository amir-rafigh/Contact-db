import users from "@/models/users";
import ConnectDB from "@/utils/connectdb";
import { verify } from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
import Styles from "@/styles/dashboard.module.css"
import ValidToken from "@/utils/valid_token";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";



export default function Dashboard({res}){
 
    
    
    return(
        <div className={Styles.Dashboard}>
            <div className={Styles.Dashboard_Container}>
                <h1>Hi {res.FirstName} {res.LastName}</h1>
                <h3><FaSquarePhone /> Phone Number : {res.Phone}</h3>
                <h3> <MdEmail /> Email : {res.Email}</h3>                         
                <h3> <RiShieldUserFill /> Role : {res.Role}</h3>                         
            </div>
        </div>
        
    )
}

export async function getServerSideProps(context){
    const res_Valid = await ValidToken(context)
    if(res_Valid===false){
        
        return{
            redirect:{
                destination:"/auth/login"
            }
        }
    }


    await ConnectDB()
    const data = await users.findOne({Email: res_Valid.Email}).lean();
    const res =  JSON.parse(JSON.stringify(data))    



    return{
        props:{res}
    }
}