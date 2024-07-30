import {Link} from "react-router-dom";

function App() {

  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <Link to={"/login"}>Login</Link>
    </div>
  )
}

export default App
