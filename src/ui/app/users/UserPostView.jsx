import {Link} from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LikePostButton from "../../../components/posts/LikePostButton.jsx";
import {useSelector} from "react-redux";
import {postsSelector} from "../../../data/store/postsSlice.js";
import {usersSelector} from "../../../data/store/usersSlice.js";

const UserPostView = ({postId}) => {
  const post = useSelector(state => postsSelector.selectById(state, postId));
  const postAuthor = useSelector(state => usersSelector.selectById(state, post.author))

  return (
    <div className={"flex flex-col gap-2 w-full"}>
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
        <img className={"w-full h-auto aspect-square object-cover"} src={post.imageUrl}/>
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
          <Link to={`/app/users/${postAuthor?.id}`}>
            <span className={"font-medium"}>{postAuthor?.username}</span>
          </Link>
          <span> {post.comment}</span>
        </p>
      </div>
    </div>
  )
}

export default UserPostView