import AppLayoutSidebar from "./AppLayoutSidebar.jsx";
import {Outlet} from "react-router-dom";

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