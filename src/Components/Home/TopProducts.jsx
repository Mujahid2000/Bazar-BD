import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";
import { FaHeart } from "react-icons/fa";

const TopProducts = () => {
    const [products, setProducts] = useState(null);
    const { user } = useContext(AuthContext);
    const [loadProducts, setLoadProducts] = useState(5)
    const email = user?.email;
    // console.log(products);
    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res => {
                const filteredProducts = res.data.filter(product => product.rating > 3.5);
                setProducts(filteredProducts);
            })
            .catch(error => console.error(error));
    }, []);

    const handleAddCart = (data) => {
      axios
        .post(`https://bazar-bd-server.vercel.app/addCart`, { data, email })
        .then((response) => console.log(response));
      toast.success("Item added to cart!").catch(console.log("error"));
    };

    const loadMore= () =>{
      setLoadProducts((prev) => prev + 5)
  }


    const handleWishlist = (product) =>{
         axios.post('https://bazar-bd-server.vercel.app/wishlist',{product, email})
         .then(res => console.log(res));
         toast.success("Added Favourite !").catch(console.log("error"));
    }


    return (
      <div className="max-w-[120rem] mx-auto mb-5">
      <h2 className="ml-16 text-3xl font-bold">Explore Our Top Selling Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">
          {
              products && products.slice(0, loadProducts).map(data => (
                  <div key={data._id} className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-3">
                      <button onClick={() => handleWishlist(data)} className="absolute bg-fixed z-40 text-red-700 mb-96 ml-[16.6rem] mt-1">
                          <FaHeart />
                      </button>
                      <Link to={`/productDetails/${data._id}`}>
                          <img className="h-60 z-10 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={data?.product_image} alt="" />
                          <h1 className="text-center text-xl font-semibold">{data.productName.length > 20 ? data.productName.slice(0, 20) + "..." : data?.productName}</h1>
                          <p className="text-center text-lg font-bold">$<span className="text-orange-600">{data.price}</span></p>
                          <p className="text-center w-48 mx-auto">{data.description.slice(0, 30)}</p>
                      </Link>
                      <p>
                          <button onClick={() => { handleAddCart(data) }} className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">
                              Add to Cart
                          </button>
                      </p>
                  </div>
              ))
          }
      </div>
      <div className="flex justify-center items-center place-content-center">
          <button className="px-4 py-2 bg-indigo-600 active:bg-indigo-700 hover:bg-indigo-500 text-white rounded-md mt-5" onClick={loadMore}>Load More</button>
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

export default TopProducts;