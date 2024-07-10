import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-8">
      <div className="container mx-auto px-20">
        <div className="flex flex-wrap justify-between">
          {/* Brand Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className='flex '>
            <img src="https://i.ibb.co/C1knfqQ/Screenshot-2024-06-29-180913-removebg-preview.png" alt="Brand Logo" className="mb-4 w-9 h-8" />
            <h3 className="text-sky-400 text-base lg:text-2xl font-bold">Brand</h3>
            </div>
            <p className="text-sm">
              We will provide you best service.
            </p>
            <div className="flex mt-4 space-x-2 lg:space-x-4">
              <p  aria-label="Facebook" className="text-gray-600 cursor-pointer text-xl hover:text-gray-900"><FaFacebook/></p>
              <p  aria-label="Twitter" className="text-gray-600 cursor-pointer text-xl hover:text-gray-900"><FaTwitter/></p>
              <p  aria-label="LinkedIn" className="text-gray-600 cursor-pointer text-xl hover:text-gray-900"><FaLinkedin/></p>
              <p  aria-label="Instagram" className="text-gray-600 cursor-pointer text-xl hover:text-gray-900"><FaInstagram/></p>
              <p  aria-label="YouTube" className="text-gray-600 cursor-pointer text-xl hover:text-gray-900"><FaYoutube/></p>
            </div>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-3/4 flex flex-wrap justify-between">
            <div className="w-1/2 md:w-1/5 mb-6 md:mb-0">
              <h5 className="font-bold mb-2">About</h5>
              <ul className="text-sm space-y-2">
                <li><p  className="hover:underline cursor-pointer">About Us</p></li>
                <li><p  className="hover:underline cursor-pointer">Find store</p></li>
                <li><p  className="hover:underline cursor-pointer">Categories</p></li>
                <li><p  className="hover:underline cursor-pointer">Blogs</p></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/5 mb-6 md:mb-0">
              <h5 className="font-bold mb-2">Partnership</h5>
              <ul className="text-sm space-y-2">
                <li><p href="#" className="hover:underline cursor-pointer">About Us</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Find store</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Categories</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Blogs</p></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/5 mb-6 md:mb-0">
              <h5 className="font-bold mb-2">Information</h5>
              <ul className="text-sm space-y-2">
                <li><p href="#" className="hover:underline cursor-pointer">Help Center</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Money Refund</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Shipping</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Contact us</p></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/5 mb-6 md:mb-0">
              <h5 className="font-bold mb-2">For users</h5>
              <ul className="text-sm space-y-2">
                <li><p href="#" className="hover:underline cursor-pointer">Login</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Register</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">Settings</p></li>
                <li><p href="#" className="hover:underline cursor-pointer">My Orders</p></li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/5 mb-6 md:mb-0">
              <h5 className="font-bold mb-2">Our App</h5>
              <ul className="text-sm space-y-2">
                <li><img src="https://i.ibb.co/FVZYBgX/Group.png" alt="" /></li>
                <li><img src="https://i.ibb.co/tXsFWh0/Group1.png" alt="" /></li>
                
              </ul>
            </div>
          </div>
        </div>
        
        {/* App Links */}
        <div className="mt-8 flex justify-between items-center border-t pt-4">
          <div className="flex space-x-4">
          © 2023 Brand.
          </div>
          <div className="text-sm">
            <p href="#" className="hover:underline cursor-pointer">English</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
