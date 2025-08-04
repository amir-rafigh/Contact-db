import Contact from "@/components/Contact";
import ValidToken from "@/utils/valid_token";
import { verify } from "jsonwebtoken";

export default function Addcontact(){
    return(
        <>
        <Contact/>
        </>
    )
}

export async function getServerSideProps(context){
    const res_Valid =  ValidToken(context)
    if(res_Valid === false){
      return{
        redirect:{
            destination:"/auth/login"
        }
      }
        
    }
    

    
    return{
        props:{}
    }

}
// const Token =jwt.sing("")