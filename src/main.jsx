import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './data/firebase/firebase.js'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import LoginScreen, {loginScreenAction} from "./ui/auth/LoginScreen.jsx";
import AppLayout, {appLayoutLoader} from "./ui/app/AppLayout.jsx";
import HomeScreen from "./ui/app/home/HomeScreen.jsx";
import MessagesScreen, {messagesScreenLoader} from "./ui/app/messages/MessagesScreen.jsx";
import NewPostScreen, {newPostAction} from "./ui/app/new-post/NewPostScreen.jsx";
import {Provider} from "react-redux";
import store from "./data/store/store.js";
import UserScreen, {userScreenLoader} from "./ui/app/users/UserScreen.jsx";
import UserEditScreen, {userEditScreenAction, userEditScreenLoader} from "./ui/app/users/UserEditScreen.jsx";
import ExploreScreen from "./ui/app/explore/ExploreScreen.jsx";

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
    loader: appLayoutLoader,
    element: <AppLayout/>,
    children: [
      {
        path: "/app/home",
        element: <HomeScreen/>,
      },
      {
        path: "/app/explore",
        element: <ExploreScreen/>,
      },
      {
        path: "/app/messages/:userId",
        element: <MessagesScreen/>,
        loader: messagesScreenLoader,
      },
      {
        path: "/app/new",
        element: <NewPostScreen/>,
        action: newPostAction,
      },
      {
        path: "/app/users/:userId",
        element: <UserScreen/>,
        loader: userScreenLoader,
      },
      {
        path: "/app/users/:userId/edit",
        element: <UserEditScreen/>,
        loader: userEditScreenLoader,
        action: userEditScreenAction,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
