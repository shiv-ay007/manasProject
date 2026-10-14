import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import pattern1 from "../assets/newletter/pattern-7.png";
import letterBg from "../assets/newletter/newletter.png";

const Newsletter = () => {
  return (
    <div className="relative py-8 sm:py-10 md:py-16 bg-cover bg-center bg-no-repeat bg-blue-100 flex items-center justify-center">
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${pattern1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          width: "100%",
        }}
      ></div>

      {/* Main content container */}
      <div className="relative z-10 bg-white w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-8 md:py-10 rounded-lg shadow-xl space-y-6 md:space-y-0">
        
        {/* Left Section - Text */}
        <div className="md:w-1/2 w-full text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
            Latest Updates
          </h2>
          <p className="text-blue-700 mt-2 text-sm sm:text-base md:text-lg">
            Subscribe to our newsletter and stay updated.
          </p>
        </div>

        {/* Right Section - Input and Button */}
        <div className="md:w-1/2 w-full flex justify-end">
          <div className="flex items-center w-full max-w-lg">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-3 sm:p-4 pl-12 pr-16 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{
                backgroundImage: `url(${letterBg})`,
                backgroundPosition: "left 10px center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <button className="absolute right-0 top-0 bottom-0 bg-red-500 text-white p-3 md:p-4 rounded-r-lg hover:bg-red-600 flex items-center justify-center">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
