const FormInput = ({
  className,
  id,
  type,
  label,
  required,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className={"border border-black rounded px-2 py-1"}
        key={id}
        id={id}
        name={id}
        type={type || "text"}
        required={required}
      />
    </div>
  )
}

export default FormInput;