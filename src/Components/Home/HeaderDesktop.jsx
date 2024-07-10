import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaCartPlus, FaHeart, FaUserAlt } from 'react-icons/fa';
import { MdDashboard, MdMenu, MdMessage } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Configs/AuthContext';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

const HeaderDesktop = () => {
  const { user, logOut } = useContext(AuthContext);
  const [profileMenu, setProfielMenu] = useState(false);
  const profileMenuRef = useRef(null);

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

const handleProfileMenu=() =>{
  setProfielMenu(!profileMenu)
}
  return (
    <div className="flex flex-wrap justify-around px-4 lg:justify-evenly">
    <button className="block mb-12 md:hidden px-2 text-xl"><MdMenu/></button>
    {/* div 3 */}
        <div className="flex flex-wrap gap-3 justify-between ">
        <Link to={'/'}><img src="https://i.ibb.co/FhD0rqm/Screenshot-2024-06-29-180913.png" alt="" className="w-9 h-8" /></Link>
        <Link to={'/'}><h1 className="text-sky-400 text-2xl font-bold">Brand</h1></Link>
        </div>
      
        <div className="flex lg:gap-80 flex-col-reverse justify-between md:flex-row">
         {/* this is div 2 */}
        <div className="flex md:py-3 lg:py-0  md:flex-row ">
         
<div className="flex ">
<input onChange={handleSearch}
                onKeyDown={handleEnterPress} type="text" placeholder="Search "
 className="w-full md:w-80 px-3 h-10  md:rounded-l-lg  border-2 border-blue-500  focus:outline-none focus:"
 />
<select id="pricingType" name="pricingType"
className="w-1/3 h-10 hidden md:block  focus:outline-none focus: text-gray-400  border-t-2 border-b-2  border-sky-600 px-2 md:px-3 py-0 md:py-1 tracking-wider">
<option value="All" selected="">All Category</option>
<option value="Freemium">Freemium</option>
<option value="Free">Free</option>
<option value="Paid">Paid</option>
</select>
</div>
<button type="submit" className="bg-blue-600 hidden md:block w-24 text-white rounded-r-md px-3 md:px-3 py-0 md:py-1">Search</button>
</div> 
    
    
      {/* div 1 */}
         <div className="flex gap-5 px-2 justify-center items-center text-center">
         {
                    user ? <div className="ml-5">
                       <img onClick={() => setProfielMenu(!profileMenu)} src={user?.photoURL} alt="" className="w-8 h-8 rounded-full cursor-pointer"/>
                        {
                            profileMenu == true ? 
                            <ul
  role="menu"
  data-popover="profile-menu"
  data-popover-placement="bottom"
  className="absolute mr-[17%] mt-1 z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg right-10 top-16 shadow-blue-gray-500/10 focus:outline-none"
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
                    </div> :  <button
            
            className="block items-center justify-center flex flex-col text-gray-400 text-base"
          >
            <FaUserAlt />
            <p>User</p>
          </button>
                }
         <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
         <MdMessage className="ml-6"/>
         <p>Message</p>
         </button>
         {
          user ? <Link to={'/dashboard/order'}>
          <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
          <FaHeart className="ml-3"/>
          <p>Order</p>
          </button>
          </Link>:
          <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
          <FaHeart className="ml-3"/>
          <p>Order</p>
          </button>
         }
         {
          user ? <Link to={'/dashboard/cart'}>
          <button className="block items-center justify-center flex flex-col text-gray-400 text-base">
          <FaCartPlus/>
          <p>Cart</p>
          </button>
          </Link>:
          <button className="block items-center justify-center flex flex-col text-gray-400 text-base">
          <FaCartPlus/>
          <p>Cart</p>
          </button>
         }
        </div> 

     

       </div>
      
     </div>
  );
};

export default HeaderDesktop;
