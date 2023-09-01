import { useState, useEffect, useContext } from "react"
import { UserContext } from "../contexts/userContext";
function useFetch(url, method, body){
    const {user} = useContext(UserContext)
    const [data, setData] = useState()
    useEffect(() => {
        const requestOptions = {
          method,
          headers: {
            "Content-Type": "application/json"
          }
        };
    
        if (body) {
          requestOptions.body = JSON.stringify(body);
        }
        console.log("hola")
        fetch(url, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            
            setData(data);
            console.log("hola")
          })
          .catch(console.error);
      }, [user]);
    console.log(data)
    return (data)
}
export default useFetch