import { useContext, useEffect, useRef, useState } from 'react';
import { FaCartPlus, FaHeart, FaUserAlt } from 'react-icons/fa';
import { MdDashboard, MdMessage } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Configs/AuthContext';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

const HeaderDesktop = () => {
  const { user, logOut } = useContext(AuthContext);
  const [profileMenu, setProfielMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Handle clicks outside the input or dropdown to hide suggestions
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Fetch product suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const dibounce = setTimeout(() => {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get('https://postgre-server.vercel.app/product');
          const products = response.data.data;
         
          const suggestions = products
            .filter((product) =>
              product.productname.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => product.productname);
            
          setFilteredSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(dibounce)
  }, [searchQuery]);

  
  // Handle input change
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  // Show suggestions when input is clicked and has a value
  const handleShowFunction = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };


  // Navigate to result when Enter is pressed
  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/result?q=${encodedQuery}`);
      setShowSuggestions(false);
    }
  };

  // Navigate to result when Search button is clicked
  const handleSearchClick = () => {
    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/result?q=${encodedQuery}`);
      setShowSuggestions(false);
    }
  };

  // Handle profile menu toggle
  const handleProfileMenu = () => {
    setProfielMenu(!profileMenu);
  };

  // Select a suggestion and navigate
  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    const encodedQuery = encodeURIComponent(suggestion);
    navigate(`/result?q=${encodedQuery}`);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(console.error);
  };

  return (
    <div className="flex mx-auto justify-center gap-32 px-4 lg:px-8 items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <Link to={'/'}>
          <img
            src="https://i.ibb.co/FhD0rqm/Screenshot-2024-06-29-180913.png"
            alt=""
            className="w-9 h-8"
          />
        </Link>
        <Link to={'/'}>
          <h1 className="text-sky-400 text-2xl font-bold">Brand</h1>
        </Link>
      </div>

      {/* Search Section */}
      <div ref={containerRef} className="relative flex flex-col items-start w-full lg:max-w-[800px]">
        {/* Search Input */}
        <div className="flex items-center w-full">
          <input
            onClick={handleShowFunction}
            onChange={handleSearchInput}
            onKeyDown={handleEnterPress}
            type="text"
            value={searchQuery}
            placeholder="Search"
            className="flex-grow px-4 h-10 border-2 border-blue-500 rounded-l-md focus:outline-none"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-600 w-24 h-10 text-white rounded-r-md"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute mt-[3.3rem] w-full bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
            {filteredSuggestions.slice(0, 10).map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Actions Section */}
      <div className="flex gap-5 items-center text-center">
        {user ? (
          <div className="relative">
            <img
              onClick={handleProfileMenu}
              src={user?.photoURL}
              alt=""
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            {profileMenu && (
              <ul
                role="menu"
                data-popover="profile-menu"
                data-popover-placement="bottom"
                className="absolute z-10 min-w-[180px] flex flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 shadow-lg right-0 top-12"
              >
                <Link to={'/profile'}>
                  <button
                    tabIndex="-1"
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-200"
                  >
                    <CgProfile className="w-4 h-4" />
                    <p>My Profile</p>
                  </button>
                </Link>
                <Link to={'/dashboard'}>
                  <button
                    tabIndex="-1"
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-200"
                  >
                    <MdDashboard className="w-4 h-4" />
                    <p>Dashboard</p>
                  </button>
                </Link>
                <hr className="my-2" />
                <button
                  onClick={handleLogOut}
                  tabIndex="-1"
                  role="menuitem"
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-200"
                >
                  <AiOutlineLogout className="w-4 h-4" />
                  <p>Sign Out</p>
                </button>
              </ul>
            )}
          </div>
        ) : (
          <button className="flex flex-col items-center text-gray-400">
            <FaUserAlt />
            <p>User</p>
          </button>
        )}
        <button className="hidden lg:flex flex-col items-center text-gray-400">
          <MdMessage />
          <p>Message</p>
        </button>
        {user ? (
          <Link to={'/dashboard/order'}>
            <button className="hidden lg:flex flex-col items-center text-gray-400">
              <FaHeart />
              <p>Order</p>
            </button>
          </Link>
        ) : (
          <button className="hidden lg:flex flex-col items-center text-gray-400">
            <FaHeart />
            <p>Order</p>
          </button>
        )}
        {user ? (
          <Link to={'/dashboard/cart'}>
            <button className="flex flex-col items-center text-gray-400">
              <FaCartPlus />
              <p>Cart</p>
            </button>
          </Link>
        ) : (
          <button className="flex flex-col items-center text-gray-400">
            <FaCartPlus />
            <p>Cart</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderDesktop;
