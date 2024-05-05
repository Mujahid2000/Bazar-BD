import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";
import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";

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
    
    return (
        <div>
           <h2 className=" mt-20 text-xl text-center font-medium">Find Result: {filterData.length}</h2>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center">
            {
                filterData.map(filter => (
                    <div key={filter._id} className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4" >
                        <Link  to={`/productDetails/${filter._id}`}>                 
                    <img className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={filter?.product_image} alt="" />
                    <h1 className="text-center hover:text-orange-600 text-xl font-semibold">{filter.productName.length > 20 ? filter.productName.slice(0, 20) + "..." : filter?.productName}</h1>
                    <p className="text-center text-lg font-bold ">$<span className="text-orange-600">{filter.price} </span></p>
                    <p className="text-center w-60 mx-auto">{filter.description.slice(0, 30)}</p>
                    <Rating stars={filter.rating} />
                    </Link>
                    <p><button onClick={() => {
                handleAddCart(filter); // Call handleAddCart after successful toast display
              }} className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">Add to Cart</button></p>
                </div>
                ))
            }
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

export default CategoryPage;