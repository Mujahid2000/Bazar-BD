import { useContext, useEffect, useState } from "react";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../Configs/AuthContext";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";


const AllProducts = () => {
  const [allProduct, setAllProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [page, setPage] = useState(1);
    const { user } = useContext(AuthContext);
    const email = user?.email;

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setLoading(true); // Set loading to true while fetching data
        axios.get(`https://bazar-bd-server.vercel.app/addProducts?page=${page}`)
            .then(res =>  res.data)
            .then(data => {
                const shuffledArray = data.sort(() => 0.5 - Math.random());
                setAllProducts(prevProducts => [...prevProducts, ...shuffledArray]);
                setPage(prevPage => prevPage + 1);
                setHasMore(data.length > 0);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false)); // Set loading to false after data fetching
    };

    const handleAddCart = (data) => {
        if(user){
            axios.post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
            .then((response) => console.log(response));
            toast.success("Item added to cart!");
        } else {
            alert('Log in Please')
        }
    };

    const handleWishlist = (product) =>{
        if(user){
            axios.post('https://bazar-bd-server.vercel.app/wishlist',{product, email})
            .then(res => console.log(res));
            toast.success("Added Favourite !");
        } else {
            alert('Log in Please')
        }
    };



    return (
        <div className="mt-20 mx-auto">
          <InfiniteScroll
                dataLength={allProduct.length}
                next={loadProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mb-5">
           {
              allProduct &&  allProduct.map(product =>(
                    <div className="max-w-xs mx-auto relative shadow-lg bg-[#1A2238] spacing" key={product._id}>
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
                <div className="justify-end flex gap-4">
                    <button onClick={() => handleWishlist(product)}><FaHeart  className="text-white"/></button>
                    <button onClick={() => {handleAddCart(product)}}><FaCartArrowDown className="text-white"/></button>
                </div>
            </div>
        </div>
    </div>
                ))
            }
           </div>
           </InfiniteScroll>
           {loading && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
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

export default AllProducts;