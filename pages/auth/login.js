import Styles from "@/styles/login.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaEyeSlash, FaRegEye, FaSpinner  } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import Router, { useRouter } from "next/router";


export default  function Login ({isauth , setIsauth}){

    const [spinner , setSpinner]=useState(false)
    const [showpass , setShowpass]=useState(false)
    const passHandler =()=>{
        setShowpass(!showpass)
    }

    const [form_data , setForm_data]=useState({
        Email:"",
        Password:""

    })
    const getFormData =(e)=>{
        setForm_data({...form_data , [e.target.name]:e.target.value})


    }    
    const router = useRouter();
    const sendData=async(e)=>{
        setSpinner(true)
        e.preventDefault()

        // if(!form_data.Email || !form_data.Password){
        //     console.log("All fileds must be fill");
        //     return; 
            

        // }
        // const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        // if(!regexEmail.test(form_data.Email)){
        //     console.log("false");            
        //     return 
        // }


        const res = await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            body:JSON.stringify(form_data),
            headers:{"Content-type":"application/json"}
        }) 
        const data = await res.json()  
        setSpinner(false)
        if(res.status===200){
            toast.success(data.message)
            router.replace("/dashboard")
            setIsauth(true)
            
        }
        else{
            toast.error(data.message)
        }
        
        


    }
    useEffect(()=>{
        async function isToken(){
            const valid_token = await fetch("/api/auth/status")
            const res = await valid_token.json()
            if(valid_token.status==200){
                router.replace("/dashboard")
            }
            
        }
        isToken()

    },[])




    return(
        <>
        <ToastContainer />
        <div className={Styles.container}>
            <form className={Styles.form}>
                <div className={Styles.email}>                    
                    <input onChange={getFormData} type="email" name="Email" placeholder="Email"/>
                </div>

                <div className={Styles.password}>
                <input onChange={getFormData} type={showpass===true?"text":"password"} name="Password" placeholder="Password"/>
                {showpass===false?<FaRegEye onClick={passHandler}/>:<FaEyeSlash onClick={passHandler}/>}
                </div>

                <button onClick={sendData}>Login {spinner===true?<FaSpinner className={Styles.spinner} />:""} </button>
                <div className={Styles.register}>
                    <p>Not Registered? </p>
                    <Link style={{textDecoration:"none"}} href="/auth/register">
                        <span style={{color:"green"}}> Create an account</span>
                    </Link>
                </div>

            </form>
        </div>
        </>
    )
}