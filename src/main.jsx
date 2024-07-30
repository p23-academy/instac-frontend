import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './data/firebase/firebase.js'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginScreen, {loginScreenAction} from "./ui/auth/LoginScreen.jsx";
import AppLayout from "./ui/app/AppLayout.jsx";
import HomeScreen from "./ui/app/home/HomeScreen.jsx";
import MessagesScreen from "./ui/app/messages/MessagesScreen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginScreen/>,
    action: loginScreenAction,
  },
  {
    path: "/app",
    element: <AppLayout/>,
    children: [
      {
        path: "/app/home",
        element: <HomeScreen/>,
      },
      {
        path: "/app/messages",
        element: <MessagesScreen/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
