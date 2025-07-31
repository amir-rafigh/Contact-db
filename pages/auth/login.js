import users from "@/models/users"
import ConnectDB from "@/utils/connectdb"
import Styles from "@/styles/login.module.css"
import { useState } from "react"
export default async function Login (){
    const [form_data , setForm_data]=useState({
        Email:"",
        Password:""

    })
    const getFormData =(e)=>{
        setForm_data({...form_data , [e.target.name]:e.target.value})

    }

  
    


    return(
        <div className={Styles.container}>
            <form className={Styles.form}>
                <input onChange={getFormData} type="email" name="Email" placeholder="Email"/>
                <input onChange={getFormData} type="password" name="Password" placeholder="Password"/>
                <button>Login</button>
                <div className={Styles.register}>
                    <p>Not Registered?</p>
                    <span style={{color:"green"}}>Create an account</span>
                </div>

            </form>
        </div>
    )
}