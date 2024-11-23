import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Rating from "./Rating";
import { FaCartArrowDown, FaFilter, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import Slider from '@mui/material/Slider';
import { AuthContext } from "../../Configs/AuthContext";
import { Toaster, toast } from "sonner";
import { IoMdClose } from "react-icons/io";


const Result = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");
    const [value1, setValue1] = useState([0, 999]);
    const [isChecked1 , setIsChecked1] = useState(false);
    const [isChecked2 , setIsChecked2] = useState(false);
    const [isChecked3 , setIsChecked3] = useState(false);
    const [rating, setRating] = useState(0);
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const [error, setError] = useState(null);
    const [filterSideBar, setFilterSideBar] = useState(false)
    const sidebarRef = useRef(null);



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


    const handleChange11 = (data) => {
        setIsChecked1(!isChecked1);
        filterProducts(searchQuery, products, value1);
        // console.log('hello', event.target.checked);
    }
    
    const handleChange2 = (data) => {
        if(event.target.checked === true){
            setIsChecked2(!isChecked2);
            filterProducts(searchQuery, products, value1);
            // console.log('in stock 1', event.target.checked);
        }
    }
    
    const handleChange3 = (data) => {
        setIsChecked3(!isChecked3);
        filterProducts(searchQuery, products, value1);
        // console.log( event.target.checked);
    }
    
    
    const handleValue = (value) => {
        // console.log(value);
        setRating(value)
    };


    useEffect(() => {
        axios.get('https://postgre-server.vercel.app/product')
            .then(res => {
                setProducts(res.data.data);
                filterProducts(searchQuery, res.data.data, value1,); 
                setLoading(false)
            })
            .catch(error => console.error(error));
    }, [searchQuery,location, value1,isChecked2, isChecked1, isChecked3, rating]); 
// console.log(filterProducts);
    const filterProducts = (query, products, range) => {
        let filteredProducts = [...products];

        if (query) {
            filteredProducts = filteredProducts.filter(product => product.productname.toLowerCase().includes(query.toLowerCase()));
        }

        // Filter based on price range
        filteredProducts = filteredProducts.filter(product => product.price >= range[0] && product.price <= range[1]);

        if (isChecked1 === true) {
            // console.log('Filtering for products in stock All');
            filteredProducts = filteredProducts.filter(product => product.stock !== undefined);
        }
        if (isChecked2 === true) {
            // console.log('Filtering for products in stock');
            filteredProducts = filteredProducts.filter(product => product.stock === 'In Stock');
        }
        if (isChecked3 === true) {
            // console.log('Filtering for products in stock out ');
            filteredProducts = filteredProducts.filter(product => product.stock === 'Stock Out');
        }
        
        if(rating){
            filteredProducts = filteredProducts.filter(products => products.rating >= rating)
        }
        setSearchResults(filteredProducts);
    };


    const handleAddCart = (data) => {
        if(user){
          axios.post(`https://postgre-server.vercel.app/cart`, { data, email })
          .then((response) => console.log(response));
        toast.success("Item added to cart!").catch(console.log("error"));
        }
        };
  


    const handleFilterSideBar = () =>{
        setFilterSideBar(!filterSideBar)
    }


    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setFilterSideBar(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousemove", handleClickOutside);
        };
      }, []);

        if (loading) return <p className="pt-32 text-center">Loading...</p>;
        if (error) return <p>{error}</p>;

    return (
        <div className="flex max-w-[1440px] min-h-screen pt-32 flex-col-reverse md:flex-row-reverse lg:flex-row-reverse lg:items-start mx-auto md:justify-evenly">
            <div>
                <div className="flex justify-between px-5 mx-0  lg:px-0 items-center border-b-2 border-blue-200">
        <h2 className="text-black py-3 md:py-3  md:px-3   text-lg md:text-xl">Search Results: {searchResults.length}</h2>
        <button onClick={handleFilterSideBar} className="flex block  border p-2 rounded-[5px] border-blue-400 justify-center items-center gap-3">
            FILTER
            <FaFilter className="text-blue-500 w-3 h-4"/>
        </button>
                </div>
        
            <div className=" mx-0 py-3">
        <div >
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5 place-items-center">
            {searchResults && searchResults.map((product) => (
                               <div
                               className="w-[18.5rem] px-3 mx-auto rounded-lg border border-gray-200  duration-300 bg-white"
                               key={product.id}
                             >
                               {/* Product Image */}
                               <div className="flex items-center justify-center h-64 bg-gray-50 relative">
                                 <img
                                   src={product.product_image[0]}
                                   alt={product.productname}
                                   className="w-full h-full "
                                 />
                                 {product.isNew && (
                                   <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
                                     New
                                   </span>
                                 )}
                               </div>
                             
                               {/* Product Details */}
                               <Link to={`/productDetails/${product.id}`} className="p-5 mx-20">
                                 {/* Product Title and Price */}
                                 <div className="flex justify-between items-center mb-3">
                                   <div>
                                     <h4 className="font-medium text-gray-900 text-sm uppercase hover:text-blue-600 transition">
                                      
                                       <p>
                                        {product.productname.length > 20
                                           ? product.productname.slice(0, 20) + "..."
                                           : product.productname}
                                       </p>
                                         
                                      
                                     </h4>
                                     <span className="text-xs font-semibold text-gray-500">{product.category}</span>
                                   </div>
                                   <div className="text-lg font-bold text-gray-900">${product?.price}</div>
                                 </div>
                             
                                 {/* Rating and Add to Cart */}
                                 <div className="flex justify-between items-center">
                                   <Rating stars={product.rating} />
                                   <button
                                     onClick={() => handleAddCart(product)}
                                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold text-sm"
                                     aria-label="Add to Cart"
                                   >
                                     Add to Cart
                                   </button>
                                 </div>
                               </Link>
                             </div>
                             
                            ))}
        </div>
            
        </div>
        </div>
            </div>
            <div  ref={sidebarRef} className={`fixed top-0 right-0 w-full md:w-[24rem] h-screen px-4 bg-white shadow-lg transition-transform duration-300 z-50 ${filterSideBar ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between px-4">
           <h2 className="text-black px-1   text-xl  my-4">FILTER</h2>
           <button onClick={handleFilterSideBar} className="flex      rounded-[5px]  justify-center items-center ">
            
            <IoMdClose className="text-blue-500 "/>
        </button>
                </div>
           
           {/* section 1 */}
            <div className="bg-white border border-blue-200 rounded-[5px] p-5">
            <h3 className="text-lg font-semibold">Price</h3>
            <div className="mx-2 ">
                    <Slider
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={0}
                        max={999}
                        disableSwap
                    />
                </div>
                <div className="flex max-w-72 px-0 mx-auto gap-2">
                    <div>
                        
                        <input type="number" className="w-32 text-black border text-center rounded-md" min={0} max={999} value={value1[0]} onChange={(e) => setValue1([e.target.value, value1[1]])} />
                    </div>
                    <div>
                        
                        <input type="number" className="w-32  text-black border text-center rounded-md" min={0} max={999} value={value1[1]} onChange={(e) => setValue1([value1[0], e.target.value])} />
                    </div>
                </div>
               
            </div>

{/* section 2 */}
                <div className="bg-white my-3 border border-blue-200 rounded-[5px] py-5">
                <div className="ml-5 ">
    {/* Heading for context */}
    <h2 className="text-lg font-semibold mb-4">Filter Stock</h2>
    
    {/* Checkbox List */}
    <div className="flex flex-col gap-4">
        {/* All Option */}
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
                onChange={() => handleChange11("All")}
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded "
            />
            <span className="text-gray-700 group-hover:text-blue-600">All</span>
        </label>

        {/* In Stock Option */}
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
                onChange={() => handleChange2("In Stock")}
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded "
            />
            <span className="text-gray-700 group-hover:text-blue-600">In Stock</span>
        </label>

        {/* Stock Out Option */}
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
                onChange={() => handleChange3("Stock Out")}
                type="checkbox"
                className="w-5 h-5 text-blue-500 border-gray-300 rounded "
            />
            <span className="text-gray-700 group-hover:text-blue-600">Stock Out</span>
        </label>
    </div>
</div>
                </div>
                
{/* section 3 */}
            <div className="border px-5 border-blue-200 rounded-[5px] py-4">
            <h2 className="text-lg font-semibold">Filter Ratings</h2>
            
            <button className="flex hover:bg-slate-100  rounded-md gap-6 mt-3" value={4.5} onClick={() => handleValue(4.5)}>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            </button>
            <button className="flex hover:bg-slate-100  rounded-md gap-6  mt-5" value={4} onClick={() => handleValue(4)}>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            
            </button>
            <button className="flex hover:bg-slate-100  rounded-md gap-6  mt-5" value={3} onClick={() => handleValue(3)}>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            
            </button>
            <button className="flex hover:bg-slate-100  rounded-md gap-6  mt-5" value={2} onClick={() => handleValue(2)}>
            <FaStar className="text-yellow-400"/>
            <FaStar className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            </button>
            <button className="flex hover:bg-slate-100  rounded-md gap-6  mt-5" value={1} onClick={() => handleValue(1)}>
            <FaStar className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            <FaRegStar  className="text-yellow-400"/>
            </button>
            </div>
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

export default Result;