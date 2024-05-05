import { MdDelete } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import { AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";



const Cart = () => {
    const [cart, setCart] = useState(null);
    const item  = cart?.length 
    const [number, setNumber] = useState(1)
    const {user} = useContext(AuthContext);
    const email = user?.email;
    const name = user?.disPlayName;
    const currentDate = new Date();
    
    
    
    useEffect(() =>{
        const fetchData = async () =>{
            try {

                if(email){
        
                    axios.get(`https://bazar-bd-server.vercel.app/addCart/${email}`)
                    .then(res => setCart(res.data))
                    .catch((error) => console.log(error))
                }
            }catch(error){
                console.error('error', error)
            }
            }
            fetchData();
    },[email])

    const delivery= 15.00 * item;
    console.log(typeof(delivery));

  let totalPrice = 0;
    // const totalPrice = cart?.reduce((total, item) => total + item?.data?.price, 0);
    if(cart){

        cart.forEach(item => {
            totalPrice += item?.data?.price
        });
    }
    console.log(totalPrice);

    let payment = delivery + totalPrice;
   
    console.log(payment);


    return (
    
        <div className="max-w-7xl ml-16 xl:mx-96 2xl:mx-96">
            <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

            <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
            </h2>
            <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                    <span className="w-full max-w-[200px] text-center">Delivery Charge</span>
                    <span className="w-full max-w-[260px] text-center">Quantity</span>
                    <span className="w-full max-w-[200px] text-center">Total</span>
                </p>
            </div>
            
           {
            cart && cart.map(((myData , index) => (
                <div key={myData._id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                <div
                    className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box">
                        <img  src={myData.data.product_image} alt="perfume bottle image" className="xl:w-[140px]"/>
                        </div>
                    <div className="pro-data w-full max-w-sm ">
                        <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">D{myData.data.productName}
                        </h5>
                        <p
                            className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            Perfumes</p>
                        <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">${myData.data.price}</h6>
                    </div>
                </div>
                <div
                    className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                        $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
                            Charge)</span></h6>
                    <div className="flex items-center w-full mx-auto justify-center">
                        <button
                            className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                         <FiPlus className="h-[1.4rem]"/>
                        </button>
                        <input type="text"
                            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1"/>
                        <button
                            className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                             <FiPlus className="h-[1.4rem]"/>
                        </button>
                    </div>
                    <h6
                        className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                        ${typeof(myData.data.price)}</h6>
                </div>
            </div>
            )))
           }
            <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                    <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                    <h6 className="font-semibold text-xl leading-8 text-gray-900">${totalPrice}</h6>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                    <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                    <h6 className="font-semibold text-xl leading-8 text-gray-900">${delivery}</h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">${payment}</h6>
                </div>
            </div>
            <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                    className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                    <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Add Coupon Code</span>
                    <IoIosArrowForward className="text-indigo-600"/>
                </button>
                {
                    payment !==  0 ?  <Link to={`/dashboard/payment/${payment}`}>
                    <button
       
       className="rounded-full px-8 w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
     >
       Continue to Payment
       <IoIosArrowForward />
     </button>
                    </Link> : ''
                }
                
                
            </div>
        </div>
    </section>
                                            
        </div>
    
    );
};

export default Cart;