import Styles from "@/styles/login.module.css"
export default function Login(){
    return(
        <div className={Styles.container}>
            <form className={Styles.form}>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button>Login</button>
                <div>
                    <p>Not Registered?</p>
                    <span style={{color:"green"}}>Create an account</span>
                </div>

            </form>
        </div>
    )
}