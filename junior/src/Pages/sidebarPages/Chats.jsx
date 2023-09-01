import { useState, useEffect, useRef } from "react";
import Message from "../../Components/message";
import Sidebar from "../../Components/sidebar";
import "../../css/pages/chats.css";

import { UserContext } from "../../contexts/userContext";
import useQuery from "../../Hooks/useQuery";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useSocket from "../../Hooks/useSocket";
import Badge from '@mui/material/Badge';

function Chats() {
  const [messages, setMessages] = useState();
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [loadingChats, setLoadingChats] = useState(true)
  
  const messagesContainerRef = useRef(null);


  const { user, loading } = useContext(UserContext);
  
  const params = useQuery();
  const chat = params.get("chat");



  const markMessagesAsRead = (chatId) => {
    fetch(
        `http://localhost:5000/api/actions/chat/messages/read?chat=${chatId}&user=${user.user.user.id}`,
    )
        .then((response) => response.json())
        .then((data) => {
            console.log("Messages marked as read:", data);
        })
        .catch((error) => {
            console.error("Error marking messages as read:", error);
        });
  };



  const addMessage = (message) => {
    if(message.chat == chat){
      setMessages((prevMessages) => ({
        ...prevMessages,
        data: [...prevMessages.data, message],
      }));
    }

  }

  function markChatAsHasUnread (chatId, hasUnreadValue){
    setChats((prevChats) => {
      const updatedChats = prevChats.data.map((chat2) => {
        if (chat2.id === chatId) {
          return { ...chat2, hasUnread: chat == chatId? hasUnreadValue: false};
        }
        return chat2;
      });

      return { ...prevChats, data: updatedChats };
    });
  }

    

  const socket = useSocket( addMessage, markMessagesAsRead, markChatAsHasUnread)
  




 


  useEffect(() => {
    if (loading || !chat) return;

    fetch(
      `http://localhost:5000/api/info/chat/messages/get?id=${chat}&user=${user.user.user.id}`
    )
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
      });
  }, [chat, user, loading]);

  useEffect(() => {
    
    if (loading || !chat) return;
    markMessagesAsRead(chat, user.user.user.id)
  }, [chat, loading, user.user.user]);

  useEffect(() => {
    if (loading) return;
    else {
      fetch(`http://localhost:5000/api/info/chat/get?id=${user.user.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setChats(data);
          let cc = data.data.find((c) => c.id == chat);
          setCurrentChat(cc);
        })
        .catch(error=>{console.error(error)})
        .finally(()=>{
          setLoadingChats(false)
        })
        
    }
  }, [chat, loading, user.user.user.id]);

  useEffect(() => {
    // ... Tu código existente para cargar y renderizar los mensajes

    // Cuando los mensajes se cargan y renderizan, hacemos scroll hasta abajo
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chat, user, loading, messages]);


  
  function HandleChange(e) {
    e.preventDefault()
    setText(e.target.value);
  }
  function HandleSubmit(e) {
    // Aun no trato de enviar mensajes, solo quiero recuperar los que ya tengo
    e.preventDefault();
    socket.emit("message", { author: user.user.user.id, chat, time: Date.now(), content:text })
    setText("");
  }
  function returnMessages() {

    if (!currentChat) {
      return (
        <>
          <p className="messages-container-error">No hay chat seleccionado</p>
        </>
      );
    }
    
    if(loadingChats) return;
    console.log(messages)
    if (!messages) {
      return (
        <>
          <p className="messages-container-error">
            Cargando mensajes
          </p>
        </>
      );
    }
    
   else if(messages.data.length<=0){
    return (
      <p className="messages-container-error">
        No hay mensajes.
    </p>
    )
   }
    else if (messages.status == 200) {
      return messages.data.map((msg) => (
        <Message
          key={msg.id}
          content={msg.content}
          type={msg.author == user.user.user.id ? 2 : 1}
        ></Message>
      ));
    } else {
      return (
        <>
          <p className="messages-container-error">Hubo un error desconocido</p>
        </>
      );
    }
  }
  
  function returnChats() {
    if (loadingChats)
      return (
        <>
          <p className="chats-container-error">Cargando chats</p>
        </>
      );
    if (chats.status == 404) {
      return <p className="chats-container-error">No hay chats</p>;
    } else if (chats.status == 200) {
      if (chat) {
        return chats.data.map((c) => (
          <li key={c.id} className="chat-li">
            <Link
              to={{ search: `?chat=${c.id}` }}
              className={
                chat == c.id
                  ? "chat-li-link chat-li-link-active"
                  : "chat-li-link"
              }
            >
              <p><Badge style={{position:"relative", left:"-15px"}} color="secondary" variant="dot" invisible={c.hasUnread ? false:true}></Badge>{c.memberUsername}</p>
            </Link>
          </li>
        ));
      } else {
        
        return chats.data.map((c) => (
          <li key={c.id} className="chat-li">
            
            <Link to={{ search: `?chat=${c.id}` }} className="chat-li-link">
              <p><Badge style={{position:"relative", left:"-15px"}} color="secondary" variant="dot" invisible={c.hasUnread ? false:true}></Badge>{c.memberUsername}</p>
            </Link>
          </li>
        ));
      }
    } else {
      return <p className="chats-container-error">Error desconocido</p>;
    }
  }

  if (loading) {
    return (
      <>
        <p>Cargando</p>
      </>
    );
  } else {
    return (
      <>
        <Sidebar active="chats"></Sidebar>

        <div className="chats-container">
          <ul className="chats-list">{returnChats()}</ul>
        </div>
        <div className="conversation-container">
          <div className="messages-container" ref={messagesContainerRef} id="messages-container">{returnMessages()}</div>
          <form className="input-container" onSubmit={HandleSubmit}>
            <input
              style={{display: chat? "inline-block": "none"}}
              onChange={HandleChange}
              value={text}
              type="text"
              className="message-input"
              placeholder="Escribe un mensaje"
            />
          </form>
        </div>
      </>
    );
  }
}
export default Chats;
