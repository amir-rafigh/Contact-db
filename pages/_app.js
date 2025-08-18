import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [isauth , setIsauth] = useState(false)
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
    <ToastContainer  />
    <Head><link rel="icon" href="data:," /></Head>
    <Navbar isauth={isauth} setIsauth={setIsauth}/>
    <Component isauth={isauth} setIsauth={setIsauth} {...pageProps} />
    </>
  )
}
