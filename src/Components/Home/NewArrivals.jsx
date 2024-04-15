
import { IoIosArrowRoundForward } from "react-icons/io";

const NewArrivals = () => {
    return (
        <div className="px-3">
            <h2 className="ml-32 mb-4 underline text-2xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-5xl font-bold">New Arrival</h2>
           <div className='flex flex-col md:flex-row lg:flex-row gap-9 justify-evenly items-center'>
           <div className="relative">
            <img src="https://i.ibb.co/D5wGq6F/playstation5-copy.jpg" alt="" className='w-full h-[48rem] border shadow-md'/>
            <div className="absolute top-[40rem] left-2 p-4  text-black">
    <h2 className="text-xl font-bold text-black">Speakers</h2>
    <p className="text-sm text-black">Beautiful Branded Speaker</p>
    <button  className="flex items-center text-black border border-black active:text-white active:border-none  active:bg-orange-600 py-1 mt-2 px-4 gap-2 rounded  ">
    <span>
        Shop Now
    </span>
    <IoIosArrowRoundForward />

</button>
  </div>
            </div>
            <div>
            <div className="relative">
  <img src="https://i.ibb.co/Qv4f2yD/women.jpg" alt="" className="h-96 w-full mt-3 border shadow-md" />
  <div className="absolute top-[15rem] left-2 p-4 text-white">
    <h2 className="text-xl font-bold">Women Collection 5</h2>
    <p className="text-sm">Black and White version of the PS5 coming out on scale</p>
    <button  className="flex items-center text-white border border-white  active:bg-orange-600 py-1 mt-2 px-4 gap-2 rounded  ">
    <span>
        Shop Now
    </span>
    <IoIosArrowRoundForward />

</button>
  </div>
</div>

            <div className="relative">
            <img src="https://i.ibb.co/H4Fqtxx/speakers.webp" alt="" className='w-full h-96 mt-3 border shadow-md'/>
            <div className="absolute top-[16rem] left-2 p-4 text-black">
    <h2 className="text-xl font-bold">Speakers</h2>
    <p className="text-sm">Beautiful Branded Speaker</p>
    <button  className="flex items-center active:text-white active:border-white text-black border border-black  active:bg-orange-600 py-1 mt-2 px-4 gap-2 rounded  ">
    <span>
        Shop Now
    </span>
    <IoIosArrowRoundForward />

</button>
  </div>
            </div>
            </div>
           </div>
        </div>
    );
};

export default NewArrivals;