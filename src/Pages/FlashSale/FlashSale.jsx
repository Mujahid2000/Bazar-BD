import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Configs/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Rating from "../Result/Rating";
import { FlashSaleSlider } from '../../Components/Home/FlashSaleSlider';
// import {Swiper, SwiperSlide} from "swiper/react";
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import {EffectCoverflow, Pagination, Navigation} from 'swiper';
const FlashSale = () => {
  const [products, setProducts] = useState([]);
        const location = useLocation();
        const { user } = useContext(AuthContext);
        const email = user?.email;
  // const products = [
  //   {
  //     id: 1,
  //     name: "FLORAL PRINT DRESS",
  //     price: 40.00,
  //     originalPrice: 50.00,
  //     rating: 5,
  //     reviews: 20,
  //     sold: 50,
  //     available: 20,
  //     image: "/api/placeholder/280/350"
  //   },
  //   {
  //     id: 2,
  //     name: "FLORAL PRINT DRESS",
  //     price: 40.00,
  //     originalPrice: 50.00,
  //     rating: 5,
  //     reviews: 20,
  //     sold: 50,
  //     available: 20,
  //     image: "/api/placeholder/280/350"
  //   },
  //   {
  //     id: 3,
  //     name: "FLORAL PRINT DRESS",
  //     price: 40.00,
  //     originalPrice: 50.00,
  //     rating: 5,
  //     reviews: 20,
  //     sold: 50,
  //     available: 20,
  //     image: "/api/placeholder/280/350"
  //   },
  //   {
  //     id: 4,
  //     name: "FLORAL PRINT DRESS",
  //     price: 40.00,
  //     originalPrice: 50.00,
  //     rating: 5,
  //     reviews: 20,
  //     sold: 50,
  //     available: 20,
  //     image: "/api/placeholder/280/350"
  //   }
  // ];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});
const targetDate = "2025-02-31T23:59:59"

useEffect(() => {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate) - new Date();

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
}, [targetDate]);

const formatNumber = (number) => number.toString().padStart(2, "0");


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
    <div className="max-w-7xl mx-auto pt-32 ">
      <FlashSaleSlider/>
      <div className="flex flex-col md:flex-row  pt-5 border-b-2 border-red-600 justify-between gap-10 items-center mb-6 bg-white">
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-2xl">🔥</span>
          <h1 className="text-red-600 text-2xl font-bold">FLASH SALE</h1>
        </div>
        <div className="grid grid-cols-4 bg-red-600 gap-8 py-2 px-4">
            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-white">{formatNumber(timeLeft.days)}</div>
                <div className="text-[0.7rem] text-white">Days</div>
            </div>
            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-white">{formatNumber(timeLeft.hours)}</div>
                <div className="text-[0.7rem] text-white">Hours</div>
            </div>
            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-white">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-[0.7rem] text-white">Minutes</div>
            </div>
            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-white">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-[0.7rem] text-white">Seconds</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/productDetails/${product.id}?fromFlashSale=${location.pathname}`} key={product.id} className="bg-gray-100 rounded-lg p-3">
            <div className="relative">
              <img
                src={product.product_image[0]}
                alt={product.name}
                className="w-full h-[290px] rounded-lg mb-4"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
              {((parseFloat(product.price) - parseFloat(product.discountprice)) / parseFloat(product.price) * 100).toFixed(2)}%
              </span>
              
            </div>

            <div className="flex items-center gap-1 mb-2">
              <Rating stars={product.rating}/>
              <span className="text-black font-medium ml-1">(5)</span>
            </div>

            <h3 className="font-medium mb-2">{product?.productname}</h3>
            <div className="flex gap-2 mb-2">
              <span className="text-gray-400 line-through">${product?.price}</span>
              <span className="text-red-600">${product?.discountprice}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <div>Sold: 50</div>
              <div>Available: {product.stock}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlashSale;