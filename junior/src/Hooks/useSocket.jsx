import { useEffect, useContext, useRef, useState } from "react"
import socketIO from "socket.io-client"
import { UserContext } from "../contexts/userContext";
import useQuery from "./useQuery";

function useSocket(addMessage, markMessagesAsRead, markChatAsHasUnread){
    const { user, loading } = useContext(UserContext);
    const [connected, setConnected] = useState(false)
    const socketRef = useRef(null); // Usar ref para almacenar el socket
    const query = useQuery()
    const chat = query.get("chat")
    useEffect(() => {
      socketRef.current = socketIO.connect("http://localhost:5000");
      console.log(loading)
      if (!loading) {
        
        socketRef.current.on("message", (msg)=>{
          
            if(window.location.href.startsWith("http://localhost:5173/home/chats")){

                if(chat == msg.chat){
                addMessage(msg)
                markMessagesAsRead(msg.chat)
                const messagesContainer = document.getElementById("messages-container")
                messagesContainer.scrollTop = messagesContainer.scrollHeight
                }
                else{
                  
                  markChatAsHasUnread(msg.chat, true)
                }
            }
            else{

            }

        })
        socketRef.current.on("connect", ()=>{
            setConnected(true)
        })
        socketRef.current.on("disconnect", ()=>{
            setConnected(false)
        })
      }
  
      return () => {
        if (!loading && socketRef.current && user) {
          socketRef.current.emit("removeOnline", user.user.user);
          socketRef.current.disconnect();
        }
      };
    }, [loading, user]);
  
    return connected? socketRef.current : undefined; 
}
export default useSocket