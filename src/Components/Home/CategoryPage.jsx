import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";


const CategoryPage = ({ categories }) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:5000/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    const filterData = products.filter(cat => cat.category == categoryName)
    
    return (
        <div>
           <h2 className=" mt-20 text-xl text-center font-medium">Find Result: {filterData.length}</h2>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center">
            {
                filterData.map(filter => (
                    <Link key={filter._id} to={`/productDetails/${filter._id}`}>                 
                    <div  className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4" >
                    <img className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={filter?.product_image} alt="" />
                    <h1 className="text-center hover:text-orange-600 text-xl font-semibold">{filter.productName.length > 20 ? filter.productName.slice(0, 20) + "..." : filter?.productName}</h1>
                    <p className="text-center text-lg font-bold ">$<span className="text-orange-600">{filter.price} </span></p>
                    <p className="text-center w-60 mx-auto">{filter.description.slice(0, 30)}</p>
                    <Rating stars={filter.rating} />
                    <p><button className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">Add to Cart</button></p>
                </div>
                    </Link>
                ))
            }
        </div>
        </div>
    );
};

export default CategoryPage;