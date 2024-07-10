import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const productData = [
    {
      image: 'https://i.ibb.co/4fw9d8D/b171e503e38e7b8c0a5fa03996d5d467.png',
      title: 'T-shirts with multiple colors, for men',
      price: '$10.30',
    },
    {
      image: 'https://i.ibb.co/qDT5MZQ/fcc6274edfb7e97f682185ec460b6d4f.png',
      title: 'Jeans shorts for men blue color',
      price: '$10.30',
    },
    {
      image: 'https://i.ibb.co/Hr1gFpP/895e1e83befccaeafc962783f0de80c5.png',
      title: 'Brown winter coat medium size',
      price: '$12.50',
    },
    {
      image: 'https://i.ibb.co/tb1wyxG/8e68b15c28eb29234224b8b2f71d5eb5.png',
      title: 'Jeans bag for travel for men',
      price: '$34.00',
    },
    {
      image: 'https://i.ibb.co/R7vznFm/18aa7b0da8ec069e90fab9443221e2f2.jpg',
      title: 'Leather wallet',
      price: '$99.00',
    },
    {
      image: 'https://i.ibb.co/x3P3bsq/e4b654e7de1ac596c31da4b9f1994793.png',
      title: 'Canon camera black, 100x zoom',
      price: '$9.99',
    },
    {
      image: 'https://i.ibb.co/JrbGhMD/b66e289400004efec8d3c212c576efd7.png',
      title: 'Headset for gaming with mic',
      price: '$8.99',
    },
    {
      image: 'https://i.ibb.co/yX1mWQg/1ebac249f8cba9ff49b0a3c5c89dfbc7.png',
      title: 'Smartwatch silver color modern',
      price: '$10.30',
    },
    {
      image: 'https://i.ibb.co/1fsSM8W/db935c4b51e951193ddd1064f61e7b77.png',
      title: 'Blue wallet for men leather metarial',
      price: '$10.30',
    },
    {
      image: 'https://i.ibb.co/JrbGhMD/b66e289400004efec8d3c212c576efd7.png',
      title: 'Jeans bag for travel for men',
      price: '$80.95',
    },
  ];
const ProductsCard = () => {

  const [products, setProducts] = useState([]);


  useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.app/addProducts')
            .then(res => setProducts(res.data))
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='max-w-[1400px] mx-auto my-8 px-4 lg:px-0'>
        <h2 className='text-2xl font-bold mb-6'>Recommended items</h2>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {products.slice(0,10).map((item, index) => (
            <div key={index} className='bg-white border rounded-lg p-4 flex flex-col justify-between'>
              <img className='w-full h-40 object-contain mb-4' src={item.product_image} alt={item.productName} />
              <Link to={`/productDetails/${item._id}`}>
              <div>
                <p className='text-lg font-semibold'>${item.price}</p>
                <p className='text-gray-500'>{item.productName}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ProductsCard;