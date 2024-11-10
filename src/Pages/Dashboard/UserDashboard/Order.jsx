import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import axios from "axios";

const Order = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
 console.log(orders);
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
    <div className="mt-24 w-full">
      <h2 className="text-4xl font-semibold text-slate-500">Your Orders</h2>

      {orders && orders.map((order, index) => (
        <div key={order.id} className="mb-8">
          {/* Order Details */}
          <div className="grid border border-gray-200 mt-3 grid-cols-5 gap-10 bg-gray-100 py-4 px-4 rounded-t-lg items-center">
            <div className="w-full">
              <h3 className="text-xl">Order Number</h3>
              <p className="text-base">#{order.id}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Date</h3>
              <p className="text-xl">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Total</h3>
              <p className="text-xl">${parseFloat(order.total_price) + parseFloat(order.delivery_charge)}</p>
            </div>
            <div className="w-full">
              <h3 className="text-xl">Shipped To</h3>
              <p className="text-xl">{name || "Not specified"}</p>
            </div>
            <div className="w-full">
              <button className="bg-[#C62931] w-full px-24 rounded-md text-xl text-white duration-300 hover:bg-[#FFFFFF] hover:text-gray-600 py-2">View Order</button>
            </div>
          </div>

          {/* Order Status */}
          <div className="grid grid-cols-5 gap-8 mx-2 items-start">
            <div className="col-span-4">
              <div className="bg-[#dff0d8] my-5 py-3 rounded-lg px-8">
                <h4 className="text-lg text-[#00A362] font-semibold">Shipped</h4>
                <p className="text-lg text-[#00A362] font-medium">Est. delivery between Aug 5 – Aug 9th, 2017</p>
              </div>

              {/* Display each item in the cart */}
              {order && order.cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <div className="flex items-center gap-10">
                    <img src={item.product_image || "https://via.placeholder.com/150"} alt={item.productname} className="w-20 h-20 rounded-xl" />
                    <div>
                      <h6 className="text-charcoal mb-2">
                        <a href="" className="text-charcoal">{1} x {item.productname}</a>
                      </h6>
                      <ul className="list-unstyled text-pebble mb-2 small">
                        <li><b>Color:</b> {item.color || "N/A"}</li>
                        <li><b>Size:</b> {item.size || "N/A"}</li>
                      </ul>
                      <h6 className="text-charcoal text-left"><b>${item.price}</b></h6>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="bg-[#ffffff] border border-gray-200 py-2 w-full px-14 hover:bg-gray-100 text-gray-600 rounded-md text-xl">Buy It Again</button>
                    <button className="bg-[#ffffff] border border-gray-200 py-2 w-full px-14 hover:bg-gray-100 text-gray-600 rounded-md text-xl">Request a Return</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Track Shipment Button */}
            <div className="w-full col-span-1 my-5">
              <button className="bg-[#FFFFFF] w-full px-20 rounded-md text-xl hover:text-white text-gray-800 border border-gray-300 duration-300 hover:bg-red-600 py-2">Track Shipment</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
