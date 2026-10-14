import React from 'react';
import { Link } from 'react-router-dom';
import companylogo from '../assets/cclogo.png';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 py-3.5 px-6 border-t border-slate-200/90 shadow-sm mt-auto shrink-0">
      <div className="flex items-center justify-center gap-3.5 text-center flex-wrap">
        {/* Code Crafter Company Logo */}
        <Link
          to="https://www.codecrafter.co.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity"
          title="Developed by Code Crafter Web Solutions"
        >
          <img
            src={companylogo}
            alt="Developed by Code Crafter Web Solutions"
            className="h-6 md:h-7 w-auto object-contain brightness-0"
          />
        </Link>

        <span className="text-slate-300 font-light hidden sm:inline">|</span>

        {/* Centered Copyright Text */}
        <p className="text-xs md:text-sm font-medium text-slate-600">
          Copyright {new Date().getFullYear()}{' '}
          <span className="font-bold text-slate-800">
            Dr. Manas Aggarwal
          </span>{' '}
          || All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
