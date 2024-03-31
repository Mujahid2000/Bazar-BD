import axios from "axios";
import { useEffect, useState } from "react";
import { Parallax } from 'react-parallax';
import { useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";


const ShopProfile = ({shop}) => {
    const {shopName} = useParams();
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [userData] = useState({
        totalOrders: 52,
        averageRating: 4.8,
        responseTime: '1-2 business days'
      });
    

    
    
    useEffect(() => {
        axios.get('http://localhost:5000/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);

    

    const filterData = products.filter(cat => cat.shopName == shopName)
    
    

const posterImg = filterData.filter(pro => {
    // Check if pro.shopName matches the shopName and if it's not already in filter
    if (pro.shopName === shopName && !filter.find(item => item === pro.shopPicture)) {
        // Add pro.shopName to filter
        setFilter(prevFilter => [...prevFilter, pro.shopPicture]);
        // Return true to keep pro in the filtered array
        return true;
    } else {
        // Return false to exclude pro from the filtered array
        return false;
    }
});




    return (
        <div className="mt-[5rem]">
             <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={filter}
        bgImageAlt="the dog"
        strength={200}
    >
        
        <div style={{ height: '40rem' }} />

    </Parallax>
    <div>
    
   
<div className="flex flex-wrap -mx-3 mb-5">
  <div className="w-full max-w-full px-3 mb-6  mx-auto bg-white">
    <div className="flex flex-wrap mt-5 mx-5 removable">
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable" draggable="true">
           
            <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                    <img className="w-[35px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/instagram.svg" alt="youtube"/>
                </div>
                <div className="flex flex-col my-7">
                    <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">590k</span>
                    <div className="m-0">
                        <span className="font-medium text-secondary-dark text-lg/normal">Followers</span>
                    </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"></path>
                    </svg>
                    2.86%
                </span>
            </div>
           
        </div>
    </div>
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable" draggable="true">
           
            <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                    <img className="w-[35px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/youtube.svg" alt="youtube"/>
                </div>
                <div className="flex flex-col my-7">
                    <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">58k</span>
                    <div className="m-0">
                        <span className="font-medium text-secondary-dark text-lg/normal">Subscribers</span>
                    </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"></path>
                    </svg>
                    7%
                </span>
            </div>
            
        </div>
    </div>
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable" draggable="true">
           
            <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                    <img className="w-[35px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/facebook.svg" alt="youtube"/>
                </div>
                <div className="flex flex-col my-7">
                    <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">896k</span>
                    <div className="m-0">
                        <span className="font-medium text-secondary-dark text-lg/normal">Followers</span>
                    </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-danger bg-danger-light border border-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"></path>
                    </svg>
                    1.12%
                </span>
            </div>
         
        </div>
    </div>
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable" draggable="true">
           
            <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                    <img className="w-[35px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/twitter.svg" alt="youtube"/>
                </div>
                <div className="flex flex-col my-7">
                    <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">77k</span>
                    <div className="m-0">
                        <span className="font-medium text-secondary-dark text-lg/normal">Followers</span>
                    </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"></path>
                    </svg>
                    9.4%
                </span>
            </div>
           
        </div>
    </div>
</div>
  </div>
</div>

    </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">


            {
                filterData.map(filter =>(
                    <div key={filter._id} className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4" >
                    <img className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300" src={filter?.product_image} alt="" />
                    <h1 className="text-center hover:text-orange-600 text-xl font-semibold">{filter.productName.length > 20 ? filter.productName.slice(0, 20) + "..." : filter?.productName}</h1>
                    <p className="text-center text-lg font-bold ">$<span className="text-orange-600">{filter.price} </span></p>
                    <p className="text-center w-60 mx-auto">{filter.description.slice(0, 30)}</p>
                    <Rating stars={filter.rating} />
                    <p><button className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg">Add to Cart</button></p>
                </div>
                ))
            }
             </div>
        </div>
    );
};

export default ShopProfile;