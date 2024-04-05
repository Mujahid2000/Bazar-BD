import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const ProductDetails = () => {
    const { id } = useParams();
    
    const [products, setProducts] = useState({}); 
    const [allProduct, setAllProducts] = useState()
    
    
    useEffect(() => {
        axios
          .get(`http://localhost:5000/addProducts/${id}`)
          .then((res) => setProducts(res.data))
          .catch((error) => console.error(error));
      }, [id]);



      useEffect(() => {
        axios.get('http://localhost:5000/addProducts')
            .then(res =>  res.data)
            .then(data => {
                const shuffledArray = data.sort(() => 0.5 - Math.random());
                setAllProducts(shuffledArray)
            })
            .catch(error => console.error(error));
    }, []);


    return (
        <div className="max-w-[1440px] mx-auto">
            {Object.keys(products).length > 0 && (
            <div className="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
            <div className="min-w-screen min-h-screen  flex items-center p-5 lg:p-10 overflow-hidden relative">
    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                    <img src={products.product_image} className="w-full relative z-10" alt="Waterproof Jacket"/>
                    <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                    <h1 className="font-bold uppercase text-2xl mb-5">{products.productName}</h1>
                    <p className="text-base">{products.description} <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p>
                </div>
                <div>
                    <div className="inline-block align-bottom mr-5">
                        <span className="text-2xl leading-none align-baseline">$</span>
                        <span className="font-bold text-5xl leading-none align-baseline">{products.price.toString().slice(0,3)}</span>
                        <span className="text-2xl leading-none align-baseline">{products.price.toString().slice(3,6)}</span>
                    </div>
                    <div className="inline-block sm:mt-3 align-bottom">
                    <div className="flex items-center mt-6">
                        <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none active:bg-indigo-700">Order Now</button>
                        <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                            <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
            </div>
        )}

         <div className=" px-3 mb-9">
        <h3 className="text-gray-600 text-2xl font-medium mb-2">More Products</h3>
        <div className="w-full max-w-full mx-auto rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-7">
    {
        allProduct && allProduct.slice(0, 4).map(myData => (
            <Link to={`/productDetails/${myData._id}`} key={myData._id}>
                <div className="border">
                    <div className="flex items-end justify-end h-56 w-full bg-cover" style={{backgroundImage: `url(${myData.product_image})`}}>
                        <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="px-5 py-3">
                        <h3 className="text-gray-700 uppercase">{myData.productName}</h3>
                        <span className="text-gray-500 mt-2">${myData.price}</span>
                    </div>
                </div>
            </Link>
        ))
    }
</div>
</div> 
        </div>
    );
};

export default ProductDetails;