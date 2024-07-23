const Button = ({
  className,
  text,
  onClick,
  type
}) => {
  return (
    <button
      className={`text-lg bg-blue-800 text-white rounded-2xl p-2 min-w-24 ${className}`}
      onClick={onClick}
      type={type || "button"}
    >
      {text}
    </button>
  )
}

export default Button