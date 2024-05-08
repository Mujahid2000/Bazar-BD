import { BiMenu } from 'react-icons/bi';
import { FaArrowAltCircleDown, FaBell, FaExchangeAlt, FaHandHoldingUsd, FaHome, FaQrcode, FaUser, FaWallet,   } from 'react-icons/fa';
import { Link, NavLink, Outlet } from "react-router-dom";
import CheckAdmin from "../../Configs/CheckAdmin";
import { useState } from 'react';

const Dashboard = () => {
  const [isAdmin] = CheckAdmin();
  const [menuVisible, setMenuVisible] = useState(false);


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
};
    return (
      
<div className="min-h-screen flex bg-white">
  {/* sidebar */}
  <div className="bg-gray-200">
    <nav className="bg-white border-b border-gray-300 fixed z-50 w-full">
        <div className="flex justify-between items-center px-9">
            <button id="menuBtn" onClick={toggleMenu}>
                <BiMenu className='w-6 h-6'/>
            </button>
            <div className="ml-1">
                <h2 className='text-4xl font-bold py-4'>BazarBD</h2>
            </div>
            <div className="space-x-4">
                <button>
                   <FaBell/>
                </button>
                <button>
                   <FaUser/>
                </button>
            </div>
        </div>
    </nav>

    <div id="sideNav" className={`lg:block ${menuVisible ? '' : 'hidden'} bg-white border-black w-64 min-h-screen fixed  rounded-none border-none z-50 mt-[4.5rem]` }>
        <div className="p-4 border h-screen space-y-4">
        <ul className="mt-6 space-y-2 tracking-wide">
          <li className="min-w-max">
            <NavLink to={'/dashboard/dasboard'} aria-label="dashboard" className="relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white">
              <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
              </svg>
              <span className="-mr-1 font-medium">Dashboard</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/order'} className="bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
              </svg>
              <span className="group-hover:text-gray-700">My Orders</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/cart'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className="group-hover:text-gray-700">My Cart</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/delivery'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span className="group-hover:text-gray-700">Delivery</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/wishlist'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span className="group-hover:text-gray-700">WishList</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/products'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span className="group-hover:text-gray-700">Products</span>
            </NavLink>
          </li>
          <li className="min-w-max">
            <NavLink to={'/dashboard/addProduct'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span className="group-hover:text-gray-700">Add Product</span>
            </NavLink>
          </li>
          {
             <li className="min-w-max">
            <NavLink to={'/dashboard/user'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span className="group-hover:text-gray-700">Total User</span>
            </NavLink>
            <NavLink to={'/dashboard/adminOrder'} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              <span className="group-hover:text-gray-700">Total Order</span>
            </NavLink>
          </li>
          }
          
        </ul>
        </div>
    </div>

    
</div>
  {/* sidebar end */}

  <div className='z-10 mx-auto  bg-white'>
        <Outlet/>
    </div>
</div>
    );
};

export default Dashboard;