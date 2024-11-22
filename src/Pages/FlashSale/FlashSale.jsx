import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";
import Rating from "../Result/Rating";
import { FaShoppingCart } from "react-icons/fa";

const FlashSale = () => {
        const [timerDays, setTimerDays] = useState('00');
        const [timerHours, setTimerHours] = useState('00');
        const [timerMinutes, setTimerMinutes] = useState('00');
        const [timerSecond, setTimerSecond] = useState('00');
        const [products, setProducts] = useState([]);
        const location = useLocation();
        const { user } = useContext(AuthContext);
        const email = user?.email;
        

        

        let interval = useRef();

        const startTimer = () =>{
            const countdownDate = new Date('March 06, 2025 00:00:00').getTime()

            interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (distance < 0){
                        //stop or update
                        clearInterval(interval.current)
                }else{
                    setTimerDays(days);
                    setTimerMinutes(minutes);
                    setTimerSecond(seconds);
                    setTimerHours(hours)
                }
            }, 1000)
        }

        useEffect(() => {
            startTimer();
            return () =>{
                clearInterval(interval.current);
            }
        }, [])



        useEffect(() => {
            axios.get('https://postgre-server.vercel.app/discount')
                .then(res => setProducts(res.data.data))
                .catch(error => console.error(error));
        }, []);


        const handleAddCart = (data) => {
          const productid = data.idp;
          console.log(productid);
        
          if (user) {
          
            try {
              axios
                .post("https://postgre-server.vercel.app/cart", { productid, email })
                .then((response) => {
                  
                  console.log(response);
                  toast.success("Item added to cart!");
                })
                .catch((error) => {
                  
                  console.error("Error adding item to cart:", error);
                  toast.error("Failed to add item to cart. Please try again.");
                });
            } catch (error) {
              
              console.error("Unexpected error:", error);
              toast.error("An unexpected error occurred. Please try again.");
            }
          } else {
            
            toast.error("You need to be logged in to add items to the cart.");
          }
        };
        

    return (
        <div className="pt-28 mb-6">
          <div>

            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[95vh] ">
                <div className="flex sm:flex-col md:flex-row lg:flex-row justify-evenly items-center">
                <div className="mt-10">
                  <div className="flex flex-col md:flex-row lg:flex-row justify-evenly items-center gap-9">
                    <div>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-serif font-bold ml-4 md:ml-2 lg:ml-0">Huge Discount Up <br /> to 50% Off</h2>
                    <div className="flex justify-center items-center mt-10  bg-[#254E58] mx-3">
                    <div className="mx-3 sm:p-10 p-4 rounded-md flex justify-center flex-col gap-6 shadow-[5px_5px_50px_rgba(47,46,60,1)]">
        <div className="flex flex-col gap-2">
          <h1 className="text-center sm:text-3xl text-xl font-semibold leading-8 text-[#FBFAF8]">
            Hurry, Limited Availability
          </h1>
          <span className="text-sm font-semibold text-center leading-8 text-[#FBFAF8]">
            Be a part of Singing Concert, Grab the Pass before it&apos;s
            complete!
          </span>
        </div>
        <div className="flex justify-between sm:px-4">
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 flex justify-center items-center bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {timerDays}
            </span>
            <span className="text-sm text-[#FBFAF8] font-bold">
             30
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {timerHours}
            </span>
            <span className="text-sm text-[#FBFAF8] font-bold">
              60
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {timerMinutes}
            </span>
            <span className="text-sm text-[#FBFAF8] font-bold">
              60
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="py-3 px-3 bg-[#88BDBC] text-[#112D32] text-3xl font-semibold rounded-md">
              {timerSecond}
            </span>
            <span className="text-sm text-[#FBFAF8] font-bold">
              60
            </span>
          </div>
        </div>
                    </div>
    
                  </div>
                    </div>

                <div className="-mt-7 md:mt-5 lg:mt-16">
                    <img src="https://i.ibb.co/L8yjpxY/33760185-8055402.png" alt="" className="w-full max-h-[35rem]"/>
                </div>

                  </div>
                  
                  <div>
      
              </div>
              </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-item-center max-w-[1440px] mx-auto mt-10">
                    
                </div> 
            </div>
          </div>
          
            <div className="mt-5 max-w-[1440px] gap-3 mx-auto place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
  {products && products.map((myData) => (
    <div key={myData.id} className="w-[18.4375rem]  h-[25.3125rem] border mx-auto bg-white  rounded-lg overflow-hidden">
    <img className="w-[15rem] h-[15rem]  py-5  mx-auto object-cover object-center" src={myData?.product_image} alt="Product" />
  
   <div className="p-4 mt-7 flex justify-between items-start">
   <Link to={`/productDetails/${myData.id}?fromFlashSale=${location.pathname}`}>
      <div className="">
      <div>
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-900">${myData?.discountprice}</span>
        <span className="text-gray-500 line-through ml-2">${(myData.price - myData?.discountprice).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center mt-2">
        <Rating stars={myData?.rating}/>
        <span className="text-gray-500 text-sm ml-2">{myData?.rating}</span>
      </div>
      </div>
      <h2 className="text-gray-900 font-semibold mt-2">{myData?.productname}</h2>
      </div>
 </Link>
      <button onClick={() => {
                handleAddCart(myData); // Call handleAddCart after successful toast display
              }}>

        <FaShoppingCart className="w-[1.5rem] text-gray-500 active:text-green-500 h-[1.5rem]"/>
      </button>
      
      
      
    </div>
  
    
  </div>
  ))}
          </div>

<Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            success: "text-green-400",
          },
        }}
      />

        </div>
    );
};

export default FlashSale;