import AppLayoutSidebar from "./AppLayoutSidebar.jsx";
import {Outlet} from "react-router-dom";
import {setUser} from "../../data/store/authSlice.js";
import {getUser} from "../../data/firebase/firebaseAuth.js";
import store from "../../data/store/store.js";

export const appLayoutLoader = () => {
  const user = getUser()
  store.dispatch(setUser(user))
  return null
}

const AppLayout = () => {
  return (
    <div className={"w-screen h-screen flex bg-blue-100"}>
      {/* sidebar */}
      <AppLayoutSidebar/>
      <Outlet/>
    </div>
  )
}

export default AppLayout