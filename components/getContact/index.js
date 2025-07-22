import { ToastContainer, toast } from 'react-toastify';
import { MdFavorite } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Styles from "./getcontact.module.css";
import Link from "next/link";
export default function Contactitem(item){
    const{FirstName , LastName , Age , Gender , Phone , _id , setContactitem , contactitem} = item

    const deleteItemHandler=async()=>{
        const response = await fetch(`http://localhost:3000/api/contacts/${_id}` , {
            method:"DELETE"
        })
        const data = await response.json()
        if(response.ok){
            setContactitem(contactitem.filter((item)=>(item._id !== _id)))
            toast.success(data.message)
            console.log(data.message);
            
        }
        if(response.status==404){
            toast.error(res.message)
        }
        
        
    }

    return(
        <>
         <ToastContainer/>
        <div className={Styles.container_card}>
            <div className={Styles.card}>
                  <div className="firstname">
                      <b>FirstName :</b> {FirstName}
                  </div>
                  <div className="lastname">
                      <b>LastName :</b> {LastName}
                  </div>
                  <div className="age">
                      <b>Age :</b> {Age}
                  </div>
                  <div className="gender">
                      <b>Gender :</b> {Gender}
                  </div>
                  <div className="phonenumber">
                      <b>Phone Number :</b> {Phone}
                  </div>
            </div>
            <div className={Styles.icons}>
            <MdFavorite  size={30} />
            <Link href={`/contacts/edit/${_id}`}>
                <MdModeEdit size={30}/>             
            </Link>           
            <MdDelete onClick={deleteItemHandler} size={30}/>


            </div>

        </div>
        </>
    )

}