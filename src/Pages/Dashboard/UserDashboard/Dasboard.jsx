import { useContext, useState } from 'react';
import Chart from 'react-apexcharts'
import { AuthContext } from '../../../Configs/AuthContext';

const Dasboard = () => {
    const {user } = useContext(AuthContext);
    const photo = user?.photoURL;

    const [option, setOption] = useState({
        chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
    });
    const [series, setSeries] = useState([{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]);

 
        
  
    
    return (
        <div className='2xl:mx-36 mt-20'>
            <section>
    <div className="py-16">
        <div className="mx-auto px-6 max-w-full text-gray-500">
            <div className="relative">
                <div className="relative grid gap-3 grid-cols-6">
                    <div className="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div className="size-fit m-auto relative">
                            <div className="relative h-24 w-56 flex items-center">
                                <svg className="absolute inset-0 size-full text-gray-400 dark:text-gray-600" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor"></path>
                                </svg>
                                <span className="w-fit block mx-auto text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-pink-600 dark:from-blue-400 dark:to-pink-400">100%</span>
                            </div>
                            <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-3xl">Secure</h2>
                        </div>
                    </div>
                    <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div>
                            <div className="relative aspect-square rounded-full size-32 flex border mx-auto dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                               <img src={photo} alt="" className="rounded-full" />
                            </div>
                            <div className="mt-6 text-center relative space-y-2">
                                <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">{user?.displayName}</h2>
                                <p className="dark:text-gray-300 text-gray-700 h-10"></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full  sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div>
                            <div className="pt-6 lg:px-6">
                                
                            </div>
                            <div className="mt-14 text-center relative space-y-2">
                                <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">Faster than light</h2>
                                <p className="dark:text-gray-300 text-gray-700">Provident fugit vero voluptate. magnam magni doloribus dolores voluptates inventore nisi.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className=" col-span-full overflow-hidden relative p-8 rounded-xl bg-white border border-gray-900 dark:border-gray-800 dark:bg-gray-900">
                        <div className="grid sm:grid-cols-2">
                            <div className="flex flex-col justify-between relative space-y-12 lg:space-y-6">
                                <div className="relative aspect-square rounded-full size-12 flex border dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                                   
                                    </div>
                                <div className="space-y-2">
                                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">Faster than light</h2>
                                    <p className="dark:text-gray-300 text-gray-700">Provident fugit vero voluptate. Voluptates a sapiente inventore nisi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section> 
<div className=''>


            <h2 className='text-center font-semibold text-4xl'>Your Order</h2>
             <Chart options={option} series={series} type="bar" width={800} height={620} />
</div>
        </div>
    );
};

export default Dasboard;
