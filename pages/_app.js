import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return(
    <>
    <ToastContainer  />
    <Head><link rel="icon" href="data:," /></Head>
    <Navbar/>
    <Component {...pageProps} />
    </>
  )
}
