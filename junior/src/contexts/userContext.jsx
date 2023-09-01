import { createContext, useState, useEffect } from "react";
export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}){
    const token = localStorage.getItem("token")
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        fetch("http://localhost:5000/api/info/tokenAuth", {
            mode:"cors",
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({token})
        })
        .then(res=>res.json()).then(data2=>{
            setUser(data2)
        })
        .catch(e=>{console.error(e)})
        .finally(()=>{
            setLoading(false)
        })
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    )
}