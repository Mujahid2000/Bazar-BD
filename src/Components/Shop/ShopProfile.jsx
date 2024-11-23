import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";
import { MdOutlineRateReview } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";

const ShopProfile = ({ shop }) => {
  const { shopName } = useParams();
  const [products, setProducts] = useState([]);
  const [shopData, setShop] = useState([])

  const [name, setName] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;



  const [userData] = useState({
    totalOrders: 52,
    averageRating: 4.8,
    responseTime: "1-2 business days",
  });


  useEffect(() => {
    axios.get(`https://postgre-server.vercel.app/shop/${shopName}`)
        .then((res) => setShop(res.data.data))
        .catch((error) => console.error("Error fetching shop data:", error));
}, [shopName]);

useEffect(() => {
    axios.get(`https://postgre-server.vercel.app/product/shop/${shopName}`)
        .then((res) => setProducts(res.data.data))
        .catch((error) => console.error("Error fetching products:", error));
}, [shopName]);




const handleAddCart = (data) => {
  const productid = data.idp;
     if(user){
       axios.post(`https://postgre-server.vercel.app/cart`, { productid, email })
       .then((response) => console.log(response));
     toast.success("Item added to cart!")
     }else{
        alert('Please Login')
     }
    };

    const handleWishlist = (product) =>{
        const productid = product.idp;
        if(user){
          axios.post('https://postgre-server.vercel.app/wishlist',{productid, email})
          .then(res => console.log(res));
          toast.success("Added Favourite !").catch(console.log("error"));
        }else{
            alert('Please Login')
         }
      }

  return (
    <div className=" mb-6">
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={shopData[0]?.shoppicture}
        bgImageAlt="the dog"
        strength={200}
      >
        <div style={{ height: "40rem" }} />
      </Parallax>
      <div>
        <h1 className="text-5xl text-center font-bold mt-5">{shopName}</h1>
        <div className="flex max-w-[1440px] mx-auto flex-wrap mt-5  removable">
          <div className="w-full max-w-full px-2 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/2sVWwNK/8439799.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    24 Hours
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Response
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  90%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-2 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/KhQSsKk/star.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    4.8
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Rating
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  Good Review
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-2 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/x7Y6D8r/1267879-200.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    10+
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Partner Companies
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-danger bg-danger-light border border-danger">
                  <img
                    src="https://i.ibb.co/pWdQjZt/growth-increase-profit-single-isolated-icon-vector-36074248.jpg"
                    alt=""
                    className="w-4 mr-1"
                  />
                  1.12%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-2 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/facebook.svg"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    Facebook
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Follow Us
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  9.4%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-8 place-items-center max-w-[1440px] mx-auto">
        {products.map((product) => (
           <div className="w-[20rem]  mx-auto rounded-lg  relative border  spacing" key={product.id} >
           
           <div className="flex items-center justify-center h-64 bg-white">
               <img src={product.product_image[0]} className="w-[12rem] h-[12rem] py-2"/>
           </div>
           
           <div className="p-7">
               <div className="flex justify-between items-center">
                <div className="">
                  <h4 className="block font-medium   uppercase text-gray-900 no-underline transition duration-300 hover:text-blue-600">
                <Link to={`/productDetails/${product.id}`}>
                {product.productname?.length > 20 ? product.productname?.slice(0,10) : product.productname}</Link>
                </h4>
                <span className="block text-xs  font-semibold uppercase text-gray-900 ">{product.category}</span>
               
                </div>
                <div>
                <div className="text-lg font-semibold text-gray-900">${product?.price}</div>
                </div>
               </div>
               {/* <p className="text-base leading-6 mb-4 text-gray-900">{product.description.slice(0, 40)}</p> */}
               <div className="overflow-hidden pt-2 text-gray-900 ">
                   
                   <div className=" flex justify-between items-start gap-4">
                     <div>
                     <Rating stars={product.rating}/>
                     </div>
                     <div className="flex gap-2">
                       <button onClick={() => handleWishlist(product)}><FaHeart  className="text-gray-900 active:text-red-600"/></button>
                       <button onClick={() => {handleAddCart(product)}}><FaCartArrowDown className="text-gray-900 active:text-red-600"/></button>
                     </div>
                   </div>
               </div>
           </div>

       </div>
        ))}
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            success: "text-green-400",
          },
        }}
      />
    </div>
  );
};

export default ShopProfile;
