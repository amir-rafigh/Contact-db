import users from "@/models/users";
import ConnectDB from "@/utils/connectdb";
import { verify } from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
import Styles from "@/styles/dashboard.module.css"
import ValidToken from "@/utils/valid_token";
export default function Dashboard({res}){
    
    return(
        <div className={Styles.Dashboard}>
            <h1> hi {res.FirstName} {res.LastName}</h1>
            {res.Role=="admin"?<h1>{res.Role}</h1>:""}
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
    const data = await users.findOne({Email: res_Valid.Email})   
    const res =  JSON.parse(JSON.stringify(data))    



    return{
        props:{res}
    }
}