import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Configs/AuthContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Dasboard = () => {
    const {user } = useContext(AuthContext);
    const [allUser, setAllUser] = useState(null);
    const [shop, setShop] = useState(null);
    const [order, setOrder] = useState(null);
    const [total, setTotal] = useState(0)
    const totalUser = (allUser?.length);
    const photo = user?.photoURL;
console.log(total)

    const data = {
        labels: ['Oct 31', 'Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5', 'Nov 6'],
        datasets: [
          {
            label: 'Active',
            data: [9, 5, 4, 8, 7, 3, 2], // Replace with your data points
            borderColor: 'blue',
            backgroundColor: 'rgba(173, 216, 230, 0.3)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'blue',
            pointBorderColor: 'blue',
          },
          {
            label: 'Completed',
            data: [3, 7, 2, 9, 5, 6, 8], // Replace with your data points
            borderColor: 'green',
            backgroundColor: 'rgba(144, 238, 144, 0.3)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'green',
            pointBorderColor: 'green',
          },
          {
            label: 'Canceled',
            data: [4, 3, 5, 2, 6, 4, 9], // Replace with your data points
            borderColor: 'red',
            backgroundColor: 'rgba(255, 182, 193, 0.3)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'red',
            pointBorderColor: 'red',
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Values',
            },
          },
        },
      };
    

    useEffect(() => {
        axios.get('https://postgre-server.vercel.app/user')
            .then(res => {
                setAllUser(res.data.data)})
            .catch(error => console.error(error));
    }, []);
 



    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const res = await axios.get('https://postgre-server.vercel.app/order');
            setOrder(res.data.data); 
          } catch (error) {
            console.error("Error fetching order data:", error);
          }
        };
    
        fetchOrder();
      }, []);

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const res = await axios.get('https://postgre-server.vercel.app/shop');
           
            setShop(res.data.data); 
          } catch (error) {
            console.error("Error fetching order data:", error);
          }
        };
    
        fetchOrder();
      }, []); 

      
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const res = await axios.get('https://postgre-server.vercel.app/order/total/data');
           
            setTotal(res.data.data); 
          } catch (error) {
            console.error("Error fetching order data:", error);
          }
        };
    
        fetchOrder();
      }, []); 
  
    
    return (
        <div className='lg:min-w-[90rem] lg:ml-16 px-5 mt-24 mx-auto '>
      
      <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex justify-between mb-6">
                        <div>
                            <div className="flex items-center mb-1">
                                <div className="text-2xl font-semibold">{totalUser? totalUser : 0}</div>
                            </div>
                            <div className="text-sm font-medium text-gray-400">Users</div>
                        </div>
                         <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div> 
                    </div>

                    <Link to="/dashboard/user" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</Link>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="flex items-center mb-1">
                                <div className="text-2xl font-semibold">{shop?.length || 0}</div>
                                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">+30%</div>
                            </div>
                            <div className="text-sm font-medium text-gray-400">Companies</div>
                        </div>
                         <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div> 
                    </div>
                    <Link to="#" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</Link>
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                    <div className="flex justify-between mb-6">
                        <div>
                            <div className="text-2xl font-semibold mb-1">${total? total : 0}</div>
                            <div className="text-sm font-medium text-gray-400">Revenue</div>
                        </div>
                         <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div> 
                    </div>
                    <a href="" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                    <div className="rounded-t mb-0 px-0 border-0">
                      <div className="flex flex-wrap items-center px-4 py-2">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Users</h3>
                        </div>
                      </div>
                      <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Role</th>
                              <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                              <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-gray-700 dark:text-gray-100">
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Administrator</th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">1</td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">70%</span>
                                  <div className="relative w-full">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                      <div style={{ width: '40%' }}className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-700 dark:text-gray-100">
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">User</th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">6</td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">40%</span>
                                  <div className="relative w-full">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                      <div style={{width: '40%' }}className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-700 dark:text-gray-100">
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">User</th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">5</td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">45%</span>
                                  <div className="relative w-full">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                      <div style={{width: "45%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-700 dark:text-gray-100">
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">User</th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">4</td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">60%</span>
                                  <div className="relative w-full">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                      <div style={{width: "60%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Top Companies</div>
                         <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <table className="w-full min-w-[540px]">
                        <thead>
                                <tr>
                                    <th className="text-[12px] text-left uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50  rounded-tl-md rounded-bl-md">Product Image</th>
                                    <th className="text-[12px] text-center uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50  rounded-tl-md rounded-bl-md">Product Name</th>
                                    <th className="text-[12px] text-center uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 ">Feedback</th>
                                    <th className="text-[12px] text-center uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50  rounded-tr-md rounded-br-md">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                 shop &&   shop.map((item) =>(
                                         <tr key={item.id}>
                                    <td className="py-2 items-center flex justify-start px-4 border-b border-b-gray-50">
                                       
                                            <img src={item.shoppicture} alt="" className='w-10 rounded-md h-10'/>
                                            
                                      
                                    </td>
                                    <td className="py-2 text-center px-4 border-b border-b-gray-50">
                                       
                                        <p  className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">{item.shopname}</p>
                                            
                                       
                                    </td>
                                    <td className="py-2 text-center px-4 border-b border-b-gray-50">
                                        <p className="text-[13px] font-medium text-gray-400">Good</p>
                                    </td>
                                    <td className="py-2 text-center px-4 border-b border-b-gray-50">
                                        <p className="text-[13px] font-medium text-gray-400">{item.rating}</p>
                                    </td>
                                    
                                </tr>
                                    ))
                                }
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Order Statistics</div>
                         <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div> 
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">{order?.length}</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">$80</span>
                            </div>
                            <span className="text-gray-400 text-sm">Active</span>
                        </div>
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">50</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">+$469</span>
                            </div>
                            <span className="text-gray-400 text-sm">Completed</span>
                        </div>
                        <div className="rounded-md border border-dashed border-gray-200 p-4">
                            <div className="flex items-center mb-0.5">
                                <div className="text-xl font-semibold">4</div>
                                <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">-$130</span>
                            </div>
                            <span className="text-gray-400 text-sm">Canceled</span>
                        </div>
                    </div>
                    <div>
                    <Line data={data} options={options} />
                    </div>
                </div>
                <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Ordered Products</div>
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[460px]">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Product Nme</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Price</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {order && order.map((orderItem, orderIndex) => (
  Array.isArray(orderItem.cart) && orderItem.cart.map((cartItem, cartIndex) => (
    <tr key={`${orderIndex}-${cartIndex}`}> {/* Unique key using indices */}
      <td className="py-2 px-4 border-b border-b-gray-50">
        <div className="flex items-center">
          <img 
            src={cartItem.product_image[0]}
            alt="" 
            className="w-8 h-8 rounded object-cover block" 
          />
          <a 
            href="#" 
            className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
          >
            {cartItem.productname || "Product Title"} {/* Dynamic title */}
          </a>
        </div>
      </td>
      <td className="py-2 px-4 border-b border-b-gray-50">
        <span className="text-[13px] font-medium text-emerald-500">
          ${cartItem.price || 0} {/* Dynamic amount */}
        </span>
      </td>
      <td className="py-2 px-4 border-b border-b-gray-50">
        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
          {cartItem.status || "Pending"} {/* Dynamic status */}
        </span>
      </td>
    </tr>
  ))
))}

                               
                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</div>
    );
};

export default Dasboard;
