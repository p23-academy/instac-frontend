const HomeUserView = () => {
  const user = {
    name: "Igraona Igraona",
    username: "igraona.gvu",
    imageUrl: "https://easydrawingguides.com/wp-content/uploads/2022/07/bull-head-_-face-11.png"
  }

  return (
    <div className={"flex h-12 w-full gap-2"}>
      <img className={"w-12 h-12 rounded-full border-blue-800 border-2"} src={user.imageUrl} alt={user.name} />
      <div className={"flex flex-col flex-grow"}>
        <p className={"text-sm font-medium"}>{user.name}</p>
        <p className={"text-sm"}>{user.username}</p>
      </div>
      <button className={"text-blue-800"}>
        Follow
      </button>
    </div>
  )
}

export default HomeUserView