import HomePostView from "./HomePostView.jsx";
import HomeFriendView from "./HomeFriendView.jsx";
import HomeUserView from "./HomeUserView.jsx";
import {getPostsForHome} from "../../../data/firebase/firebaseDatabase.js";
import {useLoaderData} from "react-router-dom";

export const homeScreenLoader = async () => {
  const posts = await getPostsForHome()
  return {posts}
}

const HomeScreen = () => {
  const {posts} = useLoaderData()

  return (
    <div className={"w-full h-screen overflow-y-auto flex gap-4 p-4"}>
      <div className={"flex flex-col items-center gap-4 w-9/12"}>
        {/*friends profiles*/}
        <div className={"flex gap-4 w-9/12 justify-start"}>
          <HomeFriendView/>
          <HomeFriendView/>
          <HomeFriendView/>
          <HomeFriendView/>
          <HomeFriendView/>
        </div>
        {/*posts*/}
        <div className={"flex flex-col gap-4"}>
          {posts.map(post => <HomePostView key={post.id} post={post}/>)}
        </div>
      </div>
      <div className={"flex flex-col gap-2 w-3/12 pt-12"}>
        {/*profile*/}
        <HomeUserView/>
        {/*suggestions*/}
        <h5 className={"text-gray-800"}>Suggested for you</h5>
        <HomeUserView/>
        <HomeUserView/>
        <HomeUserView/>
        <HomeUserView/>
      </div>
    </div>
  )
}

export default HomeScreen;