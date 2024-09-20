import { Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";


const Home = () => {
  return (
      <div>
          
          <Nav />

          <Outlet />
    </div>
  )
}

export default Home;
