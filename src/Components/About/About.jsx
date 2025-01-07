import React from 'react';
import MetricsDashboard from './MetricsCard';
import Slider from './Slider';
import FeaturesSection from './Delivery';

const About = () => {
    return (
        <div className='max-w-7xl mx-auto pt-[11rem]'>
            <div className='flex flex-col lg:flex-row px-2 gap-10 items-center'>
                <div>
                    <h1 className='text-4xl py-5 font-bold'>Our Story</h1>
                    <p className='text-lg text-justify'>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                    <p className='text-lg py-3 text-justify'>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dhfqokxun/image/upload/v1736271256/Untitled-1_oxcjk1.jpg" alt="" />
                </div>
            </div>
            <MetricsDashboard/>
            <Slider/>
            <FeaturesSection/>
        </div>
    );
};

export default About;