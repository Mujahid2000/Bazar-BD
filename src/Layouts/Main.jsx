import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Main = () => {
    const location = useLocation();

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