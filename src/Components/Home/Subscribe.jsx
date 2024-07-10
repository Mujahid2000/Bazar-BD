

const Subscribe = () => {
    return (
        <div className="max-w-[1400px] py-5 mx-auto bg-[#EFF2F4] px-9 ">
            <h4 className=" text-gray-700  text-2xl font-semibold leading-7 tracking-tighter text-center">Subscribe on our newsletter</h4>
            <p className="text-gray-600  text-xl mt-3 font-normal leading-6 tracking-tighter text-center">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="flex flex-col justify-center mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                    <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address"/>
            
                    <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 rounded-md bg-gradient-to-r from-blue-700 to-blue-500 ">
                        Subscribe
                    </button>
                </div>
        </div>
    );
};

export default Subscribe;