import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext, useEffect } from "react";
import {ScrollContext} from "../Configs/ScrollTope"

const Main = () => {
    const location = useLocation();
    const { setPathname } = useContext(ScrollContext);
    

  useEffect(() => {
    setPathname(location.pathname); // Update path when route changes
  }, [location.pathname]);

    const noHeadFoot = location.pathname.includes('/signIn') || location.pathname.includes('/signUp')
    return (
        <div>
            {noHeadFoot || <Navbar/>}
            <Outlet/>
            {noHeadFoot || <Footer></Footer>}
        </div>
    );
};

export default Main;