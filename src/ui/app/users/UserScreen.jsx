import {befriendUser, getPostsByUser, getUserById, unfriendUser} from "../../../data/firebase/firebaseDatabase.js";
import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import Button from "../../../components/buttons/Buttton.jsx";
import {getLoggedInUser} from "../../../data/firebase/firebaseAuth.js";
import {clearPosts, setPosts} from "../../../data/store/postsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addFriend, removeFriend} from "../../../data/store/friendsSlice.js";
import store from "../../../data/store/store.js";
import {addUser, usersSelector} from "../../../data/store/usersSlice.js";
import {Masonry} from "@mui/lab";
import UserPostView from "./UserPostView.jsx";

export const userScreenLoader = async ({params}) => {
  const userId = params.userId
  const user = await getUserById(userId)
  if (!user) {
    return redirect('/app/home')
  }
  store.dispatch(addUser(user))
  const isLoggedInUser = user.id === getLoggedInUser().id
  return {userId, isLoggedInUser}
}

const UserScreen = () => {
  const {userId, isLoggedInUser} = useLoaderData()
  const user = useSelector(state => usersSelector.selectById(state, userId))
  const posts = useSelector(state => state.posts)
  const friends = useSelector(state => state.friends.ids)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isFriendsState, setIsFriendsState] = useState(friends.includes(user.id))

  useEffect(() => {
    getPostsByUser(user.id).then(posts => dispatch(setPosts(posts)))
    return () => {
      dispatch(clearPosts())
    };
  }, [dispatch, user]);

  const befriend = async () => {
    setIsFriendsState(true)
    dispatch(addFriend(user.id))
    await befriendUser(user.id)
  }

  const unfriend = async () => {
    setIsFriendsState(false)
    dispatch(removeFriend(user.id))
    await unfriendUser(user.id)
  }

  console.log(isLoggedInUser)

  return (
    <div className={"h-full w-full flex flex-col items-center overflow-y-auto"}>
      {/*header*/}
      <div className={"w-8/12 flex flex-col gap-2 my-16"}>
        <div className={"flex gap-4"}>
          <img className={"w-32 h-32 rounded-full border-blue-800 border-2"} src={user.imageUrl} alt={user.username}/>
          <div className={"flex-grow flex flex-col"}>
            <div className={"w-full flex justify-between"}>
              <h5 className={"font-bold text-4xl"}>{user.username}</h5>
              {isLoggedInUser && <Button onClick={() => navigate(`/app/users/${user.id}/edit`)}>Minjaj</Button>}
            </div>
            <h5 className={"text-lg"}>{user.name}</h5>
            <h5 className={"text-lg"}>{user.bio}</h5>
          </div>
        </div>
        {!isLoggedInUser &&
          (isFriendsState ?
              <Button onClick={unfriend}>Briši iz prijatelja</Button>
              :
              <Button onClick={befriend}>Dodaj u prijatelje</Button>
          )
        }
      </div>
      {/*postovi*/}
      <div className={"w-10/12"}>
        <Masonry columns={3} spacing={2}>
          {posts.ids.map((postId, index) => (
            <UserPostView key={index} postId={postId}/>
          ))}
        </Masonry>
      </div>
    </div>
  )
}

export default UserScreen