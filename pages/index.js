import Styles from "@/styles/Home.module.css"
import Link from "next/link"
export default function Home(){
  return(
    <>
    <div dir="rtl" className={Styles.main_container}>


      <div className={Styles.home_container}>

      <div className={Styles.text_container}>
        <h1>مدیریت ساده و امن مخاطبین شما</h1>
        <p>با این اپلیکیشن می‌توانید مخاطبین خود را اضافه، ویرایش و حذف کنید و همیشه دسترسی سریع داشته باشید</p>
        <div className={Styles.auth}>
            <button>
              <Link href="/auth/login">Login</Link>
            </button>
          <button>
            <Link href="/auth/register">Sign up</Link>
          </button>
        </div>
      </div>

      <div>
        <img src="/Home/undraw_contact-us_kcoa.svg" alt="" />
      </div>

      </div>


    <div className={Styles.footer}>
      <p>   © 2025 Contact Management App | Developed by <Link href="https://github.com/amir-rafigh">Amir Rafigh</Link></p>
    </div>


    </div>
    </>
  )
}