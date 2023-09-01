import { useContext } from "react"
import Sidebar from "../../Components/sidebar"
import { UserContext } from "../../contexts/userContext"

function Home(){
    const {user} = useContext(UserContext)
    return(
        <>
            <Sidebar active="home"></Sidebar>
        </>
    )
}
export default Home