import {useState} from "react";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={"h-screen w-screen bg-blue-200 flex justify-center items-center"}>
      <div className={"flex flex-col"}>
        {/*form*/}
        <div className={"bg-white w-96 h-96 rounded-t-2xl flex justify-center items-center"}>
          {isLogin ? <LoginForm/> : <RegisterForm/>}
        </div>
        {/*footer*/}
        <div className={"flex"}>
          <LoginScreenTab text={"Login"} onClick={() => setIsLogin(true)} active={isLogin}/>
          <LoginScreenTab text={"Register"} onClick={() => setIsLogin(false)} active={!isLogin}/>
        </div>
      </div>
    </div>
  )
}

const LoginScreenTab = ({
  active,
  text,
  onClick,
}) => {
  return (
    <div className={`${active ? "bg-white" : "bg-blue-100"} h-12 w-48 flex justify-center items-center rounded-b-2xl`}>
      <button className={"text-lg w-full h-full"} onClick={onClick}>{text}</button>
    </div>
  )
}

export default LoginScreen;