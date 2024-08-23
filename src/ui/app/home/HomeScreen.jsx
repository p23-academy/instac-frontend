import HomePostView from "./HomePostView.jsx";
import HomeFriendView from "./HomeFriendView.jsx";
import HomeSuggestionView from "./HomeSuggestionView.jsx";
import {getPostsForHome, getUsersForSuggested, getUsersWithIds} from "../../../data/firebase/firebaseDatabase.js";
import {clearPosts, setPosts} from "../../../data/store/postsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addUsers} from "../../../data/store/usersSlice.js";
import {setSuggestions} from "../../../data/store/suggestionsSlice.js";
import HomeProfileView from "./HomeProfileView.jsx";

const HomeScreen = () => {
  const posts = useSelector(state => state.posts)
  const friends = useSelector(state => state.friends.ids)
  const suggestions = useSelector(state => state.suggestions.ids)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      const posts = await getPostsForHome()
      const userIds = posts.map(post => post.author)
      let users = []
      if (userIds.length > 0) {
        users = await getUsersWithIds(userIds)
      }
      const suggestions = await getUsersForSuggested()
      dispatch(setPosts(posts))
      dispatch(addUsers([...users, ...suggestions]))
      dispatch(setSuggestions(suggestions.map(s => s.id)))
    }

    getData()
    return () => {
      dispatch(clearPosts())
    };
  }, [dispatch]);

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
          {friends.map((friendId, index) => (
            <HomeFriendView key={index} friendId={friendId}/>
          ))}
        </div>
        {/*posts*/}
        <div className={"flex flex-col gap-4 w-[32rem]"}>
          {posts.ids.map(postId => <HomePostView key={postId} postId={postId}/>)}
          {/*{Object.keys(postsMap).map(postId => <HomePostView key={postId} post={postsMap.postId}/>)}*/}
        </div>
      </div>
      <div className={"flex flex-col gap-2 w-3/12 pt-12"}>
        {/*profile*/}
        <HomeProfileView/>
        {/*suggestions*/}
        <h5 className={"text-gray-800"}>Suggested for you</h5>
        {suggestions.map((suggestion, index) => (
          <HomeSuggestionView key={index} userId={suggestion}/>
        ))}
      </div>
    </div>
  )
}

export default HomeScreen;