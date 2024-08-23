import MessagesUserView from "./MessagesUserView.jsx";
import MessagesMessageView from "./MessagesMessageView.jsx";
import {getMessagesByUser, getUserById} from "../../../data/firebase/firebaseDatabase.js";
import {redirect, useLoaderData} from "react-router-dom";

export const messagesScreenLoader = async ({params}) => {
  const userId = params.userId
  const user = await getUserById(userId)
  if (!user) {
    return redirect('/app/home')
  }
  const messages = await getMessagesByUser(userId)
  return {user, messages}
}

const MessagesScreen = () => {
  const {user, messages} = useLoaderData()

  return (
    <div className={"h-screen w-full flex justify-center items-center"}>
      {/*chat*/}
      <div className={"h-4/5 w-9/12 bg-blue-200 rounded-3xl flex"}>
        {/*users*/}
        <div className={"h-full w-1/4 flex flex-col p-2 bg-blue-600 rounded-l-3xl"}>
          <MessagesUserView/>
          <MessagesUserView/>
          <MessagesUserView/>
          <MessagesUserView/>
        </div>
        {/*messages*/}
        <div className={"h-full w-3/4 flex flex-col"}>
          {/*listing messages*/}
          <div className={"h-4/5 w-full p-4 pb-0"}>
            <div className={"h-full w-full flex flex-col gap-2 p-2 bg-blue-100"}>
              {messages.map((message, index) => (
                <MessagesMessageView key={index} message={message}/>
              ))}
            </div>
          </div>
          {/*writing messages*/}
          <div className={"h-1/5 w-full p-4 flex gap-2"}>
            <textarea className={"w-full h-full resize-none"}></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesScreen;