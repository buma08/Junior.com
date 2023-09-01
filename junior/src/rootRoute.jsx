import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function RootRoute(){
    console.log("a")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(()=>{
        if(token){
            return navigate("/home/home")
        }
        return navigate("/login")
    }, [])
}
export default RootRoute