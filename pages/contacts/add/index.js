import Contact from "@/components/Contact";
import ValidToken from "@/utils/valid_token";
import { verify } from "jsonwebtoken";

export default function Addcontact({User_Id}){
    return(
        <>
        <Contact User_Id={User_Id}/>
        </>
    )
}

export async function getServerSideProps(context){
    const res_Valid = await ValidToken(context)
    if(res_Valid === false){
        
      return{
        redirect:{
            destination:"/auth/login"

        }
      }
        
    }
    

    
    return{
        props:{User_Id:res_Valid.User_Id}
    }

}
