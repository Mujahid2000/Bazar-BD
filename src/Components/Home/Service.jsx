import { IoSearch } from "react-icons/io5";

const Service = () => {
  return (
    <div className="max-w-[1440px] px-3 mx-auto mb-4 mt-14">
      <h2 className="text-2xl font-bold leading-8 text-left ml-3 mb-4">Our extra services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 place-items-center">
        {/* card 1 */}
            <div className="relative flex flex-col shadow-md rounded-md overflow-hidden  max-w-80">
            <div className="h-auto overflow-hidden">
            <div className="h-36 overflow-hidden relative">
            <img className="hover:-translate-y-1 hover:scale-110 duration-300"
            src="https://res.cloudinary.com/diez3alve/image/upload/v1732548363/Webp-net-resizeimage_lbw24a.jpg" alt=""/>
            </div>
            </div>
            <div className="hover:bg-gray-200 hover:duration-500 absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
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
            <img className="hover:-translate-y-1 hover:scale-110 duration-300"
            src="https://res.cloudinary.com/diez3alve/image/upload/v1732548363/Webp-net-resizeimage-1_zgwwea.jpg" alt=""/>
            </div>
            </div>
            <div className="hover:bg-gray-200 hover:duration-500 absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
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
            <img className="hover:-translate-y-1 hover:scale-110 duration-300"
            src="https://res.cloudinary.com/diez3alve/image/upload/v1732548363/Webp-net-resizeimage-2_ncj8uw.jpg" alt=""/>
            </div>
            </div>
            <div className="hover:bg-gray-200 hover:duration-500 absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
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
            <img className="hover:-translate-y-1 hover:scale-110 duration-300"
            src="https://res.cloudinary.com/diez3alve/image/upload/v1732548363/Webp-net-resizeimage-3_evo9lh.jpg" alt=""/>
            </div>
            </div>
            <div className="hover:bg-gray-200 hover:duration-500 absolute flex ml-64 mt-28 bg-white p-4 text-black rounded-full">
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