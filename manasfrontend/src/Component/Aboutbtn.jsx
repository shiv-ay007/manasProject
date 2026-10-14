import React from 'react';
import { Link } from 'react-router-dom';

const BlueBtn = ({ text, to }) => {
  return (
    <Link
      to={to}
      target="_blank"
      className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 ease-in-out bg-[#4f6f8f] rounded-full shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#4f6f8f] overflow-hidden group"
    >
      {/* Outer Border Effect on Hover */}
      <span
        className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full transition-all duration-500 ease-out group-hover:border-white"
      ></span>

      {/* Glowing Background Effect */}
      <span className="absolute inset-0 w-full h-full bg-[#559cda] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 blur-lg"></span>

      {/* Inner Shine Effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white to-transparent opacity-10 rounded-full group-hover:opacity-20 group-hover:animate-shine"></span>

      {/* Button Text */}
      <span className="relative z-10 text-lg tracking-wide">{text}</span>
    </Link>
  );
};

export default BlueBtn;
