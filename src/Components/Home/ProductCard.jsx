import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";
import { FaHeart } from "react-icons/fa";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loadProducts, setLoadProducts] = useState(5)
    const { user } = useContext(AuthContext);
    const email = user?.email;
    // console.log(products);

    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    const loadMore= () =>{
        setLoadProducts((prev) => prev + 5)
    }

    const handleAddCart = (data) => {
        axios
          .post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
          .then((response) => console.log(response));
        toast.success("Item added to cart!").catch(console.log("error"));
      };


      const handleWishlist = (product) =>{
           axios.post('https://bazar-bd-server.vercel.app/wishlist',{product, email})
           .then(res => console.log(res));
           toast.success("Added Favourite !").catch(console.log("error"));
      }

    return (
        <div className="mx-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">
  {products.slice(0, loadProducts).map((product) => (
    <div key={product._id} className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4">
        <button onClick={() => handleWishlist(product)} className="absolute bg-fixed z-40 text-red-700 mb-96 ml-[16.6rem] mt-1"><FaHeart></FaHeart></button>
      <Link to={`/productDetails/${product._id}`}>
        <img className="h-60 z-10 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={product?.product_image} alt="" />
        <h1 className="text-center text-xl font-semibold">{product.productName.length > 20 ? product.productName.slice(0, 20) + "..." : product?.productName}</h1>
        <p className="text-center text-lg font-bold">$<span className="text-orange-600">{product.price}</span></p>
        <p className="text-center w-48 mx-auto">{product.description.slice(0, 30)}</p>
      </Link>
      <p>
        <button onClick={() => {handleAddCart(product)}} className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">
          Add to Cart
        </button>
      </p>
    </div>
  ))}
</div>

        <div className="flex justify-center items-center place-items-center">
        <button className="px-4 py-2 bg-indigo-600 active:bg-indigo-700 hover:bg-indigo-500 text-white rounded-md mt-5 " onClick={loadMore} >Load More</button>
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

export default ProductCard;
