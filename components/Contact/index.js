import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react"
import Styles from "./contact.module.css"
export default function Contact({User_Id}){
    
    
    const[dataForm , setDataForm]=useState({
        FirstName:"",
        LastName:"",
        Age:"",
        Gender:"",
        Phone:"",
       
    })

    const  getDataHandler=(e)=>{       
        setDataForm({...dataForm , [e.target.name]:e.target.value , User_Id}) 
    }

    
    const addContactHandler=async(e)=>{        


        e.preventDefault();

        const formvalid = Object.values(dataForm).every((item=>item !== ""))
        if(!formvalid){
            return toast.error("please fill all the blanks")
        }
        const {FirstName , LastName , Age , Gender , Phone}= dataForm
        if(FirstName.length<3 || FirstName.length>15 || /\d/.test(FirstName)){
            return toast.error("firstname muste more than 3 character")
        }
        if(LastName.length<3 || LastName.length>15 || /\d/.test(LastName)){
            return toast.error("Firstname must be between 3 to 15 character and not to number")
        }
        if(Age<18){
            return toast.error("your age must be more than 18")
          }
        if(!Phone.match(/09\d{9}/)|| Phone.length>11){
            return toast.error("please enter a valid phone number")
          }


         
          



        
       
       const data = await fetch("/api/contacts" ,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(dataForm)
        })
        const res = await data.json();        
        if(data.status==201){
            toast.success(res.message)
            setDataForm({
                FirstName:"",
                LastName:"",
                Age:"",
                Gender:"",
                Phone:""

            })
        }
        





    }



    return(
        <div className={Styles.contact_container}>
            <form>
                <input value={dataForm.FirstName} onChange={getDataHandler} type="text" name="FirstName" id="" placeholder="FirstName" />
                <input value={dataForm.LastName} onChange={getDataHandler} type="text" name="LastName" id="" placeholder="LastName" />
                <input value={dataForm.Age} onChange={getDataHandler} type="number" name="Age" id="" placeholder="AGE" />
                <select value={dataForm.Gender} onChange={getDataHandler} name="Gender" id="">
                    <option value="" hidden >Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input value={dataForm.Phone} onChange={getDataHandler} type="text" name="Phone" id="" placeholder="Phone Number" />
                <button onClick={addContactHandler}>Add Contact</button>
            </form>
        </div>

    )
}