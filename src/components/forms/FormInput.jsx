const FormInput = ({
  className,
  name,
  type,
  label,
  required,
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        className={"border border-black rounded px-2 py-1"}
        key={name}
        id={name}
        name={name}
        type={type || "text"}
        required={required}
      />
    </div>
  )
}

export default FormInput;