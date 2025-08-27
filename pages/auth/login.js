import Styles from "@/styles/login.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaEyeSlash, FaRegEye, FaSpinner  } from "react-icons/fa";
import { toast } from 'react-toastify';
import Router, { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";



export default  function Login ({isauth , setIsauth}){
    
    const [spinner , setSpinner]=useState(false)
    const [showpass , setShowpass]=useState(false)
    const [otp , setOtp]=useState(false)
    const [loginmethod , setLoginmethod]= useState(true)
    const [phone , setPhone]=useState(null)
    const[code , setCode]=useState(null)
    const[timer , setTimer]=useState(null)
    const router = useRouter();
    const {query} = router
    


    //check the authogin when click Contacts
    useEffect(() => {
        if (query.auth_token === "auth_required") {
          toast.error("Please log in to continue.");
        }
      }, [query.auth_token]);



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
    
    
    
    const sendData=async(e)=>{
        e.preventDefault()
        
        if(!form_data.Email || !form_data.Password){
            return toast.error("All fileds must be fill")
            
            
        }
        const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!regexEmail.test(form_data.Email)){
                return toast.error("Email is invali")
            }
            
            
            setSpinner(true)
            const res = await fetch("/api/auth/login",{
                method:"POST",
                body:JSON.stringify(form_data),
                headers:{"Content-Type":"application/json"}
            }) 
            
        const data = await res.json()  
        if(res.status===200){
            toast.success(data.message)
            router.replace("/dashboard")
            setIsauth(true)
            
        }
        else{
            toast.error(data.message)
        }
        setSpinner(false)
        
        


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
    const p_login_method =(e)=>{
        e.preventDefault()
        setLoginmethod(false)
    }
    const e_login_method =(e)=>{
        e.preventDefault()
        setLoginmethod(true)
    }



    //// login with phone number
    const codehandler=async(e)=>{
        e.preventDefault()
        try{

            const code = await fetch("/api/sms" , {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({phone})
            })
            const res = await code.json()
            if(code.status === 200){
                toast.success(res.message)
                setOtp(true)
                setTimer(30)
            
            }
            else if(code.status===422){
                toast.error(res.message)
            }
        
        }catch(err){
           toast.error(err.message)
            
        }



    }

    const otp_login =async(e)=>{
        e.preventDefault()

        try{

            const res = await fetch("/api/auth/login_otp",{
                method:"POST",
                body:JSON.stringify({code , phone}),
                headers:{"Content-Type":"application/json"}
            })
            const data = await res.json()

            if(res.status===422){
                toast.error(data.message)
            }
            if(res.status===200){
                toast.success(data.message)
                router.replace("/dashboard")
                setIsauth(true)
                
            }

            
        }catch(err){
            console.log(err);            
            toast.error(err.message)

        }



    }

    /////set Timer
    useEffect(()=>{
        let interval
        if(timer>0){
             interval = setInterval(() => {
                setTimer(timer - 1)
            }, 1000);
        }
        return()=>clearInterval(interval)

    },[timer])




    return(
        <>
        <div className={Styles.container}>
            <div>
                <img src="/Home/undraw_access-account_aydp (1).svg" alt="" />
            </div>
            <form >
                <div className={Styles.form_container}>
                    <div className={Styles.login_button}>
                        <button onClick={e_login_method} className={loginmethod?Styles.login_button_method:""}>Email</button>
                        <button onClick={p_login_method} className={!loginmethod?Styles.login_button_method:""}>Phone number</button>
                    </div>


                    
                    {loginmethod && <div className={Styles.form}>
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
                    </div>}

                    {!loginmethod && !otp &&  <div className={Styles.otp_phone}>
                        
                        <label>Phone Number :</label>
                        <input onChange={(e)=>setPhone(e.target.value)} type="string" name="" id="" placeholder="phone" />
                        <button onClick={codehandler}>send code</button>
                    </div>}

                    {!loginmethod && otp && <div className={Styles.otp_phone}>
                        
                        <label className={Styles.edit_phone}>Code : <p style={{alignItems:"center", display:"flex", gap:"0.2rem"}}  onClick={()=>setOtp(false)}><FaArrowLeftLong /> Edit phone number</p></label>
                        <input onChange={(e)=>setCode(e.target.value)} type="string" name="" id="" placeholder="code" />
                        {timer>0?<span>resend code after {timer}</span>:<span style={{color:"green" , fontSize:"14px" , cursor:"pointer" }} onClick={codehandler}>resend code</span>}
                        <button onClick={otp_login}>login</button>
                    </div> }


                  
               
                



                </div>
            </form>
        </div>
        </>
    )
}