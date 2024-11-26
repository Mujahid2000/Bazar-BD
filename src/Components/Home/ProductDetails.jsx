import axios from "axios";
import {FiMinus, FiPlus} from 'react-icons/fi';
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import { AuthContext } from "../../Configs/AuthContext";
import { Toaster, toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Rating from "../../Pages/Result/Rating";
import { FaCreditCard, FaShieldAlt } from "react-icons/fa";



const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fromFlashSale = searchParams.get('fromFlashSale');
    // console.log('From Flash Sale:', fromFlashSale);
    const [count, setCount] = useState(1);
    const [image, setImage] = useState('')
    const [products, setProducts] = useState(null); 
    const [loading, setLoading] = useState(true)
    const [allProduct, setAllProducts] = useState()
    const [discount, setDiscount] = useState({})
   console.log(image);
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const services = [
        {
          icon: "🚚", // Replace with an SVG or icon component
          label: "Estimated Delivery",
          value: "48 hours",
        },
        {
          icon: "💰",
          label: "Cash On Delivery",
          value: "Available",
        },
        {
          icon: "💳",
          label: "EMI Facility",
          value: "Not Available",
        },
        {
          icon: "⚙️",
          label: "Warranty",
          value: "",
        },
      ];
   
    useEffect(() => {
        const fetchData = async () => {
          if (!id) return; // Exit if no `id` is provided
          
          setLoading(true); // Start loading before data fetch
          try {
            const res = await axios.get(`https://postgre-server.vercel.app/product/${id}`);
            setProducts(res.data.data[0]); // Update product data
          } catch (error) {
            console.error("Error fetching product data:", error);
          } finally {
            setLoading(false); // Stop loading after fetch attempt
          }
        };
      
        fetchData();
      }, [id]);



      useEffect(() => {
        axios.get('https://postgre-server.vercel.app/product')
            .then(res =>  res.data.data)
            .then(data => {
                const shuffledArray = data.sort(() => 0.5 - Math.random());
                setAllProducts(shuffledArray)
            })
            .catch(error => console.error(error));
    }, []);



    useEffect(() =>{
        // Use a separate variable to store the id obtained from useParams()
        const productId = id;
        axios.get(`https://postgre-server.vercel.app/discount/${productId}`)
            .then((response) => setDiscount(response.data.data[0]))
            .catch((error) => console.error(error));
    }, [id, ]);

    const isFromFlashSalePage = fromFlashSale === '/flashSale';
    
    const handleAddCart = async (data) => {
      const productid = data.idp;
    
      if (user) {
        try {
          const response = await axios.post(`https://postgre-server.vercel.app/cart`, { productid, email });
          console.log("Response:", response.data);
          toast.success("Item added to cart!");
        } catch (error) {
          console.error("Error adding item to cart:", error);
          toast.error("Failed to add item to cart. Please try again.");
        }
      } else {
        alert("Please Login");
      }
    };
    
    const handleWishlist = async (product) => {
      const productid = product.idp;
    
      if (user) {
        try {
          const response = await axios.post("https://postgre-server.vercel.app/wishlist", { productid, email });
          console.log("Response:", response.data);
          toast.success("Added to Favourites!");
        } catch (error) {
          console.error("Error adding item to wishlist:", error);
          toast.error("Failed to add item to wishlist. Please try again.");
        }
      } else {
        alert("Please Login");
      }
    };

    const handleImage = (link) =>{
      setImage(link)
    }

    


    return (
        <div className="max-w-[1440px] pt-32 mx-auto">
            {loading? (
               
                <div className="bg-white p-2 md:h-screen sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
                      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
                      <div className="flex flex-col flex-1 gap-5 sm:p-2">
                        <div className="flex flex-1 flex-col gap-3">
                          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
                          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
                        </div>
                        <div className="mt-auto flex gap-3">
                          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
                          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
                          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
                        </div>
                      </div>
                </div>
            ):
            
            ((Object.keys(products || discount).length > 0) && (
    <div className="w-full   flex justify-between   overflow-hidden relative">
        <div className="w-full   flex items-center  overflow-hidden relative">
            <div className="w-full max-w-full rounded shadow-xl p-5  mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-start justify-between gap-8">
                    <div className="w-full items-center justify-center flex flex-col md:w-2/5 md:px-5 mb-10 md:mb-0">
                        <div>
                            <img className="w-full h-full" src={image ? image : isFromFlashSalePage ? discount.product_image : products.product_image[0]} alt=""  />
                        </div>
                        <div className="flex md:gap-5 pt-14 justify-center max-w-md">
                          
                            <img onClick={() => {
                        handleImage(isFromFlashSalePage ? discount.product_image : products.product_image[0]);
                    }}
                    className="w-24 h-24 hover:duration-300 cursor-pointer hover:bg-slate-200 p-3" src={isFromFlashSalePage ? discount.product_image : products.product_image[0]} alt=""  />
                      <img onClick={() => {handleImage(isFromFlashSalePage ? discount.product_image : products.product_image[1])}} className="w-24 h-24 hover:duration-300 cursor-pointer hover:bg-slate-200 p-3" src={isFromFlashSalePage ? discount.product_image : products.product_image[1]} alt=""  />
                                                <img onClick={() => {
                        handleImage(isFromFlashSalePage ? discount.product_image : products.product_image[2])
                    }} className="w-24 h-24 hover:duration-300 cursor-pointer hover:bg-slate-200 p-3" src={isFromFlashSalePage ? discount.product_image : products.product_image[2]} alt=""  />
                                                <img onClick={() => {
                        handleImage(isFromFlashSalePage ? discount.product_image : products.product_image[3]);
                    }} className="w-24 h-24 hover:duration-300 cursor-pointer hover:bg-slate-200 p-3" src={isFromFlashSalePage ? discount.product_image : products.product_image[3]} alt=""  />
                        </div>
                    </div>
                    <div className="w-full md:w-2/5 md:px-5">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-3xl mb-2">{isFromFlashSalePage ? discount.productname : products.productname}</h1>
                            <div className="flex items-center justify-start">
                                 <Rating stars={isFromFlashSalePage ? discount?.rating : products?.rating}/>
                            <p className="border px-3 text-base rounded-md">{isFromFlashSalePage ? discount?.rating : products?.rating}</p>
                            </div>
                           <hr className="mb-5 mt-1"/>
                            <p className="text-base pt-5">{isFromFlashSalePage ? discount?.description : products.description} </p>
                        </div>
                        <div>
                            <div className="">
                                <span className="text-5xl text-[#DC2626] ">$</span>
                                <span className="font-bold text-[#DC2626] text-5xl ">{isFromFlashSalePage ? discount?.discountprice?.toString().slice(0, 3) : products?.price?.toString().slice(0, 3)}</span>
                                <span className="text-5xl text-[#DC2626] ">{isFromFlashSalePage ? discount?.discountprice?.toString().slice(3, 6) : products?.price?.toString().slice(3, 6)}</span>
                            </div>
                            <div className="inline-block sm:mt-3 ">
                                <div className="flex flex-col md:flex-row items-start justify-start gap-4 mt-6">
                                <div className='flex  items-center  border border-gray-200 rounded-md'>
            <button className='bg-gray-100 active:scale-[0.9] transition-all duration-300 p-[10px] rounded-l-md text-gray-700 text-[1.1rem]'
                    ><FiMinus/></button>
            <input type='number' value={count}
                   className='w-[50px] py-2.5 outline-none focus:ring-0 border-none text-center text-[1.1rem]'
                   />
            <button className='bg-gray-100 active:scale-[0.9] transition-all duration-300 p-[10px] rounded-r-md text-gray-700 text-[1.1rem]'
                    ><FiPlus/></button>
        </div>
                                <div className="flex gap-5">

                                    <button onClick={() => {handleAddCart(isFromFlashSalePage ? discount : products)}} className="px-4 py-3 bg-blue-500 flex items-center gap-2 text-white border-none outline-none text-secondary text-[1rem] rounded active:scale-[0.9] transition-all duration-300">
                                    <MdOutlineShoppingCart />

                                    Add To Cart
                                    </button>

                                <button onClick={() => handleWishlist(isFromFlashSalePage ? discount?.productData : products)} className="px-4 py-3 bg-blue-500 flex items-center gap-2 text-white border-none outline-none text-secondary text-[1rem] rounded active:scale-[0.9] transition-all duration-300"><FaHeart /> WishList</button>
                                </div>

                                </div>
                            </div>
                            <div className="max-w-2xl mx-auto py-5 space-y-4">
      {/* Payment Section */}
      <div className="flex  items-start justify-center gap-4 border rounded-lg p-4 shadow-sm">
        <FaCreditCard className="text-3xl mt-1 text-gray-500" />
        <div>
          <h3 className="font-semibold text-gray-800">Payment</h3>
          <p className="text-sm text-gray-600">
            Payment upon receipt of goods, Payment by card in the department,
            Google Pay, Online card, -5% discount in case of payment.
          </p>
        </div>
      </div>

      {/* Warranty Section */}
      <div className="flex  items-start justify-center gap-4 border rounded-lg p-4 shadow-sm">
        <FaShieldAlt className="text-2xl mt-1 text-gray-500" />
        <div>
          <h3 className="font-semibold text-gray-800">Warranty</h3>
          <p className="text-sm text-gray-600">
            The Consumer Protection Act does not provide for the return of this
            product of proper quality.
          </p>
        </div>
      </div>
    </div>
                        </div>
                    </div>
                    <div className="  md:w-1/5 w-full  lg:w-[20%]   relative overflow-hidden group  rounded-md">
                <h2 className="pb-4 text-lg font-semibold">SELLER</h2>
                <div className="flex py-3 bg-gray-100 rounded-md justify-between px-3 items-center border">
                <img className="w-16 h-16" src={isFromFlashSalePage ? discount?.shoppicture : products?.shoppicture} alt="" />
            
            <div className="gap-3 flex  items-center flex-col">
              <Link to={`/shopDetail/${isFromFlashSalePage ? discount?.shopname : products?.shopname}`}>
              
            <h3 className="font-semibold">{isFromFlashSalePage ? discount?.shopname : products?.shopname}</h3>
              </Link>
            <div className="flex justify-center items-center">
            <Rating stars={3}/> <p>(3)</p>
            </div>
            <Link to={`/shopDetail/${isFromFlashSalePage ? discount?.shopname : products?.shopname}`}>
            
            <button
                className="font-semibold rounded-md leading-none uppercase inline-flex justify-center items-center gap-2 rounded-button transition-all duration-[300ms] ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white text-primary border border-secondary bg-gradient-to-l from-blue-500 from-[50%] to-secondary to-[50%] bg-[200%_auto] hover:bg-right hover:text-white px-5 h-9 md:h-[42px]">
                VISIT SHOP
            </button>
            </Link>
        </div>
                </div>
            
                     <div className=" max-w-sm mx-auto  rounded-lg shadow-md">
      <h2 className="text-lg font-semibold my-4">SERVICE</h2>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-5 bg-gray-50 rounded-md border"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl text-green-600">{service.icon}</span>
              <span className="text-gray-700 font-medium">{service.label}</span>
            </div>
            <span className={`text-sm ${service.value ? 'text-green-700' : 'text-red-600'}`}>
              {service.value || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>           
                    </div>
                </div>
            </div>
        </div>
    </div>
))}


         <div className=" px-3 mb-9">
        <h3 className="text-gray-600 text-2xl font-medium mb-2">More Products</h3>
        <div className="w-full max-w-full mx-auto rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-7">
    {
        allProduct && allProduct.slice(0, 4).map(myData => (
            <Link to={`/productDetails/${myData.id}`} key={myData.id}>
                <div className="border">
                    <div className="flex items-end justify-end h-56 w-full bg-cover" style={{backgroundImage: `url(${myData.product_image[0]})`}}>
                        <button onClick={() => {handleAddCart(isFromFlashSalePage ? discount : products)}} className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">{myData.productname}</h3>
                        <span className="text-gray-500 mt-2">${myData.price}</span>
                    </div>
                </div>
            </Link>
        ))
    }
</div>
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

export default ProductDetails;