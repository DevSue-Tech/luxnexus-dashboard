import { Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";
import AppFooter from "./components/footer/Footer";
import { useContext } from "react";
import { AdminDashboardContext } from "../../utils/context/admin-state-context/AdminContext";
import { AdminDashboardProps } from "../../utils/context/admin-state-context/types/AdminTypes";




const Home = () => {
  

  return (
      <div>
          
          <Nav />

      <Outlet />
   
      <AppFooter />
    </div>
  )
}

export default Home;
