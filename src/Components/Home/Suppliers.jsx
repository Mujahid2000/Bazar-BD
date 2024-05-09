import React from 'react';

const Suppliers = () => {
    return (
        <div className="max-w-[1840px] mb-9 px-2 z-10 h-[446px] mx-auto relative" style={{backgroundImage: 'url("https://i.ibb.co/hCDGvkv/warehouse.jpg")'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-200 opacity-80"></div>
            <div className="z-20 relative flex justify-between gap-96 text-white p-8">
                <div>
                    <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-10 md:leading-12 lg:leading-14 xl:leading-16 tracking-tighter md:tracking-normal lg:tracking-normal xl:tracking-normal ">An easy way to send <br /> requests to all suppliers</h1>
                    <p className="text-xl mt-6 leading-6 font-normal tracking-tighter mb-5">We are committed to deliver your products on time.</p>
                </div>
                <div className="hidden lg:block items-center justify-end w-1/4 mt-4">
                    <div className="bg-white shadow-md rounded-lg px-8 py-6 min-w-96">
                        <h1 className="text-lg text-black font-bold mb-4">Send quote to suppliers</h1>
                        <form >
                            <div className="mb-4">
                                <input type="text" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="What item you need?"  />
                            </div>
                            <div className="mb-4">
                                <textarea type="text" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Type more details"  />
                            </div>
                            <button  className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Send inquiry</button>
                            <div className='flex gap-3 mt-3'>
                                <input type="text" placeholder="Quantity" className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                                <input type="text" placeholder="Pcs" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Suppliers;
