import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { FiLinkedin } from 'react-icons/fi';

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        breakpoints={{
            640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },}}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true, 
          dynamicMainBullets: 3, 
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/gR6pkM9/Untitled-1-removebg-preview.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Tom Cruise</h3>
                <p className='text-base text-left '>Founder & Chairman</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/VjYvQZn/Untitled-1-removebg-preview-1.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Emma Watson</h3>
                <p className='text-base text-left '>Managing Director</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/pwbp3Vv/Untitled-1-removebg-preview-2.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Will Smith</h3>
                <p className='text-base text-left '>Product Designer</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/gR6pkM9/Untitled-1-removebg-preview.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Tom Cruise</h3>
                <p className='text-base text-left '>Founder & Chairman</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/VjYvQZn/Untitled-1-removebg-preview-1.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Emma Watson</h3>
                <p className='text-base text-left '>Managing Director</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
        <div>
                <img className='w-[320px] h-[350px] bg-gray-100 px-8 pt-3' src="https://i.ibb.co.com/pwbp3Vv/Untitled-1-removebg-preview-2.png" alt="" />
                <h3 className='text-2xl text-left py-1 font-bold'>Will Smith</h3>
                <p className='text-base text-left '>Product Designer</p>
                <div className='flex gap-5 py-1'>
                    <FaTwitter/>
                    <BsInstagram/>
                    <FiLinkedin/>

                </div>
            </div>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}
