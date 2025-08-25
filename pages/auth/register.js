import Styles from "@/styles/register.module.css"
import { useState } from "react"
import Link from "next/link"
import {toast } from 'react-toastify';
import { FaEyeSlash, FaRegEye , FaSpinner  } from "react-icons/fa";
import { router } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import ValidToken from "@/utils/valid_token";
export default function Register(){
    const [showpass ,setShowpass]=useState(false)
    const [spinner , setSpinner]=useState(false)
    const[getdata , setGetdata]=useState({
        FirstName:"",
        LastName:"",
        Email:"",
        Password:"",
        Phone:"",
        Role:"user"
    })
    const getData =(e)=>{
        setGetdata({...getdata , [e.target.name]:e.target.value})
    }
    const sendData = async(e)=>{    
        setSpinner(true)    
        e.preventDefault();
        const data = await fetch("/api/auth/register" , {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(getdata)

        })
        const res = await data.json()
        
        setSpinner(false)
        if(data.status==201){
            toast.success(res.message || "Registered successfully")
            return router.replace("/auth/login")
        }
        else if(data.status==409){
            return toast.error(res.message)           
            
        }
        else if(data.status===422){
            return toast.error(res.message)
        }
        
        
        
        setGetdata({
            FirstName:"",
            LastName:"",
            Email:"",
            Password:"",
            Role:"user"
        })
        


    }

    return(
    
            <>
         <div className={Styles.container}>
            <div>
                <img src="/Home/undraw_welcome-cats_tw36.svg" alt="" />
            </div>
             <form className={Styles.form}>
                 <div className={Styles.name_information}>
                     <div>
                         <label>First Name</label>
                         <input onChange={getData} type="text" name="FirstName" id="" placeholder="FirstName" value={getdata.FirstName} />
                     </div>                     
                      <div>
                         <label>Last Name</label>                        
                         <input onChange={getData} type="text" name="LastName" id="" placeholder="LastName" value={getdata.LastName}/>
                      </div>
                 </div>

                 <div>                    
                     <label>Email Address</label>
                     <input onChange={getData} type="Email" name="Email" id="" placeholder="Email Address" value={getdata.Email}/>
                 </div>
                 <div>                    
                     <label>Phone number</label>
                     <input onChange={getData} type="Email" name="Phone" id="" placeholder="phone number" value={getdata.Phone}/>
                 </div>

                 <div className={Styles.password}>
                     <label>Password</label>
                     <div>
                        <input onChange={getData} type={showpass===false?"password":"text"} name="Password" id=""  placeholder="Password" value={getdata.Password}/>
                        {showpass===false?<FaRegEye onClick={()=>setShowpass(!showpass)}/>:<FaEyeSlash onClick={()=>setShowpass(!showpass)} />}
                     </div>

                 </div>               

                 <button onClick={sendData}>Sign Up {spinner===true?<FaSpinner className={Styles.spinner}/>:""}</button>
                 <p style={{textAlign:"center"}}>Already registered
                     <Link href="/auth/login" style={{textDecoration:"none"}}><span style={{color:"green"}}> Login</span></Link></p> 

             </form>
         </div>
        </>
    )
}
export  async function getServerSideProps(context){
    const isToken = await ValidToken(context)
   if(isToken){
    return{
        redirect:{
            destination:"/dashboard"
        }
    }
   }
    


    return{
        props:{}
    }
    
}