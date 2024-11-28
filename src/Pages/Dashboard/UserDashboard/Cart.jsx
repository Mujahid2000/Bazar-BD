import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import './cart.css';
import { BsTrash3 } from 'react-icons/bs';
import { MdArrowBackIos } from 'react-icons/md';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [token, setToken] = useState(localStorage.getItem("deleteCartAfterCheckout"));
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [userData, setUserData] = useState(null);
  const itemCount = cart.length;
  const deliveryCharge = 15.00 * itemCount;
  const totalPrice = Array.isArray(cart)
  ? cart.reduce((total, item) => total + parseFloat(item?.price || 0), 0)
  : 0;

  const payments = deliveryCharge + totalPrice;
  const userId = (userData?.user_id);




useEffect(() =>{
  try {
    const getData =async () =>{
      const res = await axios.get(`https://postgre-server.vercel.app/user/${email}`);
      (setUserData(res.data.data))
    }
    getData()
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
},[email])

  // Fetch cart data
  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;
      setLoading(true);
      try {
        const response = await axios.get(`https://postgre-server.vercel.app/cart/${email}`);
        setCart(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  // Delete item from cart
  const handleCartDataDelete = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`https://postgre-server.vercel.app/cart/${id}`);
      setCart(prevCart => prevCart.filter(item => item.cart_id !== id)); // Update cart immediately
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  // Handle form submission (e.g., payment)

  const proceedData = async () => {
    try {
      const res = await fetch('https://postgre-server.vercel.app/checkout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify({
          payment: payments,
          cart: cart,
          deliveryCharge
        })
      });
      const data = await res.json();
      console.log('success done');
      if (data.url) {
        localStorage.setItem('deleteCartAfterCheckout', 'true');
        window.location = data.url; 
      } 
      else {
        console.error("Error: Checkout URL not provided in response");
      }
    } catch (error) {
      console.log("Error during checkout:", error);
    }
  };


  useEffect(() => {
    const cartDataDeleteAfterPayment = async () => {
      
      if (token) { // Check if the token is "true"
        try {
          console.log('Deleting cart data after payment');
          axios.post('https://postgre-server.vercel.app/order', {cart, email, totalPrice, deliveryCharge, userId})
          await axios.delete(`https://postgre-server.vercel.app/cart/all/${email}`);
          setCart(''); // Clear the cart state
          localStorage.removeItem('deleteCartAfterCheckout'); // Remove the flag
          console.log("Cart deleted after successful payment");
        } catch (error) {
          console.error("Error deleting cart:", error);
        }
      } else {
        console.log('No payment token available');
      }
    };

    cartDataDeleteAfterPayment(); // Call the function within the effect
  }, [token,cart,deliveryCharge, totalPrice, userId, email]); // Include email as a dependency if it changes



  return (
    <div className="max-w-[1440px] mx-auto mt-20 lg:p-4 flex flex-col lg:flex-row gap-8">
    {/* Left Section - Cart Data */}
    <div className="flex-1 w-2/3 bg-[#ffffff] lg:shadow-md p-6 rounded-lg ">
      <div className="flex items-center mb-4">
        <button>
          <MdArrowBackIos />
        </button>
        <h3 className="text-sm lg:text-xl font-medium ml-2">Continue Shopping</h3>
      </div>
      <hr className="mb-4" />
      <h3 className="text-sm lg:text-lg font-medium py-2">Shopping Cart</h3>
      <p className="text-sm lg:text-base font-medium">You have {itemCount} item(s) in your cart</p>
  
      <div className="mt-4  space-y-6">
        {loading ? (
          <div className="bg-[#FFF8EE] w-full p-4 rounded-2xl shadow-md flex flex-col gap-4 animate-pulse">
            <div className="h-52 w-full rounded-xl bg-gray-200"></div>
            <div className="space-y-3">
              <div className="bg-gray-200 h-6 w-3/4 rounded-xl"></div>
              <div className="bg-gray-200 h-6 w-full rounded-xl"></div>
              <div className="bg-gray-200 h-6 w-full rounded-xl"></div>
            </div>
            <div className="flex justify-end gap-3 mt-auto">
              <div className="bg-gray-200 h-8 w-20 rounded-full"></div>
              <div className="bg-gray-200 h-8 w-20 rounded-full"></div>
            </div>
          </div>
        ) : (
          cart && cart.map((data) => (
            <div
              key={data.cart_id}
              className="flex p-2 w-[300px] lg:w-[600px] items-center bg-white lg:p-4 rounded-lg shadow-md gap-3 lg:gap-6"
            >
              <img src={data.product_image[0]} alt={data.productname} className="w-16 lg:w-24 h-16 lg:h-24 rounded-md" />
              <div className="flex-1">
                <h4 className="text-sm lg:text-lg font-medium">{data.productname}</h4>
                <p className="text-sm text-gray-500">{data.category}</p>
              </div>
              <div className="flex items-center">
                {count}
              </div>
              <p className="text-sm lg:text-base font-medium">${data.price}</p>
              <button onClick={() => handleCartDataDelete(data.cart_id)}>
                <BsTrash3 className="text-gray-500 hover:text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  
    {/* Right Section - Checkout */}
    <div className="w-full lg:w-[500px] max-h-[300px] bg-[#FFF8EE] p-6 rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Cart Subtotal</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Order Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${deliveryCharge}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${payments.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={proceedData}
        className="bg-red-600 text-white py-2 w-full rounded mt-14 hover:bg-red-700 transition duration-200"
      >
        Proceed To Checkout
      </button>
    </div>
  </div>
  
  
   
  );
};

export default Cart;
