import {getPostsByUser, getUserById} from "../../../data/firebase/firebaseDatabase.js";
import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import Button from "../../../components/buttons/Buttton.jsx";
import HomePostView from "../home/HomePostView.jsx";
import {getLoggedInUser} from "../../../data/firebase/firebaseAuth.js";

export const userScreenLoader = async ({params}) => {
  const userId = params.userId
  const user = await getUserById(userId)
  if (!user) {
    return redirect('/app/home')
  }
  const posts = await getPostsByUser(userId)
  return {user, posts}
}

const UserScreen = () => {
  const {user, posts} = useLoaderData()
  const navigate = useNavigate()

  const isLoggedInUser = user.id === getLoggedInUser().id

  return (
    <div className={"h-full w-full flex flex-col items-center"}>
      {/*header*/}
      <div className={"w-8/12 flex gap-4 my-16"}>
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
      {/*postovi*/}
      <div className={"grid grid-cols-3 gap-2"}>
        {posts.map((post, index) => (
          <HomePostView key={index} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default UserScreen