import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { MdDashboard, MdMenu } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { IoMdMenu } from "react-icons/io";
import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../Configs/AuthContext";
import HeaderMobile from "../Components/Home/HeaderMobile";
import HeaderDesktop from "../Components/Home/HeaderDesktop";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [menu, setMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dropDown, setDropdown] = useState(false);
    const [currency, setCurrency] = useState(false)
    const [shipping, setShipping] = useState(false);

    
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
      <div className="py-4">
      <nav>
          <div>
          <div>
{isMobile ? <HeaderMobile/> : <HeaderDesktop />}
</div>
          </div>





          <hr className="my-3"/>
          {/* another side */}
           <div className="px-auto hidden md:flex lg:gap-64 lg:justify-around">
          <div className="flex gap-5 items-center">
          <button><MdMenu className="text-xl"/></button>
          <ul className="flex gap-16 text-base">
              <Link to='/'><li className="font-semibold text-sm md:text-base">All Category</li></Link>
              <Link to={'/flashSale'}><li className="font-semibold text-sm md:text-base">Flash Sale</li></Link>
              <Link to={'/shop'}><li className="font-semibold text-sm md:text-base">Shops</li></Link>
              {/* <a href=""><li className="font-semibold text-sm md:text-base">Projects</li></a> */}
              {/* <a href=""><li className="font-semibold text-sm md:text-base">Menu Item</li></a> */}
              
              <li className="font-semibold"><button onClick={()=>setDropdown(!dropDown)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="  pl-3 pr-4 py-2  md:hover:text-blue-700 md:p-0  flex items-center justify-between w-full md:w-auto">Help <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
     
          <div id="dropdownNavbar" className={`${dropDown ? 'animate-fade-down bg-white absolute text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44' : ' hidden'}`}>
              <ul className="py-1" aria-labelledby="dropdownLargeButton">
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Support in message</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Support in email</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Live contact</a>
              </li>
              </ul>
              
          </div></li>
          </ul>
          </div>
          <div className="">
              <ul className="flex gap-5">
                  <li><button onClick={()=>setCurrency(!currency)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="  pl-3 pr-4 py-2  md:hover:text-blue-700 md:p-0  flex items-center justify-between w-full md:w-auto font-semibold">English, USD <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <li>
                  <div id="dropdownNavbar" className={`${currency ? 'animate-fade-down bg-white absolute text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44' : ' hidden'}`}>
              <ul className="py-1" aria-labelledby="dropdownLargeButton">
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Support in message</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Support in email</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Live contact</a>
              </li>
              </ul>
              
          </div>
                  </li>
                  </li>
                  <li>
                  <button onClick={()=>setShipping(!shipping)} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="  pl-3 pr-4 py-2  md:hover:text-blue-700 md:p-0  flex items-center justify-between w-full md:w-auto font-semibold">Ship to <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </button>
                  <div id="dropdownNavbar" className={`${shipping ? 'animate-fade-down bg-white absolute text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44' : ' hidden'}`}>
              <ul className="py-1" aria-labelledby="dropdownLargeButton">
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Asia</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Europe</a>
              </li>
              <li>
                  <a href="#" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">China</a>
              </li>
              </ul>
              
          </div>
                  </li>
              </ul>
          </div>
          </div> 
           <hr className="mt-3 hidden md:block"/> 
      </nav>
  </div>
    );
};

export default Navbar;