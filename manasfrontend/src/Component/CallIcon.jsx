import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const CallIcon = () => {
  return (
    <a
      href="tel:+918318208837"
      aria-label="Call Dr. Manas Aggarwal"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#00B771] text-white rounded-full shadow-2xl fab-call-pulse hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <span className="fab-wiggle inline-flex items-center justify-center">
        <FaPhoneAlt className="text-xl text-white" />
      </span>
    </a>
  );
};

export default CallIcon;
