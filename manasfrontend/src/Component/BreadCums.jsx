import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import defaultBg from "../assets/about-hero-bg.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const BreadCrumbs = ({ items, headText, image }) => {
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  const bgImage = image || defaultBg;

  return (
    <div
      className="relative flex flex-col items-center justify-center pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-32 lg:pb-24 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
      data-aos="fade-in"
    >
      {/* Crisp, clear overlay without blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55 z-10" />

      {/* Decorative Top & Bottom Accents */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 z-20" />

      {/* Heading with Brilliant Contrast */}
      <h1
        className="!text-white text-3xl sm:text-4xl md:text-5xl font-serif font-black text-center relative z-20 px-4 mb-3 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        data-aos="fade-up"
      >
        {headText}
      </h1>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center flex-wrap justify-center relative z-20 space-x-1 sm:space-x-2 px-4 text-xs sm:text-sm md:text-base font-medium">
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-teal-300 flex items-center mx-1">
                <MdKeyboardArrowRight className="text-base sm:text-lg" />
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-teal-100 hover:text-white transition-colors underline-offset-4 hover:underline"
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-emerald-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20 shadow-xs"
                data-aos="fade-right"
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default BreadCrumbs;
