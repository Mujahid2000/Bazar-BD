import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import axios from "axios";


const Deliveried = () => {
    const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
 
  const email = user?.email;

  const name = user?.displayName

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get(`https://postgre-server.vercel.app/order/${email}`);
          setOrders(response.data.data); // Assuming response.data.data is an array of orders
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    fetchData();
  }, [email]);
    return (
        <div className="bg-white p-9 ml-6 md:ml-12   lg:ml-7 mt-9 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">Delivery Complete Products</h2>
                    <span className="text-xs">All products item</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
                    </div>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="caption-bottom text-sm w-full">
                    <thead
                      className="[&amp;_tr]:border-b border-b-[1px] p-6 border-zinc-800"
                    >
                      <tr className="border-zinc-800">
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black">
                            PRODUCTS IMAGE
                          </p>
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black">
                          PRODUCTS NAME
                          </p>
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black">
                          PRICE
                          </p>
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black">
                          CREATED
                          </p>
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black">
                            COLOR
                          </p>
                        </th>
                        <th
                          className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 cursor-pointer pl-5 pr-4 pt-2 text-start border-zinc-800"
                          colSpan="1"
                        >
                          <p className="text-xs font-semibold text-black"></p>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&amp;_tr:last-child]:border-0">
                        {
                            orders.map((item) =>(
                                item.cart.map((nItem) =>(
                                    <tr key={nItem.id}
                                    className="border-b border-zinc-800 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted px-6 "
                                  >
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                     <img src={nItem.product_image} alt="" className="w-12 h-12"/>
                                        
                                      
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      <div className="flex w-full items-center gap-[14px]">
                                        <p className="text-sm font-medium text-black">{nItem.productname}</p>
                                      </div>
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      <div className="flex w-full items-center gap-[14px]">
                                        <p className="text-sm font-medium text-black">
                                          ${nItem.price}
                                        </p>
                                      </div>
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      <p className="text-sm font-medium text-black">
                                        {item.created_at}
                                      </p>
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      <p className="text-sm font-medium text-black">
                                        {nItem.id}
                                      </p>
                                    </td>
                                    <td
                                      className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 w-max border-b-[1px] py-5 pl-5 pr-4 border-white/10"
                                    >
                                      <div>
                                        <button
                                          className="whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex items-center text-xl hover:cursor-pointer text-black hover:bg-transparent active:bg-transparent justify-center rounded-lg font-bold transition duration-200"
                                          type="button"
                                          id="radix-:r0:"
                                          aria-haspopup="menu"
                                          aria-expanded="false"
                                          data-state="closed"
                                        >
                                          <p className="text-2xl hover:cursor-pointer">
                                            
                                          </p>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                            ))
                        }
                      
                     
                    </tbody>
                  </table>
                   
                </div>
            </div>
        </div>

    );
};

export default Deliveried;