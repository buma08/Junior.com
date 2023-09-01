import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Register from './Pages/register';
import Login from './Pages/Login';
import Auth from './Auth';
import RootRoute from './rootRoute';
import { SidebarContextProvider } from './contexts/sidebarContext';
import { UserContextProvider } from './contexts/userContext';




const router = createBrowserRouter([
  {path:"/", element:<RootRoute></RootRoute>},
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/home/*",
    element: 
    <UserContextProvider>
    <SidebarContextProvider>
      
        <Auth></Auth>
      
    </SidebarContextProvider>
    </UserContextProvider>
  }

]);
console.log("a")
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);