import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import { AuthContext } from "../../Configs/AuthContext";
import { Toaster, toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";



const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const fromFlashSale = searchParams.get('fromFlashSale');
    // console.log('From Flash Sale:', fromFlashSale);
    const [products, setProducts] = useState({}); 
    const [allProduct, setAllProducts] = useState()
    const [discount, setDiscount] = useState({})
    const { user } = useContext(AuthContext);
    const email = user?.email;
    
    
    useEffect(() => {
        axios
          .get(`https://bazar-bd-server.vercel.app/addProducts/${id}`)
          .then((res) => setProducts(res.data))
          .catch((error) => console.error(error));
      }, [id]);



      useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res =>  res.data)
            .then(data => {
                const shuffledArray = data.sort(() => 0.5 - Math.random());
                setAllProducts(shuffledArray)
            })
            .catch(error => console.error(error));
    }, []);



    useEffect(() =>{
        // Use a separate variable to store the id obtained from useParams()
        const productId = id;
        axios.get(`https://bazar-bd-server.vercel.app/productDiscount/${productId}`)
            .then((response) => setDiscount(response.data))
            .catch((error) => console.error(error));
    }, [id, ]);

    const isFromFlashSalePage = fromFlashSale === '/flashSale';
    
    const handleAddCart = (data) => {
      
         if(user){
           axios.post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
           .then((response) => console.log(response));
         toast.success("Item added to cart!")
         }else{
            alert('Please Login')
         }
        };

        const handleWishlist = (product) =>{
            if(user){
              axios.post('https://bazar-bd-server.vercel.app/wishlist',{product, email})
              .then(res => console.log(res));
              toast.success("Added Favourite !").catch(console.log("error"));
            }else{
                alert('Please Login')
             }
          }


    return (
        <div className="max-w-[1440px] mx-auto">
            {(Object.keys(products || discount).length > 0) && (
    <div className="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                <div className="md:flex items-center -mx-10">
                    <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                        <div className="relative">
                            <img src={isFromFlashSalePage ? discount?.productData?.product_image : products.product_image} className="w-full relative z-10" alt={isFromFlashSalePage ? discount.productName : products.productName} />
                            <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-10">
                        <div className="mb-10">
                            <h1 className="font-bold uppercase text-2xl mb-5">{isFromFlashSalePage ? discount.productName : products.productName}</h1>
                            <p className="text-base">{isFromFlashSalePage ? discount?.productData?.description : products.description} <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p>
                        </div>
                        <div>
                            <div className="inline-block align-bottom mr-5">
                                <span className="text-2xl leading-none align-baseline">$</span>
                                <span className="font-bold text-5xl leading-none align-baseline">{isFromFlashSalePage ? discount?.price?.toString().slice(0, 3) : products?.price?.toString().slice(0, 3)}</span>
                                <span className="text-2xl leading-none align-baseline">{isFromFlashSalePage ? discount?.price?.toString().slice(3, 6) : products?.price?.toString().slice(3, 6)}</span>
                            </div>
                            <div className="inline-block sm:mt-3 align-bottom">
                                <div className="flex items-center mt-6">
                                {/* {isFromFlashSalePage ? (
                                <Link to={`/myPayment/${discount.price.toFixed(2)}/${discount._id}`}>
                                    <button className="px-3 py-3 flex justify-between gap-2 items-center bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none active:bg-indigo-700"><FaHeart /> WishList</button>
                                </Link>
                                ) : (
                                products.price.toFixed(2) !== '0' && (
                                    <Link to={`/myPayment/${products.price.toFixed(2)}/${products._id}`}>
                                    <button className="px-3 flex justify-between gap-2 items-center py-3 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none active:bg-indigo-700"><FaHeart /> WishList</button>
                                    </Link>
                                )
                                )} */}

                                <button onClick={() => handleWishlist(isFromFlashSalePage ? discount?.productData : products)} className="px-3 flex justify-between gap-2 items-center py-3 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none active:bg-indigo-700"><FaHeart /> WishList</button>

                                    <button onClick={() => {handleAddCart(isFromFlashSalePage ? discount : products)}} className="mx-2 flex justify-between  items-center text-gray-600 border rounded-md px-3 py-3 text-sm hover:bg-gray-200 focus:outline-none">
                                    <MdOutlineShoppingCart />

                                    Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}


         <div className=" px-3 mb-9">
        <h3 className="text-gray-600 text-2xl font-medium mb-2">More Products</h3>
        <div className="w-full max-w-full mx-auto rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-7">
    {
        allProduct && allProduct.slice(0, 4).map(myData => (
            <Link to={`/productDetails/${myData._id}`} key={myData._id}>
                <div className="border">
                    <div className="flex items-end justify-end h-56 w-full bg-cover" style={{backgroundImage: `url(${myData.product_image})`}}>
                        <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">{myData.productName}</h3>
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