import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {usersSelector} from "../../../data/store/usersSlice.js";
import {addFriend} from "../../../data/store/friendsSlice.js";
import {befriendUser} from "../../../data/firebase/firebaseDatabase.js";
import {removeSuggestion} from "../../../data/store/suggestionsSlice.js";

const HomeSuggestionView = ({userId}) => {
  const user = useSelector(state => usersSelector.selectById(state, userId))
  const dispatch = useDispatch()

  const befriend = async () => {
    dispatch(addFriend(userId))
    dispatch(removeSuggestion(userId))
    await befriendUser(userId)
  }

  return (
    <div className={"flex h-12 w-full gap-2"}>
      <img className={"w-12 h-12 rounded-full border-blue-800 border-2"} src={user.imageUrl} alt={user.username}/>
      <div className={"flex flex-col flex-grow"}>
        <Link to={`/app/users/${user.id}`}>
          <p className={"text-sm font-medium"}>{user.username}</p>
        </Link>
        <p className={"text-sm"}>{user.name}</p>
      </div>
      <button className={"bg-blue-800 text-white rounded-xl w-16 h-8 text-sm font-medium"} onClick={befriend}>
        Add
      </button>
    </div>
  )
}

export default HomeSuggestionView