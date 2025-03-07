import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Toaster, toast } from "sonner";
import { AuthContext } from "../../Configs/AuthContext";


const CategoryPage = ({ categories }) => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);


useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://postgre-server.vercel.app/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  fetchData();
}, []);

    const filterData = products.filter(cat => cat.category.toLowerCase() == categoryName.toLowerCase())

    
    return (

        <div className="max-w-[1400px] min-h-[80vh] pt-32 my-0 mx-auto px-4 lg:px-0">

           <h2 className=" mt-5 mb-7 text-xl text-center font-medium">Find Result: {filterData.length}</h2>
           {
  loading ? (
    // Shown when loading is true (e.g., spinner, text)
   <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
   
<div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
        </div>
      </div>
</div>
   
<div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
        </div>
      </div>
</div>
   
<div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
        </div>
      </div>
</div>
   
<div className="bg-white p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
      <div className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse" ></div>
      <div className="flex flex-col flex-1 gap-5 sm:p-2">
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-14 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
        </div>
        <div className="mt-auto flex gap-3">
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full" ></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto" ></div>
        </div>
      </div>
</div>
   </div>
  ) : (
    // Shown when loading is false
     <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {filterData.map((item, index) => (
            <div key={index} className='bg-white border rounded-lg p-4 flex flex-col justify-between'>
              <img className='w-full h-40 object-contain mb-4' src={item.product_image[0]} alt={item.productName} />
              <Link to={`/productDetails/${item.id}`}>
              <div>
                <p className='text-lg font-semibold'>${item.price}</p>
                <p className='text-gray-500'>{item.productname?.slice(0,21)}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
  )
}
          
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

export default CategoryPage;
