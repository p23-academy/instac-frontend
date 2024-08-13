import {Link} from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LikePostButton from "../../../components/posts/LikePostButton.jsx";
import {useSelector} from "react-redux";
import {postsSelector} from "../../../data/store/postsSlice.js";

const HomePostView = ({postId}) => {
  const post = useSelector(state => postsSelector.selectById(state, postId));

  return (
    <div className={"flex flex-col gap-2 w-96"}>
      {/*header*/}
      <div className={"flex gap-2 items-center"}>
        <img className={"w-8 h-8 rounded-full"} src={post.author.imageUrl}/>
        <span className={"text-lg font-medium"}>{post.author.username}</span>
        <span className={"text-lg"}>{post.date.toDate().toDateString()}</span>
      </div>
      {/*image*/}
      <div>
        <img className={"w-full h-auto"} src={post.imageUrl}/>
      </div>
      {/*action buttons*/}
      <div className={"flex gap-2 w-full"}>
        <LikePostButton postId={postId}/>
        <button><CommentIcon/></button>
        <button><ShareIcon/></button>
        <div className={"flex-grow"}/>
        <button><BookmarkBorderIcon/></button>
      </div>
      {/*likes count*/}
      <div>
        <p className={"font-medium text-sm"}>{post.likesCount} likes</p>
      </div>
      {/*post comment*/}
      <div>
        <p className={"text-md"}>
          <Link to={`/app/users/${post.author.id}`}>
            <span className={"font-medium"}>{post.author.username}</span>
          </Link>
          <span> {post.comment}</span>
        </p>
      </div>
      {/*view add comments*/}
      <div className={"flex flex-col text-sm text-gray-400"}>
        <p>View all {post.commentsCount} comments</p>
        <p>Add a new comment</p>
      </div>
    </div>
  )
}

export default HomePostView