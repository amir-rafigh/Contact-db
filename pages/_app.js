import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [isauth , setIsauth] = useState(false)
  const route = useRouter()

  useEffect(()=>{
      const isTOken = async()=>{
          const Token = await fetch("/api/auth/status")
          if(Token.status==401){
              setIsauth(false)
          }
          else{
              setIsauth(true)
          }
          
      }
      isTOken()
  },[])
  return(
    <>
      <ToastContainer  
           position="top-right"
          autoClose={2000}
          closeButton={false}
          hideProgressBar
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          draggable={false}
          newestOnTop
          limit={1} />
      <Head><link rel="icon" href="data:," /></Head>
      {route.pathname !== "/" && <Navbar isauth={isauth} setIsauth={setIsauth}/>}
      
      <Component isauth={isauth} setIsauth={setIsauth} {...pageProps} />
    </>
  )
}
