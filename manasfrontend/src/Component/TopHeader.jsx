import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TopHeader = () => {
  return (
    <div className="hidden md:block bg-gradient-to-r from-[#CAEDE7] via-[#D7F2EE] to-[#CAEDE7] text-gray-800 border-b border-[#a8d8d0] shadow-sm overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-2">
        <div className="flex flex-row items-center justify-between gap-3 lg:gap-6 min-w-0">
          
          {/* Phone */}
          <a
            href="tel:+918318208837"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5 shrink-0"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-600/10 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              <FaPhoneAlt className="text-[0.7rem]" />
            </span>
            <span className="text-sm lg:text-[0.85rem] font-medium tracking-wide whitespace-nowrap">
              +91-8318208837
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:aggarwal.manas@gmail.com"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5 shrink-0"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-600/10 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              <FaEnvelope className="text-[0.7rem]" />
            </span>
            <span className="text-sm lg:text-[0.85rem] font-medium tracking-wide whitespace-nowrap">
              aggarwal.manas@gmail.com
            </span>
          </a>

          {/* Address */}
          <Link
            to="https://www.google.com/maps/dir//Dr+Manas+Aggarwal+-+Best+Gastroenterologist+Gomti+Nagar+Lucknow"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:-translate-y-0.5 min-w-0 shrink"
          >
            <span className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-teal-600/10 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
              <FaMapMarkerAlt className="text-[0.7rem]" />
            </span>
            <span className="text-xs sm:text-sm lg:text-[0.85rem] font-medium tracking-wide truncate">
              Chandan Hospital, Vijayant Khand, Gomti Nagar, Lucknow, UP – 226010
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;