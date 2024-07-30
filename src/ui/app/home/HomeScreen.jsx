import HomePostView from "./HomePostView.jsx";
import HomeFriendView from "./HomeFriendView.jsx";
import HomeUserView from "./HomeUserView.jsx";

const HomeScreen = () => {
  const post = {
    author: {
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
          <HomePostView post={post} />
          <HomePostView post={post} />
          <HomePostView post={post} />
          <HomePostView post={post} />
          <HomePostView post={post} />
          <HomePostView post={post} />
        </div>
      </div>
      <div className={"flex flex-col gap-2 w-3/12 pt-12"}>
        {/*profile*/}
        <HomeUserView />
        {/*suggestions*/}
        <h5 className={"text-gray-800"}>Suggested for you</h5>
        <HomeUserView />
        <HomeUserView />
        <HomeUserView />
        <HomeUserView />
      </div>
    </div>
  )
}

export default HomeScreen;