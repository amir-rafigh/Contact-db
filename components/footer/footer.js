import Styles from "./footer.module.css"
export default function Footer(){
    return(
        <>
        <div className={Styles.footer}>
            <p>© 2025 Contact Management App | Developed by <a href="https://github.com/amir-rafigh" className="text-cyan-600 ml-1 hover:underline">Amir Rafigh</a></p>
        </div>
        </>
    )
}