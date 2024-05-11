import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { IoMdMenu } from "react-icons/io";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../Configs/AuthContext";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menu, setMenu] = useState(false);
    
    let Links = [
        {name: 'HOME', link: '/', id: 1},
        {name: 'SHOP', link: '/shop', id: 2},
        {name: 'FLASH SALE', link: '/flashSale', id:3},
        
    ]
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };
    
    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && searchQuery) {
        const encodedQuery = encodeURIComponent(searchQuery);
        navigate(`/result?q=${encodedQuery}`);
        }
    }

    const handleLogOut = () =>{
        logOut()
        .then(() => {})
        .catch(console.error)
    }
    

    return (
        <div className="shadow-md w-full fixed top-0 left-0 z-50">
            <div className="flex  md:flex justify-between items-center bg-white py-4 md:px-10 px-7">
                <div className="font-bold text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
                <Link to="/" className="text-gray-800">
                        <h3>BAZAR BD</h3>
                    </Link>
                <input onChange={handleSearch}
                onKeyDown={handleEnterPress} className="rounded-lg w-2/4 border border-gray-500 px-4 py-1 ml-3 text-lg focus:outline-none" type="text" placeholder="search..." />
                </div>
                
                
                <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden">
                {open ? < IoMdClose/> : <IoMdMenu />}
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16' : 'top-[-490px]'} `}>
                {
                    Links.map((nav) =>(
                        <li className="md:ml-8 text-sm md:my-0 my-7" key={nav.id}>
                        <NavLink to={nav.link} className={`hover:text-orange-600 duration-500`}  >
                        {nav.name}
                        </NavLink>
                        </li>
                    ))
                }

                {
                    user ? <div className="ml-5">
                       <img onClick={() => setMenu(!menu)} src={user?.photoURL} alt="" className="w-8 h-8 rounded-full cursor-pointer"/>
                        {
                            menu == true ? 
                            <ul
  role="menu"
  data-popover="profile-menu"
  data-popover-placement="bottom"
  className="absolute z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg right-10 top-16 shadow-blue-gray-500/10 focus:outline-none"
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
    
  <Link to={'/dashboard/dasboard'}>
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
                    </div> : <Link to={'/signIn'}>
                    <button className="bg-indigo-600 active:bg-indigo-700 text-white font-Poppins py-2 px-6 rounded md:ml-8 hover:bg-indigo-500 duration-500">
                        LOG IN
                    </button>
                    </Link>
                }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;