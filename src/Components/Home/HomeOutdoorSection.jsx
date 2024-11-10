import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cardsData = [
  {
    image: 'https://i.ibb.co/5hs2FhT/rasm.png',
    title: 'Soft chairs',
    price: 'From USD 19',
  },
  {
    image: 'https://i.ibb.co/X546dSy/image-94.png',
    title: 'Table lamp',
    price: 'From USD 19',
  },
  {
    image: 'https://i.ibb.co/nPgLPnp/da0ec19b2f735896bd129bb83cae628f.png',
    title: 'Kitchen dishes',
    price: 'From USD 19',
  },
  {
    image: 'https://i.ibb.co/VYpYQMw/image-35.png',
    title: 'Smart watches',
    price: 'From USD 19',
  },
  {
    image: 'https://i.ibb.co/HPPhtrQ/d628afe6f0f52ecee5cf9460f0d0d69d.png',
    title: 'Kitchen mixer',
    price: 'From USD 100',
  },
  {
    image: 'https://www.proctorsilex.com/media/hub-products/53560-02.jpg',
    title: 'Blenders',
    price: 'From USD 39',
  },
  {
    image: 'https://i.ibb.co/0VdwYM0/ff34eb5b476f6a97fc3fde243beb9597.jpg',
    title: 'Home appliance',
    price: 'From USD 19',
  },
  {
    image: 'https://i.ibb.co/DzSPDcm/0c25ac335a1e2cc7d8d3584a3592fbbf.png',
    title: 'Coffee maker',
    price: 'From USD 10',
  },
];

const HomeOutdoorSection = () => {
  const [product, setProduct] = useState([]);


  useEffect(() => {
    axios.get('https://postgre-server.vercel.app/product')
        .then(res => {
            const filteredProducts = res.data.data.filter(product => product.shopname  === 'Kitchen Marvel');
            setProduct(filteredProducts);
        })
        .catch(error => console.error(error));
}, []);


  return (
    <div className='max-w-[1400px] mx-auto my-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3'>
        <div className='col-span-1 lg:col-span-1  rounded-lg  flex flex-col justify-between'>
          <div className='absolute p-12'>
            <h2 className='text-2xl text-[#1C1C1C] font-bold mb-4 text-center'>Home and   outdoor</h2>
            <button className='bg-white ml-14 text-black text-center font-semibold py-2 px-4 rounded shadow'>
              Source now
            </button>
          </div>
          <img
            className='rounded-l-md h-full w-full'
            src='https://i.ibb.co/kHfNGf4/image-92.png'
            alt='Home and outdoor'
          />
        </div>
        <div className='col-span-2 gap-y-4 lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 '>
          {product && product.slice(0, 8).map((item, index) => (
            <Link key={index} to={`/productDetails/${item.id}`}>
            <div
              className='bg-white border-r-md  py-3 px-7 flex flex-col items-center justify-between border'
            >
              <img
                className='w-28 h-28 object-contain mb-4'
                src={item.product_image}
                alt={item.productname}
              />
              <div className='text-center'>
                <h3 className='text-lg font-semibold'>{item.productname.slice(0,15)}</h3>
                <p className='text-gray-500'>${item.price}</p>
              </div>
            </div>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeOutdoorSection;
