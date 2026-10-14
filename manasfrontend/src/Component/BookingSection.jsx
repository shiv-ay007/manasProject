import React, { useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiArrowRight, FiPhoneCall } from 'react-icons/fi';
import { RiHospitalFill } from 'react-icons/ri';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BookApointement from './BookApointement';

const BookNowSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-[#eaf6f2] via-[#f4faf8] to-[#edf7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* CTA Ribbon Container - seamlessly integrated with page background */}
        <div
          className="relative py-2"
          data-aos="fade-up"
        >

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Left Column: 3D Icon + Heading + Subtitle */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 flex-1">
              
              {/* 3D Medical Cross Badge */}
              <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00B771]/20 via-[#48d8a3]/25 to-white blur-sm" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#00B771] to-[#0ea5e9] shadow-[0_8px_20px_rgba(0,183,113,0.35)] flex items-center justify-center text-white border-2 border-white">
                  <span className="text-2xl sm:text-3xl font-black drop-shadow">+</span>
                </div>
              </div>

              {/* Text Block */}
              <div className="flex-1">
                {/* Status Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#0e6b56] text-xs font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#00B771] animate-pulse" />
                  <span>OPD &amp; Surgical Consultations Available</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-serif font-bold text-[#112340] leading-snug tracking-tight">
                  Book Your <span className="text-[#00B771]">Consultation Today</span>
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-[0.92rem] text-gray-500 mt-1 font-medium">
                  with Dr. Manas Aggarwal at Chandan Hospital, Lucknow.
                </p>
              </div>

            </div>

            {/* Right Column: CTA Button + Helpline Hotline */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shrink-0 w-full sm:w-auto justify-center">
              
              {/* Vibrant Green Request a Callback Button */}
              <BookApointement>
                <button
                  type="button"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#00b26b] to-[#00B771] hover:from-[#009e5f] hover:to-[#00a867] text-white font-serif font-bold text-sm sm:text-[0.95rem] rounded-2xl shadow-[0_8px_22px_rgba(0,183,113,0.35)] hover:shadow-[0_12px_28px_rgba(0,183,113,0.48)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border border-white/20 cursor-pointer w-full sm:w-auto overflow-hidden"
                >
                  <FaCalendarAlt className="text-sm shrink-0" />
                  <span className="whitespace-nowrap">Request a Callback</span>
                  <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
                </button>
              </BookApointement>

              {/* Immediate Help Call Link */}
              <a
                href="tel:+918318208837"
                className="group flex items-center gap-3 text-left transition-transform duration-300 hover:scale-105"
              >
                {/* Circular Mint Phone Icon Button */}
                <div className="w-11 h-11 rounded-full bg-[#dcf4ed] group-hover:bg-[#00B771] group-hover:text-white text-[#00B771] flex items-center justify-center transition-colors duration-300 shadow-sm shrink-0">
                  <FiPhoneCall className="text-base" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.72rem] text-gray-500 font-semibold tracking-wide">
                    Immediate Help? Call:
                  </span>
                  <span className="text-sm sm:text-[0.95rem] font-extrabold text-[#112340] group-hover:text-[#00B771] transition-colors leading-tight">
                    +91-8318208837
                  </span>
                </div>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default BookNowSection;
