

const Wishlist = () => {
    return (
        <div className=" mx-80">

<div className="mx-auto container px-4 md:px-6 2xl:px-0 flex justify-center items-center">

  <div className="flex flex-col justify-start items-start">
    <div>
      <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
    </div>
    <div className="mt-3">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Favourites</h1>
    </div>
    <div className="mt-4">
      <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">03 items</p>
    </div>
    <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
      <div className="flex flex-col">
        <div className="relative">
          <img className="hidden lg:block" src="https://i.ibb.co/SsmkhPq/Rectangle-23.png" alt="bag" />
          <img className="hidden sm:block lg:hidden" src="https://i.ibb.co/ZH9FmZL/Rectangle-23-1.png" alt="bag" />
          <img className="sm:hidden" src="https://i.ibb.co/cyN26yn/Rectangle-23.png" alt="bag" />
          <button aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400">
            <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M1 1L13 13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="flex justify-center items-center">
            <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-black">New York Streak</p>
          </div>
         
        </div>
        <div id="menu1" className="flex flex-col jusitfy-start items-start mt-12">
          <div>
            <p className="tracking-tight text-xs leading-3 text-gray-800 dark:text-black">MK617</p>
          </div>
          <div className="mt-2">
            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-black">Beige brown</p>
          </div>
          <div className="mt-6">
            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-black">42 size</p>
          </div>
          <div className="mt-6">
            <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-black">$1,000</p>
          </div>
          <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
            <div className="w-full">
              <button className="focus:outline-none focus:ring-gray-800 hover:text-black focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white w-full tracking-tight py-4 text-lg leading-4 bg-gray-900   dark:border-white dark:hover:bg-gray-800  border-gray-800 dark:hover:text-white">More information</button>
            </div>
            <div className="w-full">
              <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">Add to cart</button>
            </div>
          </div>
        </div>
      </div>

    

      
    </div>
  </div>
</div>

        </div>
    );
};

export default Wishlist;