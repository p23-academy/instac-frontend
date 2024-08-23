import ExplorePostView from "./ExplorePostView.jsx";
import {getPostsForExplore, getUsersWithIds} from "../../../data/firebase/firebaseDatabase.js";
import {clearPosts, setPosts} from "../../../data/store/postsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Masonry} from "@mui/lab";
import {useEffect} from "react";
import {addUsers} from "../../../data/store/usersSlice.js";

const ExploreScreen = () => {
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      const posts = await getPostsForExplore()
      const userIds = posts.map(post => post.author)
      const users = await getUsersWithIds(userIds)
      dispatch(setPosts(posts))
      dispatch(addUsers(users))
    }

    getData()
    return () => {
      dispatch(clearPosts())
    };
  }, [dispatch]);

  return (
    <div className={"flex-grow w-full h-screen overflow-y-auto flex p-4"}>
      <Masonry columns={4} spacing={2}>
        {posts.ids.map(postId => <ExplorePostView key={postId} postId={postId}/>)}
      </Masonry>
    </div>
  )
}

export default ExploreScreen;