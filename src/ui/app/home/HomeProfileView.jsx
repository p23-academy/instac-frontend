import {Link} from "react-router-dom";
import {getLoggedInUser} from "../../../data/firebase/firebaseAuth.js";

const HomeProfileView = () => {
  const user = getLoggedInUser()

  return (
    <div className={"flex h-12 w-full gap-2"}>
      <img className={"w-12 h-12 rounded-full border-blue-800 border-2"} src={user.imageUrl} alt={user.username}/>
      <div className={"flex flex-col flex-grow"}>
        <Link to={`/app/users/${user.id}`}>
          <p className={"text-sm font-medium"}>{user.username}</p>
        </Link>
        <p className={"text-sm"}>{user.name}</p>
      </div>
    </div>
  )
}

export default HomeProfileView