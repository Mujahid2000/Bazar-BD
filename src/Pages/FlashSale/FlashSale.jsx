import { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";

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
            const countdownDate = new Date('June 06, 2024 00:00:00').getTime()

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
            axios.get('https://bazar-bd-server.vercel.app/productDiscount')
                .then(res => setProducts(res.data))
                .catch(error => console.error(error));
        }, []);


        const handleAddCart = (data) => {
          axios
            .post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
            .then((response) => console.log(response));
          toast.success("Item added to cart!").catch(console.log("error"));
        };

    return (
        <div className="mt-16">
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
          
            <div className="mt-5 mx-w-[1440px] mx-auto place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
  {products.map((myData) => (
    <div key={myData._id} className="rounded w-80  shadow-lg">
      <Link to={`/productDetails/${myData._id}?fromFlashSale=${location.pathname}`}>
        <div className="relative">
          <img className="w-full h-72" src={myData?.productData?.product_image} alt="Sunset in the mountains" />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          
          <div className="text-sm absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            <span className="font-bold">{myData?.discountPercentage}%</span>
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{myData.productData?.productName}</h3>
          <p className="text-gray-500 text-sm">{myData.productData?.description}</p>
          <div  className="flex justify-between">
          <p className="text-black text-sm font-bold">${myData.productData?.price - myData?.discountPrice}</p>
          <p className="text-black text-sm font-bold line-through">${myData?.discountPrice}</p>

          </div>
        </div>
      </Link>
      <div className="px-6 py-4 flex flex-row items-center">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          <button onClick={() => {
                handleAddCart(myData); // Call handleAddCart after successful toast display
              }} className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 py-2 rounded-md px-3 text-white">Add to cart</button>
        </span>
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