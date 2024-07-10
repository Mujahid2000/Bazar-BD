import  { useState } from 'react';
import { FaCartPlus, FaHeart, FaUserAlt } from 'react-icons/fa';
import { MdMenu, MdMessage } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";


const HeaderMobile = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div className="flex flex-col md:flex-row justify-between px-2 items-center lg:justify-between">
            {/* Logo name and icons */}
            <div className="flex flex-wrap gap-1 justify-between w-full md:w-auto">
                <div className="flex items-center gap-1">
                    <button onClick={() => setMenu(!menu)} className="block md:hidden px-2 text-xl">
                        <MdMenu />
                    </button>
                    <img src="https://i.ibb.co/C1knfqQ/Screenshot-2024-06-29-180913-removebg-preview.png" alt="" className="w-9 h-8" />
                    <h1 className="text-sky-400 text-base lg:text-2xl font-bold">Brand</h1>
                </div>
                <div className='flex'>
                    <div className='absolute'>
                    </div>
                    <div className={`${menu ? 'translate-y-0' : '-translate-y-full'} transition-transform z-50 duration-500 absolute top-2 left-0 px-3 py-4 bg-white w-full md:relative md:top-0 md:left-0 h-screen md:h-auto md:w-auto md:bg-transparent md:translate-y-0`}>
                    <button onClick={() => setMenu(!menu)} className='space-y-3 ml-1'><RxCross2 /></button>
                    <ul className=''>
                        <a href="#"><li className="font-semibold my-5">Hot Offers</li></a>
                        <a href="#"><li className="font-semibold my-5">All Category</li></a>
                        <a href="#"><li className="font-semibold my-5">Gift Boxes</li></a>
                        <a href="#"><li className="font-semibold my-5">Projects</li></a>
                        <a href="#"><li className="font-semibold my-5">Menu Item</li></a>
                    </ul>
                </div>
                </div>
                <div className="flex gap-2 justify-center items-center text-center md:ml-4 mt-2 md:mt-0">
                    <button className="block items-center justify-center flex flex-col text-gray-400 text-base">
                        <FaUserAlt />
                        <p>User</p>
                    </button>
                    <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
                        <MdMessage className="ml-6" />
                        <p>Message</p>
                    </button>
                    <button className="hidden lg:block items-center justify-center flex flex-col text-gray-400 text-base">
                        <FaHeart className="ml-3" />
                        <p>Order</p>
                    </button>
                    <button className="block items-center justify-center flex flex-col text-gray-400 text-base">
                        <FaCartPlus />
                        <p>Cart</p>
                    </button>
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
