import React from 'react';
import companyLogo from "../assets/cclogo.png";
import { Link } from 'react-router-dom';

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#0b4860] py-2.5 border-t border-[#125c7a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-[0.84rem] text-white/90 gap-1.5 sm:gap-2">
        <p className="tracking-wide">
          Copyright © {currentYear} Dr. Manas Aggarwal || All Rights Reserved ||
        </p>
        <div className="flex items-center gap-2">
          <span>Designed by</span>
          <Link
            to="https://www.codecrafter.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-85 transition-opacity"
          >
            <img
              src={companyLogo}
              alt="CodeCrafter Web Solutions"
              className="h-5 sm:h-6 w-auto object-contain brightness-0 invert inline-block"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
