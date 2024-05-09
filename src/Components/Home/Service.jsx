import { IoSearch } from "react-icons/io5";

const Service = () => {
  return (
    <div className="max-w-[1850px] mx-auto mb-4 mt-20">
      <h2 className="text-2xl font-bold leading-8 text-left ml-16 mb-4">Our extra services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 place-items-center">
        {/* card 1 */}
            <div className="relative flex flex-col shadow-md rounded-md overflow-hidden  max-w-80">
            <div className="h-auto overflow-hidden">
            <div className="h-36 overflow-hidden relative">
            <img
            src="https://i.ibb.co/L1M0FFr/Webp-net-resizeimage.jpg" alt=""/>
            </div>
            </div>
            <div className="absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
            <IoSearch />
            </div>
            <div className="bg-white py-5">
            <h3 className="text-gray-700 ml-3 font-inter font-medium text-base leading-6">
            Source from Industry Hubs
            </h3>
            </div>
            </div>
            {/* card 2 */}
            <div className="relative flex flex-col shadow-md rounded-md overflow-hidden  max-w-80">
            <div className="h-auto overflow-hidden">
            <div className="h-36 overflow-hidden relative">
            <img
            src="https://i.ibb.co/Q8wkTpg/Webp-net-resizeimage-1.jpg" alt=""/>
            </div>
            </div>
            <div className="absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
            <IoSearch />
            </div>
            <div className="bg-white py-5">
            <h3 className="text-gray-700 ml-3 font-inter font-medium text-base leading-6">
            Customize Your Products
            </h3>
            </div>
            </div>
            {/* card 3 */}
            <div className="relative flex flex-col shadow-md rounded-md overflow-hidden  max-w-80">
            <div className="h-auto overflow-hidden">
            <div className="h-36 overflow-hidden relative">
            <img
            src="https://i.ibb.co/26qT7mK/Webp-net-resizeimage-2.jpg" alt=""/>
            </div>
            </div>
            <div className="absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
            <IoSearch />
            </div>
            <div className="bg-white py-5">
            <h3 className="text-gray-700 ml-3 font-inter font-medium text-base leading-6">
            Fast, reliable shipping by ocean or air
            </h3>
            </div>
            </div>
            {/* card 4 */}
            <div className="relative flex flex-col shadow-md rounded-md overflow-hidden  max-w-80">
            <div className="h-auto overflow-hidden">
            <div className="h-36 overflow-hidden relative">
            <img
            src="https://i.ibb.co/hLH715M/Webp-net-resizeimage-3.jpg" alt=""/>
            </div>
            </div>
            <div className="absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
            <IoSearch />
            </div>
            <div className="bg-white py-5">
            <h3 className="text-gray-700 ml-3 font-inter font-medium text-base leading-6">
            Product monitoring and inspection
            </h3>
            </div>
            </div>
    </div>
    </div>
  );
};

export default Service;
