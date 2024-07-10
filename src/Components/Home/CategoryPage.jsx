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

    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    const filterData = products.filter(cat => cat.category.toLowerCase() == categoryName.toLowerCase())

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

        <div className="max-w-[1400px] my-5 mx-auto px-4 lg:px-0">
           <h2 className=" mt-5 mb-7 text-xl text-center font-medium">Find Result: {filterData.length}</h2>

           <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {filterData.map((item, index) => (
            <div key={index} className='bg-white border rounded-lg p-4 flex flex-col justify-between'>
              <img className='w-full h-40 object-contain mb-4' src={item.product_image} alt={item.productName} />
              <Link to={`/productDetails/${item._id}`}>
              <div>
                <p className='text-lg font-semibold'>${item.price}</p>
                <p className='text-gray-500'>{item.productName.slice(0,21)}</p>
              </div>
              </Link>
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

export default CategoryPage;
