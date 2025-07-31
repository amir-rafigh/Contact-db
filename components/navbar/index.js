import { RiContactsBook3Fill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { CgLogIn } from "react-icons/cg";

import Styles from "./navbar.module.css"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar(){
    const route = useRouter().pathname    
    return(
        <>
        <div className={Styles.container_navbar}>

            <Link href="/contacts">
                <h1> <CgLogIn className={route=="/contacts"?Styles.icon_svg:""} />Login </h1>
            </Link>
            <Link href="/contacts">
                <h1> <RiContactsBook3Fill className={route=="/contacts"?Styles.icon_svg:""} />Contacts </h1>
            </Link>
            <Link href="/contacts/add">
                <h1> <MdAddCircleOutline className={route=="/contacts/add"?Styles.icon_svg:""} /> Add Contact</h1>
            </Link>
            <Link href="/contacts/add">
                <h1> <BiSolidDashboard className={route=="/contacts/add"?Styles.icon_svg:""} /> Dashboard</h1>
            </Link>
        </div>
        </>
    )
}