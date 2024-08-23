const MessagesMessageView = ({
  message,
}) => {
  const dynamicClass = message.ownMessage ?
    "rounded-tl-none bg-blue-800" : "rounded-tr-none bg-green-800 self-end"

  return (
    <div className={`flex h-14 w-fit max-w-80 gap-2 p-2 text-white rounded-xl ${dynamicClass}`}>
      <img className={"w-10 h-10 rounded-full"} src={message.author.imageUrl} alt={message.author.name}/>
      <div className={"flex flex-col items-start flex-grow"}>
        <p className={"text-sm font-medium"}>{message.author.name}</p>
        <p className={"text-sm"}>{message.text}</p>
      </div>
    </div>
  )
}

export default MessagesMessageView