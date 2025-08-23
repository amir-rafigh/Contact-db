import { ToastContainer, toast } from 'react-toastify';
import { MdFavorite } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Styles from "./getcontact.module.css";
import Link from "next/link";
import { useState } from 'react';
export default function Contactitem(item){
    const{FirstName , LastName , Age , Gender , Phone , _id , Favorite ,setContactitem , contactitem} = item
    const[isfavorite , setIsfavorite] = useState(false)
    const[isexistId , setIsexistId]= useState([])

    const deleteItemHandler=async()=>{
        toast.success("delete")
        const response = await fetch(`http://localhost:3000/api/contacts/${_id}` , {
            method:"DELETE"
        })
        const data = await response.json()
        if(response.ok){
            setContactitem(contactitem.filter((item)=>(item._id !== _id)))
            
        }
        if(response.status==404){
            toast.error(res.message , )
        }
        
        
    }
    const favoriteitemhandler=async(_id)=>{
        setIsfavorite(!isfavorite)    
        const like = await fetch (`http://localhost:3000/api/contacts/${_id}` ,{method:"PATCH"})
        const res = await like.json()
        toast.success(res.message)
        const fav_item = contactitem.map((item)=>{
            if(item._id == _id){                
                item.Favorite =!item.Favorite                
            }
            return item
        }
    )
    setContactitem(fav_item)
        

    

    }

    return(
        <>       
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
            <MdFavorite  size={30} onClick={()=>favoriteitemhandler(_id)} style={{color:Favorite?"red":"black"}} />
            <Link href={`/contacts/edit/${_id}`}>
                <MdModeEdit size={30}/>             
            </Link>           
            <MdDelete onClick={deleteItemHandler} size={30}/>


            </div>

        </div>
        </>
    )

}