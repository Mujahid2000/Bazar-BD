import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";

const CategoryPage = ({ categories }) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const email = user?.email;
        console.log(email);
    

    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    const filterData = products.filter(cat => cat.category == categoryName)

    const handleAddCart = (data) => {
      if(user){
        axios
          .post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
          .then((response) => console.log(response));
        toast.success("Item added to cart!").catch(console.log("error"));
      }
      };

      const handleWishlist = (product) =>{
        if(user){
          axios.post('https://bazar-bd-server.vercel.app/wishlist',{product, email})
          .then(res => console.log(res));
          toast.success("Added Favourite !").catch(console.log("error"));
        }
      }
    
    return (
        <div>
           <h2 className=" mt-20 text-xl text-center font-medium">Find Result: {filterData.length}</h2>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center">
            {
                filterData.map(product => (
                  <div className="max-w-xs mx-auto  relative shadow-lg bg-[#1A2238] spacing" key={product._id}>
                  <div className="absolute left-0 top-10 text-uppercase text-xs font-semibold bg-gray-600 text-green-500 px-2 py-1">New Product</div>
                  <div className="flex items-center justify-center h-72 bg-white">
                      <img src={product.product_image} className="max-w-full max-h-64"/>
                  </div>
                  <div className="p-7">
                      <span className="block text-xs font-semibold uppercase text-blue-300 ">{product.category}</span>
                      <h4 className="block font-medium  uppercase text-blue-500 no-underline transition duration-300 hover:text-red-500"><Link to={`/productDetails/${product._id}`}>{product.productName.length > 20 ? product.productName.slice(0,10) : product.productName}</Link></h4>
                      <p className="text-base leading-6 mb-4 text-blue-200">{product.description.slice(0, 40)}</p>
                      <div className="overflow-hidden border-t border-blue-200 ">
                          <div className="text-lg font-semibold text-red-600">${product?.price}</div>
                          <div className=" flex justify-between items-start gap-4">
                            <div>
                            <Rating stars={product.rating}/>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleWishlist(product)}><FaHeart  className="text-white active:text-red-600"/></button>
                              <button onClick={() => {handleAddCart(product)}}><FaCartArrowDown className="text-white active:text-red-600"/></button>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
                ))
            }
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

export default CategoryPage;