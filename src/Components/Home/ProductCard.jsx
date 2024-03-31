import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loadProducts, setLoadProducts] = useState(5)
    // console.log(products);

    useEffect(() => {
        axios.get('http://localhost:5000/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    const loadMore= () =>{
        setLoadProducts((prev) => prev + 5)
    }

    return (
        <div className="mx-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">
            {products.slice(0, loadProducts).map((product) => (
                <div key={product._id}  className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4" >
            <img className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={product?.product_image} alt="" />
            <h1 className="text-center text-xl font-semibold">{product.productName.length > 20 ? product.productName.slice(0, 20) + "..." : product?.productName}</h1>
            <p className="text-center text-lg font-bold ">$<span className="text-orange-600">{product.price} </span></p>
            <p className="text-center w-48 mx-auto">{product.description.slice(0, 30)}</p>
            <p><button className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">Add to Cart</button></p>
            </div>
            ))}
        </div>
        <div className="flex justify-center items-center place-items-center">
        <button className="px-4 py-2 bg-indigo-600 active:bg-indigo-700 hover:bg-indigo-500 text-white rounded-md mt-5 " onClick={loadMore} >Load More</button>
        </div>
        </div>
    );
};

export default ProductCard;
