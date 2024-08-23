import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {postsSelector} from "../../../data/store/postsSlice.js";
import {usersSelector} from "../../../data/store/usersSlice.js";

const ExplorePostView = ({postId}) => {
  const post = useSelector(state => postsSelector.selectById(state, postId));
  const postAuthor = useSelector(state => usersSelector.selectById(state, post.author))

  return (
    <div className={"h-fit flex flex-col gap-2 bg-white p-2"}>
      {/*header*/}
      <div className={"flex gap-2 items-center"}>
        <img className={"w-8 h-8 rounded-full"} src={postAuthor?.imageUrl}/>
        <Link to={`/app/users/${postAuthor?.id}`}>
          <span className={"text-lg font-medium"}>{postAuthor?.username}</span>
        </Link>
        <span className={"text-lg"}>{post.date.toDate().toDateString()}</span>
      </div>
      {/*image*/}
      <div>
        <img className={"w-full h-auto object-contain"} src={post.imageUrl}/>
      </div>
      {/*post comment*/}
      <div>
        <p className={"text-md"}>
          <Link to={`/app/users/${postAuthor?.id}`}>
            <span className={"font-medium"}>{postAuthor?.username}</span>
          </Link>
          <span> {post.comment}</span>
        </p>
      </div>
    </div>
  )
}

export default ExplorePostView