import ConnectDB from "@/utils/connectdb"
import modelcontacts from "@/models"
import Contactitem from "@/components/getContact";
import { useEffect, useState } from "react";
import Styles from "@/styles/contacts.module.css"
import { useRouter } from "next/router";
export default function Contacts({data}){
    const {gen , search} = useRouter().query    
    const[contactitem , setContactitem]=useState(data)
    const[filterform , setFilterform] = useState({
        FLname:"",
        Gender:""
    }) 
    useEffect(()=>{        
        setFilterform({
            FLname:search || "",
            Gender:gen || "",
        })
    },[])

    
    const filterhandler=(e)=>{
        setFilterform({...filterform ,[e.target.name]:e.target.value })
    }
    const getfilterform=async()=>{
        const response= await fetch(`http://localhost:3000/api/contacts?search=${filterform.FLname}&gen=${filterform.Gender}`)
        const data =await response.json()
        console.log(data);
        
        setContactitem(data)
    }

    
    return(
        <>
         <div className={Styles.container_search}>
            <input value={filterform.FLname} onChange={filterhandler} type="text" name="FLname" id="" placeholder="First-last name" />
            <select value={filterform.Gender} onChange={filterhandler} name="Gender" id="" placeholder="gender">
                <option hidden  value="">all</option>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            <button onClick={getfilterform}>search</button>
         </div>
        {contactitem.length>0? contactitem.map((item)=>(
            <Contactitem key={item._id} {...item} contactitem={contactitem} setContactitem={setContactitem} />
        )):<p>there is no audience</p>}
        </>
        
    )
}

export async function getServerSideProps(context){
    await ConnectDB()
    const{search , gen}=context.query
    let res = null
    if(search && gen){
         res= await modelcontacts.find({$and:[{$or:[{FirstName:search},{LastName:search}]},{Gender:gen}]})        
    }
    else if(search){
         res = await modelcontacts.find({$or:[{FirstName:search},{LastName:search}]})
    }
    else if(gen){
         res = await modelcontacts.find({Gender:gen})
    }
    else{
         res = await modelcontacts.find()
    }

    const data = JSON.parse(JSON.stringify(res))
    return{
        props:{data}
    }
}