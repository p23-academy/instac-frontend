const MessagesUserView = () => {
  const user = {
    name: "Igraona Igraona",
    username: "igraona.gvu",
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }

  return (
    <button className={"flex h-16 w-full gap-2 p-2 text-white hover:bg-blue-400 rounded-xl"}>
      <img className={"w-12 h-12 rounded-full border-blue-800 border-2"} src={user.imageUrl} alt={user.name} />
      <div className={"flex flex-col items-start flex-grow"}>
        <p className={"text-sm font-medium"}>{user.name}</p>
        <p className={"text-sm"}>{user.username}</p>
      </div>
    </button>
  )
}

export default MessagesUserView