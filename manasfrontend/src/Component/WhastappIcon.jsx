import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/918318208837?text=Hello%20Dr.%20Manas%20Aggarwal%2C%20I%20would%20like%20to%20consult."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl fab-whatsapp-pulse hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <span className="fab-wiggle inline-flex items-center justify-center">
        <FaWhatsapp className="text-3xl text-white" />
      </span>
    </a>
  );
};

export default WhatsAppIcon;
