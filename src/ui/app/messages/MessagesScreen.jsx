import MessagesUserView from "./MessagesUserView.jsx";
import MessagesMessageView from "./MessagesMessageView.jsx";

const MessagesScreen = () => {
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
              <MessagesMessageView ownMessage={true}/>
              <MessagesMessageView ownMessage={false}/>
              <MessagesMessageView ownMessage={true}/>
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