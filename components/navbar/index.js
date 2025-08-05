import { RiContactsBook3Fill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { CgLogIn , CgLogOut  } from "react-icons/cg";

import Styles from "./navbar.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import ValidToken from "@/utils/valid_token";
import { useEffect, useState } from "react";

export default function Navbar({isauth , setIsauth}){
    
    const route = useRouter().pathname  
    const logouthandler = async()=>{
        setIsauth(false)
        const log_send = await fetch("api/auth/logout")
        console.log(log_send.status);
        


    }
   
    return(
        <>
        <div className={Styles.container_navbar}>

           {isauth === true ? (
             <Link href="/auth/login" onClick={logouthandler}>
             <h1> <CgLogOut className={route=="/contacts"?Styles.icon_svg:""} />Logout </h1>
            </Link>
           ):(<Link href="/auth/login">
            <h1> <CgLogIn className={route=="/contacts"?Styles.icon_svg:""} />Login </h1>
           </Link>)}
            <Link href="/contacts">
                <h1> <RiContactsBook3Fill className={route=="/contacts"?Styles.icon_svg:""} />Contacts </h1>
            </Link>
           {isauth && (
             <Link href="/contacts/add">
             <h1> <MdAddCircleOutline className={route=="/contacts/add"?Styles.icon_svg:""} /> Add Contact</h1>
         </Link>
           )}
          {isauth && (
              <Link href="/dashboard">
              <h1> <BiSolidDashboard className={route=="/dashboard"?Styles.icon_svg:""} /> Dashboard</h1>
          </Link>
          )}
        </div>
        </>
    )
}