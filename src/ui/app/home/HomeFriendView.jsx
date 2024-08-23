import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {usersSelector} from "../../../data/store/usersSlice.js";

const HomeFriendView = ({friendId}) => {
  const navigate = useNavigate();
  const user = useSelector(state => usersSelector.selectById(state, friendId))

  if (!user) {
    return null
  }

  return (
    <button
      className={"flex flex-col w-12 items-center"}
      onClick={() => navigate(`/app/users/${user.id}`)}
    >
      <img className={"w-12 h-12 rounded-full border-2 border-blue-800"} src={user.imageUrl} alt={user.name}/>
      <p>{user.username}</p>
    </button>
  )
}

export default HomeFriendView