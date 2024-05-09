import React from "react";
import { FaStar, FaRegStarHalf } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Rating = ({ stars }) => {
    const renderStar = (index) => {
        const number = index + 0.5;
        if (stars >= index + 1) {
            return <FaStar className="text-orange-500" key={index} />;
        } else if (stars > number) {
            return <FaRegStarHalf className="text-orange-500" key={index} />;
        } else {
            return <CiStar className="text-orange-500" key={index} />;
        }
    };

    return (
        <div className="grid grid-cols-5 mb-1 w-24 ">
            {[...Array(5)].map((_, index) => renderStar(index))}
        </div>
    );
};

export default Rating;
