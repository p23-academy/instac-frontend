import {useNavigate} from "react-router-dom";

const HomeFriendView = () => {
  const navigate = useNavigate();

  const friend = {
    id: "nebitan",
    name: "Bik",
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }

  return (
    <button
      className={"flex flex-col w-12 items-center"}
      onClick={() => navigate(`/app/users/${friend.id}`)}
    >
      <img className={"w-12 h-12 rounded-full border-2 border-blue-800"} src={friend.imageUrl} alt={friend.name} />
      <p>{friend.name}</p>
    </button>
  )
}

export default HomeFriendView