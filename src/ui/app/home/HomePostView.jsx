import {Link} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const HomePostView = () => {
  const post = {
    author: {
      id: "nebitan",
      name: "Bik",
      date: new Date(),
      imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
    },
    comment: "We were a proud part of the @prideinliverpool march across the city today 🙌",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Taureau_charolais_au_pr%C3%A9.jpg",
    likesCount: 23242,
    commentsCount: 5,
  }

  return (
    <div className={"flex flex-col gap-2 w-96"}>
      {/*header*/}
      <div className={"flex gap-2 items-center"}>
        <img className={"w-8 h-8 rounded-full"} src={post.author.imageUrl}/>
        <span className={"text-lg font-medium"}>{post.author.name}</span>
        <span className={"text-lg"}>{post.author.date.toDateString()}</span>
      </div>
      {/*image*/}
      <div>
        <img className={"w-full h-auto"} src={post.imageUrl}/>
      </div>
      {/*action buttons*/}
      <div className={"flex gap-2 w-full"}>
        <button><FavoriteBorderIcon/></button>
        <button><CommentIcon/></button>
        <button><ShareIcon/></button>
        <div className={"flex-grow"} />
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
            <span className={"font-medium"}>{post.author.name}</span>
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