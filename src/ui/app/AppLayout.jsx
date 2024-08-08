import AppLayoutSidebar from "./AppLayoutSidebar.jsx";
import {Outlet} from "react-router-dom";
import {setUser} from "../../data/store/authSlice.js";
import store from "../../data/store/store.js";
import {jwtDecode} from "jwt-decode";
import {getUserById} from "../../data/firebase/firebaseDatabase.js";

export const appLayoutLoader = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.user_id
  const user = await getUserById(userId)
  store.dispatch(setUser(user))
  return null
}

const AppLayout = () => {
  return (
    <div className={"w-screen h-screen flex bg-blue-100"}>
      {/* sidebar */}
      <AppLayoutSidebar/>
      <div className={"flex-grow"}>
        <Outlet/>
      </div>
    </div>
  )
}

export default AppLayout