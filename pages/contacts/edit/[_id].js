import modelcontacts from "@/models";
import Styles from "@/components/Contact/contact.module.css"
import ConnectDB from "@/utils/connectdb";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";

export default function Editcontact({res}){
    const {_id}=useRouter().query
    
    
    const[dataForm , setDataForm]=useState(res)
    const getDataHandler=(e)=>{
        const{name , value}= e.target;
        setDataForm({...dataForm , [name]:value})

    }
    const editContactHandler=async(e)=>{
        e.preventDefault();
        const form_validate = Object.values(dataForm).every((item)=>item !=="")
        if(!form_validate){
            return toast.error("please fill all the blanks")
        }
        const{FirstName , LastName , Age , Phone } = dataForm
        let error_text=""
        if(FirstName.length<3 || FirstName.length>15 || /\d/.test(FirstName)){
            error_text+="Firstname must be between 3 to 15 character and not to number\n"
        }
        if(LastName.length<3 || LastName.length>15 || /\d/.test(LastName)){
            error_text+="Firstname must be between 3 to 15 character and not to number\n"
          }
        if(Age<18){
            error_text+="your age must be more than 18\n"
          }
        if(!Phone.match(/09\d{9}/)|| Phone.length>11){
            error_text+="please enter a valid phone number\n"
          }

          if(error_text){
            return toast.error(error_text)}

        try{

            const data = await fetch(`http://localhost:3000/api/contacts/${_id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(dataForm)
                
            })
            const res = await data.json()
            if(data.status==200){
                toast.success(res.message)
            }
            else if(data.status==400){
                toast.error(res.message)
            }
        }catch(error){
            toast.error("server error")
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
                <button onClick={editContactHandler}>Edit Contact</button>
            </form>
        </div>

    )
}

export async function getServerSideProps(context){
    const{_id} = context.params    
    await ConnectDB();
    const data = await modelcontacts.findById(_id).lean()
    const res = JSON.parse(JSON.stringify(data))
    return{
        props:{res}
    }




}

