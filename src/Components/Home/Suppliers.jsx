

const Suppliers = () => {
    return (
        <div className="max-w-[1400px] md:rounded-lg mb-9 mt-7 px-6 z-10 max-h-[446px] mx-auto relative" style={{backgroundImage: 'url("https://i.ibb.co/hCDGvkv/warehouse.jpg")'}}>
            <div className="absolute md:rounded-lg inset-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-200 opacity-80"></div>
            <div className="z-20 relative flex justify-evenly gap-80 text-white p-8">
                <div>
                    <h1 className="text-[1rem] text-left md:text-4xl lg:text-5xl xl:text-6xl font-semibold  md:leading-12 lg:leading-14 xl:leading-16 tracking-tighter md:tracking-normal lg:tracking-normal xl:tracking-normal ">An easy way to send <br /> requests to all suppliers</h1>
                    <p className="text-xl hidden md:block mt-6 leading-6 font-normal tracking-tighter mb-5">We are committed to deliver your products on time.</p>
                </div>
                <div className="hidden md:hidden lg:hidden xl:block 2xl:block items-center justify-end w-1/4 pt-7 pr-96">
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 min-w-96">
                        <h1 className="text-lg text-black font-bold mb-4">Send quote to suppliers</h1>
                        <form >
                            <div className="mb-4">
                                <input type="text" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border text-gray-500 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="What item you need?"  />
                            </div>
                            <div className="mb-4">
                                <textarea type="text" id="password" className="shadow-sm rounded-md w-full text-gray-500 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Type more details"  />
                            </div>
                            <button disabled className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send inquiry</button>
                            <div className='flex gap-3 mt-3'>
                                <input type="text" placeholder="Quantity" className="flex-grow border text-gray-500 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                                <input type="text" placeholder="Pcs" className="w-full border text-gray-500 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Suppliers;