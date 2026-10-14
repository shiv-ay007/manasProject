import React from "react";
import { Link } from "react-router-dom";
import { IoMailOutline, IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import companyLogo from "../assets/cclogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/drmanasaggarwal",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/drmanasaggarwal",
      label: "Instagram",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@DrManasAggarwal",
      label: "YouTube",
    },
  ];

  const treatments = [
    { path: "/treatment/gallbladder/gallbladderstones", label: "Gallbladder Stones" },
    { path: "/treatment/hernia/Inguinalhernial", label: "Hernia" },
    { path: "/treatment/stomach-cancer/polyps", label: "Stomach Cancer" },
    { path: "/treatment/pancreas/pancreaticcancer", label: "Pancreas Cancer" },
    { path: "/treatment/intestine/obstruction", label: "Intestinal Diseases" },
    { path: "/treatment/liver/livercancer", label: "Liver Cancer" },
  ];

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/about-dr-manas-aggarwal", label: "About Us" },
    { path: "/cases", label: "Cases" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="relative bg-[#021824] text-white overflow-hidden">
      {/* Background artwork: glows, curves & anatomical line-art */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glows */}
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-[#0c516b]/35 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-[#084257]/30 rounded-full blur-[85px]" />

        {/* Anatomical Stomach Outline in Teal */}
        <svg
          className="absolute left-[13%] top-1/2 -translate-y-1/2 w-[340px] md:w-[400px] h-auto text-[#00c9a7]/[0.08] pointer-events-none select-none"
          viewBox="0 0 400 450"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M 200,20 C 200,60 195,80 185,110 C 170,140 130,150 115,180 C 95,220 110,270 150,290 C 190,310 230,285 240,250 C 250,215 235,185 210,180 C 190,175 180,185 180,195" />
          <path d="M 235,260 C 255,275 260,310 240,335 C 220,360 180,355 160,340 C 140,325 125,345 135,370 C 145,395 185,410 220,400 C 260,390 280,350 270,320" />
          <path d="M 140,210 C 155,240 185,255 215,245" strokeDasharray="3 3" />
          <path d="M 125,240 C 140,270 170,285 200,275" strokeDasharray="3 3" />
        </svg>

        {/* Curved Swooshes */}
        <svg
          className="absolute inset-0 w-full h-full text-[#0ea5e9]/[0.12] pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 400"
          fill="none"
        >
          <path
            d="M-50,260 C320,120 720,360 1490,160"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M-50,320 C420,180 820,400 1490,230"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M-50,180 C360,60 920,290 1490,90"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Dots Matrix */}
        <div
          className="absolute top-10 left-6 w-32 h-24 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #38bdf8 1.5px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute bottom-10 left-1/3 w-32 h-20 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #38bdf8 1.5px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute top-10 right-1/4 w-28 h-28 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #38bdf8 1.5px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* Main Footer Columns - Compact and well-proportioned */}
      <div className="relative pt-8 pb-5 md:pt-10 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
            
            {/* Column 1: Doctor Profile & Contacts */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 font-serif">
                  Dr. Manas Aggarwal
                </h3>
                <p className="text-[0.7rem] sm:text-[0.74rem] font-semibold text-[#00c9a7] tracking-wider uppercase mb-4">
                  MBBS, MS, MCH — SURGICAL GASTROENTEROLOGY
                </p>

                {/* Contact List */}
                <div className="space-y-2.5">
                  {/* Email */}
                  <a
                    href="mailto:aggarwal.manas@gmail.com"
                    className="group flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#083547] border border-[#125873] flex items-center justify-center text-[#00c9a7] group-hover:bg-[#00c9a7] group-hover:text-[#021824] group-hover:border-[#00c9a7] transition-all duration-300 shrink-0 shadow-sm">
                      <IoMailOutline className="text-sm" />
                    </div>
                    <span className="text-xs sm:text-[0.84rem] text-gray-200 group-hover:text-white font-normal break-all">
                      aggarwal.manas@gmail.com
                    </span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918318208837"
                    className="group flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#083547] border border-[#125873] flex items-center justify-center text-[#00c9a7] group-hover:bg-[#00c9a7] group-hover:text-[#021824] group-hover:border-[#00c9a7] transition-all duration-300 shrink-0 shadow-sm">
                      <IoCallOutline className="text-sm" />
                    </div>
                    <span className="text-xs sm:text-[0.84rem] text-gray-200 group-hover:text-white font-normal">
                      +91-8318208837
                    </span>
                  </a>

                  {/* Address */}
                  <a
                    href="https://www.google.com/maps/dir//Dr+Manas+Aggarwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-gray-200 hover:text-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#083547] border border-[#125873] flex items-center justify-center text-[#00c9a7] group-hover:bg-[#00c9a7] group-hover:text-[#021824] group-hover:border-[#00c9a7] transition-all duration-300 shrink-0 shadow-sm mt-0.5">
                      <IoLocationOutline className="text-sm" />
                    </div>
                    <span className="text-xs sm:text-[0.84rem] text-gray-200 group-hover:text-white font-normal leading-relaxed">
                      Chandan Hospital, Faizabad Rd, Gomti Nagar, Lucknow, Uttar Pradesh
                    </span>
                  </a>
                </div>
              </div>

              {/* Follow Us with line above */}
              <div className="mt-4 pt-3.5 border-t border-white/10 max-w-xs">
                <p className="text-[0.64rem] tracking-[0.2em] uppercase font-bold text-gray-400 mb-2">
                  FOLLOW US
                </p>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 rounded-full bg-[#083547] border border-[#125873] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#00c9a7] hover:border-[#00c9a7] transition-all duration-300 text-xs shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Our Treatments */}
            <div className="lg:col-span-3">
              <div className="mb-3.5">
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide inline-block relative pb-1.5">
                  Our Treatments
                  <span className="absolute bottom-0 left-0 w-8 h-[2.5px] bg-[#00c9a7] rounded-full" />
                </h4>
              </div>
              <ul className="space-y-2">
                {treatments.map((t) => (
                  <li key={t.path}>
                    <Link
                      to={t.path}
                      className="group flex items-center text-xs sm:text-[0.84rem] text-gray-300 hover:text-[#00c9a7] transition-colors duration-200"
                    >
                      <FiChevronRight className="mr-1.5 text-[#00c9a7] text-xs group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                      <span>{t.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Quick Links & Admin Login */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="mb-3.5">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-wide inline-block relative pb-1.5">
                    Quick Links
                    <span className="absolute bottom-0 left-0 w-8 h-[2.5px] bg-[#00c9a7] rounded-full" />
                  </h4>
                </div>
                <ul className="space-y-2">
                  {quickLinks.map((ql) => (
                    <li key={ql.path}>
                      <Link
                        to={ql.path}
                        className="group flex items-center text-xs sm:text-[0.84rem] text-gray-300 hover:text-[#00c9a7] transition-colors duration-200"
                      >
                        <FiChevronRight className="mr-1.5 text-[#00c9a7] text-xs group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                        <span>{ql.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Admin Login Button matching reference */}
              <div className="mt-4">
                <a
                  href="https://admin.drmanasaggarwal.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#00c9a7] text-[#00c9a7] hover:bg-[#00c9a7] hover:text-[#021824] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_10px_rgba(0,201,167,0.15)]"
                >
                  <span>ADMIN LOGIN</span>
                  <FiChevronRight className="text-xs" />
                </a>
              </div>
            </div>

            {/* Column 4: Find Us / Map */}
            <div className="lg:col-span-3">
              <div className="mb-3.5">
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide inline-block relative pb-1.5">
                  Find Us
                  <span className="absolute bottom-0 left-0 w-8 h-[2.5px] bg-[#00c9a7] rounded-full" />
                </h4>
              </div>

              {/* Map Card */}
              <div className="relative w-full h-[170px] sm:h-[185px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-slate-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d113885.84461201355!2d81.02269!3d26.873881!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfb781a8e1edf%3A0xbb68c9fe3bbab90b!2sDr%20Manas%20Aggarwal%20-%20Best%20Gastroenterologist%20Gomti%20Nagar%20Lucknow%20%7C%20Gastroenterology%20Cancer%20Surgeon%20Lucknow%20%26%20Piles%20Specialist!5e0!3m2!1sen!2sin!4v1741692066085!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Dr. Manas Aggarwal Location Map"
                />
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Developer Credit Strip - Enhanced Visibility & Bigger Logo/Text */}
      <div className="bg-[#0b4860] py-3.5 border-t border-[#125c7a] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm font-medium text-white tracking-wide gap-2 sm:gap-2.5">
          <p>
            Copyright © {currentYear} Dr. Manas Aggarwal || All Rights Reserved ||
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/95">Designed by</span>
            <Link
              to="https://www.codecrafter.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              <img
                src={companyLogo}
                alt="CodeCrafter Web Solutions"
                className="h-6 sm:h-7 md:h-8 w-auto object-contain brightness-0 invert inline-block drop-shadow-sm"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;