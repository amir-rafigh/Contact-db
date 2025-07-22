import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return(
    <>
    <Head><link rel="icon" href="data:," /></Head>
    <Navbar/>
    <Component {...pageProps} />
    </>
  )
}
