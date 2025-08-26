import ConnectDB from "@/utils/connectdb";
import modelcontacts from "@/models";
import Contactitem from "@/components/getContact";
import { useEffect, useState } from "react";
import Styles from "@/styles/contacts.module.css";
import { useRouter } from "next/router";
import ValidToken from "@/utils/valid_token";
import generateFilter from "@/utils/generatefilter";
import { MdFavorite } from "react-icons/md";


export default function Contacts({ data , User_Id }) {
  const { gen, search } = useRouter().query;
  const [contactitem, setContactitem] = useState(data);
  const [ favstatus , setFavstatus] = useState(false)
  const [filterform, setFilterform] = useState({
    FLname: "",
    Gender: "",
  });
  useEffect(() => {
    setFilterform({
      FLname: search || "",
      Gender: gen || "",
    });
  }, []);

  const filterhandler = (e) => {
    setFilterform({ ...filterform, [e.target.name]: e.target.value });
  };
  const getfilterform = async () => {
    const response = await fetch(
      `/api/contacts?User_Id=${User_Id}&search=${filterform.FLname}&gen=${filterform.Gender}`
    );
    const data = await response.json();

    setContactitem(data);
  };
  const favoritehandler=()=>{
    if(favstatus){
      setContactitem(data)
    }else{
      const favoritecontact = contactitem.filter((item)=> item.Favorite==true)
      setContactitem(favoritecontact)
    }
    setFavstatus(!favstatus)
      
    
  }

  return (
    <>
    <div className={Styles.container_contact}>

      <div className={Styles.container_search}>
        <input
          value={filterform.FLname}
          onChange={filterhandler}
          type="text"
          name="FLname"
          id=""
          placeholder="First-last name"
        />
        <select
          value={filterform.Gender}
          onChange={filterhandler}
          name="Gender"
          id=""
          placeholder="gender"
          >
          <option value="">
            all
          </option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button onClick={getfilterform}>search</button>
        <span><MdFavorite onClick={favoritehandler} fill={favstatus?"red":"black"} size={"35px"}/></span>
      </div>
      {contactitem.length > 0 ? (
        contactitem.map((item) => (
          <Contactitem
          key={item._id}
          {...item}
          contactitem={contactitem}
          setContactitem={setContactitem}
          />
        ))
      ) : (
        <p style={{fontSize:"1.5rem" , textAlign:"center" ,textTransform:"capitalize" }}>there is no audience</p>
      )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const Payload = await ValidToken(context);
  if (!Payload) {
    return {
      redirect: { 
        destination: "/auth/login?auth_token=auth_required",
        permanent: false,
      },
    };
  }
  const User_Id = Payload.User_Id;
  
  await ConnectDB();  
  let res = null;
  const{gen , search} = context.query
  res = await modelcontacts.find(generateFilter({gen , search} , User_Id))
  const data = JSON.parse(JSON.stringify(res));  
  return {
    props: { data , User_Id }
  };
}
