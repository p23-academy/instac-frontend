import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Face2Icon from '@mui/icons-material/Face2';
import {signOutUser} from "../../data/firebase/firebaseAuth.js";

const AppLayoutSidebar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOutUser()
    navigate("/")
  }

  return (
    <div className={"h-screen w-80 flex flex-col bg-blue-600 p-4"}>
      <div className={"flex gap-2 items-center px-2"}>
        <Face2Icon className={"text-white"} fontSize={"large"} />
        <h1 className={"font-sans text-4xl font-bold text-white"}>Instać</h1>
      </div>
      <div className={"border-b border-white my-4"} />
      <SidebarButton onClick={() => navigate("/app/home")} icon={<HomeIcon/>}>Home</SidebarButton>
      <SidebarButton onClick={() => navigate("/app/search")} icon={<SearchIcon/>}>Search</SidebarButton>
      <SidebarButton onClick={() => navigate("/app/explore")} icon={<ExploreIcon/>}>Explore</SidebarButton>
      <SidebarButton onClick={() => navigate("/app/messages")} icon={<ForumIcon/>}>Messages</SidebarButton>
      <SidebarButton onClick={() => navigate("/app/profile")} icon={<PersonIcon/>}>Profile</SidebarButton>
      <div className={"flex-grow"} />
      <SidebarButton onClick={logout} icon={<LogoutIcon/>}>Logout</SidebarButton>
    </div>
  )
}

const SidebarButton = ({children, onClick, icon}) => {
  return (
    <button onClick={onClick}>
      <div className={"flex h-12 items-center hover:bg-blue-400 rounded-xl"}>
        <div className={"text-white w-12 flex justify-center items-center"}>
          {icon}
        </div>
        <p className={"text-lg text-white"}>{children}</p>
      </div>
    </button>
  )
}

export default AppLayoutSidebar