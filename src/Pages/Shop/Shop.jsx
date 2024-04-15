import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";



const Shop = () => {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
   

    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/shop')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    

    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

      {
        products.map(pro => (

            <Link key={pro._id} to={`/shopDetail/${pro.shopName}`}>
            
            <section  className="container mx-auto p-10 md:p-20 antialiased ">
    <article
        className=" flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-3xl group cursor-pointer transform duration-500 hover:-translate-y-1">
        <img className="w-full max-h-[400px] object-cover md:w-52" src={pro.shopPicture} alt=""/>
        <div className="">
            <div className="p-5 pb-10">
                <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                   {pro.shopName}
                </h1>
                <p className="text-xl text-gray-700 mt-2 leading-relaxed">
                    One of the biggest online shopping Platform in Bangladesh
                </p>
            </div>
            <div className="bg-blue-50 p-5">
                <div className="sm:flex sm:justify-between">
                    <div>
                        <div className="text-lg text-gray-700">
                            <span className="text-gray-900 font-bold">Varified</span> from BazarBD
                        </div>
                        <div className="flex items-center">
                            <div className="flex">
                            <FaStar className="text-orange-500"/>

                            <FaStar className="text-orange-500"/>

                            <FaStar className="text-orange-500"/>

                            <FaStar className="text-orange-500"/>

                            <FaStar className="text-orange-500"/>

                            </div>
                            <div className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                                <p>16 reviews</p>
                            </div>
                        </div>
                    </div>
                    <button className="relative h-12 w-40 overflow-hidden border border-orange-600 text-orange-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-orange-600 before:duration-300 before:ease-out hover:text-white hover:shadow-orange-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
      <span className="relative z-10">Visit</span>
    </button>
                </div>
                
            </div>
        </div>
    </article>
    </section>
            </Link>
        ))
      }
    </div>
    );
};

export default Shop;