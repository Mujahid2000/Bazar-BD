import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";



const Banner = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const images = [
        'https://i.ibb.co/R73SvS6/Banner-1.jpg',
        'https://i.ibb.co/kBqr5jK/Banner2.jpg',
        'https://i.ibb.co/XYjCGWB/Banner3.jpg',
    ];

    const pervSlide = () => {
        setSliderIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setSliderIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative overflow-hidden mt-16 md:mt-10 lg:mt-20 z-20">
            <div className="allImage flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img key={index} className="w-full" src={image} alt={`Slide ${index + 1}`} />
                ))}
            </div>
            <button onClick={pervSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-3 py-2 mx-1 text-white rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300"><IoIosArrowBack />
</button>
            <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-3 py-2 mx-1 text-white rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-300"><IoIosArrowForward />
</button>
        </div>
    );
};

export default Banner;
