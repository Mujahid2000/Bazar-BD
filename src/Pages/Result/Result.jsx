import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rating from "./Rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import Slider from '@mui/material/Slider';


const Result = () => {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");
    const [value1, setValue1] = useState([0, 500]);
   
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    const minDistance = 10;

    useEffect(() => {
        axios.get('http://localhost:5000/addProducts')
            .then(res => {
                setProducts(res.data);
                filterProducts(searchQuery, res.data, value1); // Apply filtering initially with default value
            })
            .catch(error => console.error(error));
    }, [searchQuery,location, value1]); 

    const filterProducts = (query, products, range) => {
        let filteredProducts = [...products];

        if (query) {
            filteredProducts = filteredProducts.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()));
        }

        // Filter based on price range
        filteredProducts = filteredProducts.filter(product => product.price >= range[0] && product.price <= range[1]);

        setSearchResults(filteredProducts);
    };

    const handleValue = (value) => {
        console.log(value);
    };

    return (
        <div className="flex">
            <div>
            <div className=" mx-2 mt-20">
        <h2 className="text-black ml-14 text-xl">Search Results:{searchResults.length}</h2>
        <div >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">
            {searchResults.map((product) => (
                                <div key={product._id} className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4" >
                                    <img className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={product?.product_image} alt="" />
                                    <h1 className="text-center hover:text-orange-600 text-xl font-semibold">{product.productName.length > 20 ? product.productName.slice(0, 20) + "..." : product?.productName}</h1>
                                    <p className="text-center text-lg font-bold ">$<span className="text-orange-600">{product.price} </span></p>
                                    <p className="text-center w-60 mx-auto">{product.description.slice(0, 30)}</p>
                                    <Rating stars={product.rating} />
                                    <p><button className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">Add to Cart</button></p>
                                </div>
                            ))}
        </div>
            
        </div>
        </div>
            </div>
            <div className="w-80 rounded-md border min-h-[90vh] mt-[140px] text-center shadow-md">
            <h3>Price Range</h3>
                <div className="flex w-72 mx-auto gap-2">
                    <div>
                        <p>Min Price</p>
                        <input type="number" className="w-36 text-black border text-center rounded-md" min={0} max={9990} value={value1[0]} onChange={(e) => setValue1([e.target.value, value1[1]])} />
                    </div>
                    <div>
                        <p>Max Price</p>
                        <input type="number" className="w-36 text-black border text-center rounded-md" min={0} max={9990} value={value1[1]} onChange={(e) => setValue1([value1[0], e.target.value])} />
                    </div>
                </div>
                <div className="mx-5">
                    <Slider
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={0}
                        max={9990}
                        disableSwap
                    />
                </div>
                <h2 className="mt-3">Availability</h2>
            <div className="flex gap-6 ml-5 mt-3">  <input type="checkbox" />
            <h3>All</h3> 
            </div>
            <div className="flex gap-6 ml-5 mt-3">  <input type="checkbox" />
            <h3>In Stock</h3> 
            </div>
            <div className="flex gap-6 ml-5 mt-3">  <input type="checkbox" />
            <h3>StockOut</h3> 
            </div>
            <h2 className="text-left ml-5 mt-5 mb-3">Ratings</h2>
            <hr />
            <button className="flex hover:bg-slate-100 py-2 px-4 rounded-md gap-6 ml-1 mt-5" value={5} onClick={() => handleValue(5)}>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            </button>
            <button className="flex hover:bg-slate-100 py-2 px-4 rounded-md gap-6 ml-1 mt-5" value={4} onClick={() => handleValue(4)}>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            
            </button>
            <button className="flex hover:bg-slate-100 py-2 px-4 rounded-md gap-6 ml-1 mt-5" value={3} onClick={() => handleValue(3)}>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            
            </button>
            <button className="flex hover:bg-slate-100 py-2 px-4 rounded-md gap-6 ml-1 mt-5" value={2} onClick={() => handleValue(2)}>
            <FaStar className="text-orange-500"/>
            <FaStar className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            </button>
            <button className="flex hover:bg-slate-100 py-2 px-4 rounded-md gap-6 ml-1 mt-5" value={1} onClick={() => handleValue(1)}>
            <FaStar className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            <FaRegStar  className="text-orange-500"/>
            </button>
            </div>
        </div>
    );
};

export default Result;