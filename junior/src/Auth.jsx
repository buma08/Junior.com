import { useContext, useEffect, useState } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Home from "./Pages/sidebarPages/Home";
import Freelancers from "./Pages/sidebarPages/Freelancers";
import Config from "./Pages/sidebarPages/Config";
import Chats from "./Pages/sidebarPages/Chats";
import Business from "./Pages/sidebarPages/Business";
import { UserContext } from "./contexts/userContext";
import useSocket from "./Hooks/useSocket";


function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);
  

  const handleRedirect = () => {
    if (user.status === 403 || user.status === 401) {
      navigate("/login"); // Utiliza navigate para redireccionar
    }
  };
  useEffect(() => {
    if (loading) return;

    return handleRedirect(); // Ejecuta la función después de obtener los datos
  }, [user]);


  const socket = useSocket(false)
  
  useEffect(() => {
    
    
  }, []);

  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    );
  } 
  
  
  
  else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/freelancers" element={<Freelancers />}></Route>
          <Route path="/config" element={<Config></Config>}></Route>
          <Route path="/chats" element={<Chats></Chats>}></Route>
          <Route path="/business" element={<Business></Business>}></Route>
        </Routes>
      </>
    );
  }
}
export default Auth;
