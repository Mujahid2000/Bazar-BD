import React from 'react';
import CardTimer from './CardTimer';
import { Link } from 'react-router-dom';


const cardsData = [
  {
    image: 'https://i.ibb.co/yybW9MG/image-23.png',
    title: 'Mobile',
    discount: '-25%',
  },
  {
    image: 'https://i.ibb.co/FxsKkRJ/image-28.png',
    title: 'Laptop',
    discount: '-15%',
  },
  {
    image: 'https://i.ibb.co/JqWDSjK/image-29.png',
    title: 'GoPro cameras',
    discount: '-40%',
  },
  {
    image: 'https://i.ibb.co/gt2pxKW/image-34.png',
    title: 'Headphones',
    discount: '-25%',
  },
  {
    image: 'https://i.ibb.co/VYpYQMw/image-35.png',
    title: 'Canon cameras',
    discount: '-25%',
  },
];

const DiscountCard = () => {
  return (
    <div className='max-w-[1400px] mt-[1.8rem] px-10 lg:px-0 bg-white rounded-xl mx-auto flex flex-col lg:flex-row justify-between pl'>
      <CardTimer /> 
      <div className={`w-[21.9rem] mx-auto  lg:w-auto scroll-m-1 overflow-x-auto px-auto lg:px-1 flex lg:gap-4 rounded-r-xl lg:border lg:border-t lg:border-b lg:border-l place-items-center`}>
        {cardsData.map((item, index) => (
          <div key={index} className={`w-[14rem] h-[14rem] flex flex-col justify-between items-center lg:border-r ${index === 4 ? 'lg:border-r-0' : ''} py-4 px-4`}>
            <img className="w-[8rem] h-[6] lg:h-[8rem] mx-auto py-3" src={item.image} alt={item.title} />
            <Link to={`categoryPage/${item?.title}`}>
            <div className="px-2 lg:py-1 flex flex-col items-center">
              <h2 className="font-bold pb-3 text-center text-xs lg:text-[1.25rem]">{item.title}</h2>
              <div className='w-[4rem] rounded-full text-center bg-red-200 mx-auto'>
                <p className="text-red-500 font-bold text-center text-[1rem]">
                  {item.discount}
                </p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCard;
