import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// const cardsData = [
//     {
//       image: 'https://i.ibb.co/x3P3bsq/e4b654e7de1ac596c31da4b9f1994793.png',
//       title: 'Smart watches',
//       price: 'From USD 19',
//     },
//     {
//       image: 'https://i.ibb.co/PY6pf76/2c0a4a3071479d3ea04dbef308c19301.png',
//       title: 'Cameras',
//       price: 'From USD 19',
//     },
//     {
//       image: 'https://i.ibb.co/1fsSM8W/db935c4b51e951193ddd1064f61e7b77.png',
//       title: 'Headphones',
//       price: 'From USD 19',
//     },
//     {
//       image: 'https://i.ibb.co/JrbGhMD/b66e289400004efec8d3c212c576efd7.png',
//       title: 'Tea Maker',
//       price: 'From USD 19',
//     },
//     {
//       image: 'https://i.ibb.co/PMBbXxd/7844418a11051c24070081697c1e9a58.png',
//       title: 'Gaming set',
//       price: 'From USD 100',
//     },
//     {
//       image: 'https://i.ibb.co/zPDf7MR/67d46067797d63f72c5d238bab2c834f.png',
//       title: 'Laptops & PC',
//       price: 'From USD 39',
//     },
//     {
//       image: 'https://i.ibb.co/vhwRRN7/5b845d5b649289426578b53ebaef4c65.png',
//       title: 'Tablets',
//       price: 'From USD 19',
//     },
//     {
//       image: 'https://i.ibb.co/fF3wP7K/a2d288ce5bd52ddfac2945120df5102b.png',
//       title: 'SmartPhones',
//       price: 'From USD 10',
//     },
//   ];
const ElectronicSection = () => {
  const [product, setProduct] = useState([]);
console.log(product)

  useEffect(() => {
    axios.get('https://postgre-server.vercel.app/product?_limit=8')
        .then(res => {
            const filteredProducts = res.data.data.filter(product => product.shopname  === 'Sonic Waves');
            setProduct(filteredProducts);
        })
        .catch(error => console.error(error));
}, []);
    return (
        <div className='max-w-[1400px] mx-auto my-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-1 lg:col-span-1  rounded-lg  flex flex-col justify-between'>
          <div className='absolute p-12'>
            <h2 className='text-2xl text-[#1C1C1C] font-bold mb-4 text-center'>Consumer  electronics <br /> and  gadgets</h2>
            <button className='bg-white ml-14 text-black text-center font-semibold py-2 px-4 rounded shadow'>
              Source now
            </button>
          </div>
          <img
            className='rounded-l-md h-[25rem] w-full'
            src='https://i.ibb.co/zPFQ8rj/4c8412945ece65003461e7d1b12857d0.png'
            alt='Home and outdoor'
          />
        </div>
        <div className='col-span-2 lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 '>
          {product && product.slice(2,10).map((item, index) => (
            <Link  key={index} to={`/productDetails/${item.id}`}>
            <div
             
             className='bg-white border-r-md  py-2 px-7 flex flex-col items-center justify-between border'
           >
             <img
               className='w-28 h-28 object-contain mb-4'
               src={item.product_image}
               alt={item.productname}
             />
             <div className='text-center'>
               <h3 className='text-lg font-semibold'>{item.productname}</h3>
               <p className='text-gray-500'>{item.price}</p>
             </div>
           </div>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
    );
};

export default ElectronicSection;