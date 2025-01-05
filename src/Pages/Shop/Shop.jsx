import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Rating from "../Result/Rating";
import { Search } from "lucide-react";
import BrandCard from "./BrandCard";

const ShopSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-48 w-full rounded-lg"></div>
    <div className="mt-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
);

const Shop = () => {
  const [shop, setShop] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [topShop, setTopShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://postgre-server.vercel.app/shop')
      .then(res => {
        const topRatedShops = res.data.data.filter(shop => shop.rating >= 4.0);
        setTopShop(topRatedShops);
        if(searchQuery === null){
          setShop(res.data.data);
          setSearchQuery(res.data.data);
        } else {
          const filter = res.data.data.filter((item) => 
            item.shopname.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchQuery(filter);
        }
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search The Shops"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center mb-16">
          {loading ? (
            // Skeleton loading for main grid
            Array(8).fill(null).map((_, index) => (
              <div key={index} className="w-full">
                <ShopSkeleton />
              </div>
            ))
          ) : (
            searchQuery && Array.isArray(searchQuery) && searchQuery.map((brand, index) => (
              <BrandCard key={index} name={brand.shopname} imageUrl={brand.shoppicture} />
            ))
          )}
        </div>

        {/* Popular Brands Section */}
        <div className="bg-[#F4F5F3] py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-500 uppercase tracking-wide">POPULAR</p>
                <h2 className="text-2xl font-bold mt-1">Brands_to_follow</h2>
              </div>
              <button className="text-red-500 flex items-center gap-2 hover:text-red-600 transition-colors">
                VIEW_MORE
                <span className="text-lg">→</span>
              </button>
            </div>

            {/* Brands Slider */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {loading ? (
                // Skeleton loading for popular brands
                Array(5).fill(null).map((_, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg">
                    <div className="animate-pulse bg-gray-200 h-24 w-full rounded"></div>
                  </div>
                ))
              ) : (
                topShop && Array.isArray(topShop) && topShop.map((brand, index) => (
                  <Link to={`/shopDetail/${brand.shopname}`} key={index} className="bg-white p-6 rounded-lg flex items-center justify-center">
                    <img 
                      src={brand.shoppicture} 
                      alt={`Brand ${index + 1}`} 
                      className="max-w-full max-h-24 object-contain" 
                    />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;