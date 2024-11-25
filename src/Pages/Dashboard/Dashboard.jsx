import { BiMenu } from "react-icons/bi";
import {
  FaBoxOpen,
  FaCartPlus,
  FaClipboardList,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import CheckAdmin from "../../Configs/CheckAdmin";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Configs/AuthContext";
import { RiAddBoxFill, RiFileList3Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

const Dashboard = () => {
  const [isAdmin] = CheckAdmin();
  const [menuVisible, setMenuVisible] = useState(false);
  const sidebarRef = useRef(null);
  const { user } = useContext(AuthContext);
  // console.log(user);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousemove", handleClickOutside);
    };
  }, []);
  return (
    <div className="min-h-screen flex ">
      {/* sidebar */}
      <div className="bg-gray-200">
        <nav className="bg-slate-600  fixed z-50 w-full">
          <div className="flex justify-between items-center px-9">
            <button id="menuBtn" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 text-white" />
            </button>
            <div className="ml-1">
              <Link to={"/"}>
                <h2 className="text-xl font-bold text-white py-4">Dashboard</h2>
              </Link>
            </div>
            <div className="space-x-4 flex justify-center items-center">
              <button>
                <Link to={"/"}>
                  <img
                    className="w-6 h-6 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </Link>
              </button>
            </div>
          </div>
        </nav>

        <div
          ref={sidebarRef}
          id="sideNav"
          className={`lg:block xl:block 2xl:block ${
            menuVisible
              ? "translate-x-0 duration-300"
              : "-translate-x-full duration-300"
          } bg-slate-800  w-56 h-screen fixed  rounded-none   z-50  `}
        >
          <div className="h-screen  ">
            <div className="flex justify-center items-center gap-3 bg-slate-900 py-4">
             <Link to={'/'}>
             <img
                src="https://i.ibb.co.com/D5c1tZK/Screenshot-2024-06-29-180913.png"
                alt=""
                className="w-7 h-7"
              />
             </Link>
              <h4 className="text-white font-bold text-lg">BazarBD</h4>
            </div>
            <ul className="mt-16 space-y-2 mx-3 tracking-wide ">
              {isAdmin && (
                <>
                  <li className="min-w-max">
                    <NavLink
                      to={"/dashboard/dasboard"}
                      aria-label="dashboard"
                      className=" bg-gradient-to-r from-sky-600 to-cyan-400 rounded-md relative flex items-center space-x-4  px-4 py-3 text-white"
                    >
                      <svg
                        className="-ml-1 h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                          className="fill-current text-cyan-400 dark:fill-slate-600"
                        ></path>
                        <path
                          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                          className="fill-current text-cyan-200 group-hover:text-cyan-300"
                        ></path>
                        <path
                          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                          className="fill-current group-hover:text-sky-300"
                        ></path>
                      </svg>
                      <span className="-mr-1 font-medium">Dashboard</span>
                    </NavLink>
                  </li>
                  <NavLink
                    to={"/dashboard/user"}
                    className="group flex items-center rounded-md space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white  px-4 py-3 text-white"
                  >
                    <FaUser />
                    <span className="group-hover:text-gray-700">
                      Total User
                    </span>
                  </NavLink>
                  <NavLink
                    to={"/dashboard/adminOrder"}
                    className="group flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white rounded-md px-4 py-3 text-white"
                  >
                    <FaClipboardList />

                    <span className="group-hover:text-gray-700">
                      Customer Order
                    </span>
                  </NavLink>
                  <li className="min-w-max">
                    <NavLink
                      to={"/dashboard/products"}
                      className="group flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white rounded-md px-4 py-3 text-white"
                    >
                      <FaBoxOpen />

                      <span className="group-hover:text-gray-700">
                        Products
                      </span>
                    </NavLink>
                  </li>
                  <li className="min-w-max">
                    <NavLink
                      to={"/dashboard/addProduct"}
                      className="group flex items-center bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white space-x-4 rounded-md px-4 py-3 text-white"
                    >
                      <RiAddBoxFill />

                      <span className="group-hover:text-gray-700">
                        Add Product
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              <li className="min-w-max">
                <NavLink
                  to={"/dashboard/order"}
                  className="bg group bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center space-x-4 rounded-md px-4 py-3 text-white"
                >
                  <RiFileList3Fill />
                  <span className="group-hover:text-gray-700">
                    Total Orders
                  </span>
                </NavLink>
              </li>
              <li className="min-w-max">
                <NavLink
                  to={"/dashboard/cart"}
                  className="group bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center space-x-4 rounded-md px-4 py-3 text-white"
                >
                  <FaCartPlus />

                  <span className="group-hover:text-gray-700"> Cart Items</span>
                </NavLink>
              </li>
              <li className="min-w-max">
                <NavLink
                  to={"/dashboard/delivery"}
                  className="group bg-gradient-to-r from-sky-600 to-cyan-400 flex items-center space-x-4 rounded-md px-4 py-3 text-white"
                >
                  <TbTruckDelivery />

                  <span className="group-hover:text-gray-700">Delivery</span>
                </NavLink>
              </li>
              <li className="min-w-max">
                <NavLink
                  to={"/dashboard/wishlist"}
                  className="group bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white flex items-center space-x-4 rounded-md px-4 py-3 text-white"
                >
                  <FaHeart />

                  <span className="group-hover:text-gray-700">WishList</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* sidebar end */}

      <div className="z-10 mx-auto  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
