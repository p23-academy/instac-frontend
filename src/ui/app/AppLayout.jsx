import AppLayoutSidebar from "./AppLayoutSidebar.jsx";
import {Outlet} from "react-router-dom";
import {setLoggedInUser} from "../../data/store/authSlice.js";
import store from "../../data/store/store.js";
import {jwtDecode} from "jwt-decode";
import {getAllFriends, getUserById} from "../../data/firebase/firebaseDatabase.js";
import {setFriends} from "../../data/store/friendsSlice.js";

export const appLayoutLoader = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.user_id
  const user = await getUserById(userId)
  store.dispatch(setLoggedInUser(user))
  const friends = await getAllFriends()
  store.dispatch(setFriends(friends))
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