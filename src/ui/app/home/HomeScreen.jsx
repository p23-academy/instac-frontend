import HomePostView from "./HomePostView.jsx";
import HomeFriendView from "./HomeFriendView.jsx";
import HomeUserView from "./HomeUserView.jsx";
import {getPostsForHome} from "../../../data/firebase/firebaseDatabase.js";
import {getLoggedInUser} from "../../../data/firebase/firebaseAuth.js";
import store from "../../../data/store/store.js";
import {setPosts} from "../../../data/store/postsSlice.js";
import {useSelector} from "react-redux";

export const homeScreenLoader = async () => {
  const posts = await getPostsForHome()
  store.dispatch(setPosts(posts))
  return null
}

const HomeScreen = () => {
  const posts = useSelector(state => state.posts)
  console.log(posts)

  const user = {
    name: "igraona.gvu",
    email: "igraona@p23.io",
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }

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
          {posts.ids.map(postId => <HomePostView key={postId} postId={postId}/>)}
          {/*{Object.keys(postsMap).map(postId => <HomePostView key={postId} post={postsMap.postId}/>)}*/}
        </div>
      </div>
      <div className={"flex flex-col gap-2 w-3/12 pt-12"}>
        {/*profile*/}
        <HomeUserView user={getLoggedInUser()}/>
        {/*suggestions*/}
        <h5 className={"text-gray-800"}>Suggested for you</h5>
        <HomeUserView user={user}/>
        <HomeUserView user={user}/>
        <HomeUserView user={user}/>
        <HomeUserView user={user}/>
        <HomeUserView user={user}/>
      </div>
    </div>
  )
}

export default HomeScreen;