import  { useContext, useState } from 'react';
import { FaCartPlus, FaHeart, FaUserAlt } from 'react-icons/fa';
import { MdDashboard, MdMenu, MdMessage } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Configs/AuthContext';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';


const HeaderMobile = () => {
    const [menu, setMenu] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [profileMenu, setProfielMenu] = useState(false);


    const handleLogOut = () =>{
        logOut()
        .then(() => {})
        .catch(console.error)
    }
    return (
        <div className="flex flex-col md:flex-row justify-between px-2 items-center lg:justify-between">
            {/* Logo name and icons */}
            <div className="flex flex-wrap gap-1 justify-between w-full md:w-auto">
                <div className="flex items-center gap-1">
                    <button onClick={() => setMenu(!menu)} className="block md:hidden px-2 text-xl">
                        <MdMenu />
                    </button>
                    <Link><img src="https://i.ibb.co/C1knfqQ/Screenshot-2024-06-29-180913-removebg-preview.png" alt="" className="w-9 h-8" /> </Link>
                    
                    <Link to={'/'}><h1 className="text-sky-400 text-base lg:text-2xl font-bold">Brand</h1></Link>
                </div>
                <div className='flex'>
                    <div className='absolute'>
                    </div>
                    <div className={`${menu ? 'translate-y-0' : '-translate-y-full'} transition-transform z-50 duration-500 absolute top-2 left-0 px-3 py-4 bg-white w-full md:relative md:top-0 md:left-0 h-screen md:h-auto md:w-auto md:bg-transparent md:translate-y-0`}>
                    <button onClick={() => setMenu(!menu)} className='space-y-3 ml-1'><RxCross2 /></button>
                    <ul className=''>
                        
                        <Link to={'/'}><li className="font-semibold my-5">All Category</li></Link>
                        <Link to={'/flashSale'}><li className="font-semibold my-5">Flash Sales</li></Link>
                        <Link to={'/shop'}><li className="font-semibold my-5">Shops</li></Link>
                        <Link to={''}><li className="font-semibold my-5">Help</li></Link>
                    </ul>
                </div>
                </div>
                <div className="flex gap-2 justify-center items-center text-center md:ml-4 mt-2 md:mt-0">
                {
                    user ? <div className="ml-5">
                       <img onClick={() => setProfielMenu(!profileMenu)} src={user?.photoURL} alt="" className="w-8 h-8 rounded-full cursor-pointer"/>
                        {
                            profileMenu == true ? 
                            <ul
  role="menu"
  data-popover="profile-menu"
  data-popover-placement="bottom"
  className="absolute ml-24 mt-1 z-50 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg right-10 top-16 shadow-blue-gray-500/10 focus:outline-none"
>
  <Link to={'/profile'}>
  <button
    tabIndex="-1"
    role="menuitem"
    className="flex hover:bg-slate-200 w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
  >
    <CgProfile className="w-4 h-4 rotate-0"/>

    <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
      My Profile
    </p>
  </button>

  </Link>
    
  <Link to={'/dashboard'}>
  <button
    tabIndex="-1"
    role="menuitem"
    className="flex hover:bg-slate-200 w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
  >
    <MdDashboard className="w-4 h-4 rotate-0"/>

    <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
      Dashboard
    </p>
  </button>
    </Link>
  
  <hr className="my-2 border-blue-gray-50"  role="menuitem" />
  <button onClick={handleLogOut}
    tabIndex="-1"
    role="menuitem"
    className="flex w-full cursor-pointer hover:bg-slate-200 select-none items-center gap-2 rounded-md px-3 pt-[2px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
  >
    <AiOutlineLogout className="w-4 h-4 rotate-0"/>

    <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
      Sign Out
    </p>
  </button>
</ul>

                : ''
                        }
                    </div> :  <Link to={'/signIn'}><button 
            
            className="block items-center justify-center flex flex-col text-gray-400 text-base"
          >
           Login
          </button></Link>
                }
                   
                    <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
                        <MdMessage className="ml-6" />
                        <p>Message</p>
                    </button>
                    <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
                        <FaHeart className="ml-3" />
                        <p>Order</p>
                    </button>
                    <Link to={'/dashboard/cart'}> <button className="block items-center justify-center flex flex-col text-gray-400 text-base">
                        <FaCartPlus className='w-5 h-5'/>
                        <p className='hidden md:block'>Cart</p>
                    </button></Link>
                </div>
            </div>

            {/* Search input */}
            <div className="w-full px-2 mt-2 md:mt-0 md:w-auto">
                <input type="text" placeholder="Search"
                    className="w-full lg:w-80 xl:max-w-full px-3 h-10 rounded-lg border-2 border-blue-500 focus:outline-none" />
            </div>
            <hr />
        </div>
    );
};

export default HeaderMobile;
