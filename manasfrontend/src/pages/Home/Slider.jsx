import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import sliderHospitalBuilding from '../../assets/slider/chandan-hospital-building.webp';
import sliderHospitalIcu from '../../assets/slider/chandan-hospital-icu.webp';
import sliderHospitalPharmacy from '../../assets/slider/chandan-hospital-pharmacy.webp';
import doctorPic from '../../assets/doctor.webp';
import slider1 from '../../assets/slider-rename/appointment-1.png';
import slider2 from '../../assets/slider-rename/diets.png';
import slider3 from '../../assets/slider-rename/doctor-1.png';
import { FiChevronRight } from 'react-icons/fi';
import { FaCheckCircle, FaUserMd } from 'react-icons/fa';
import pattern from '../../assets/whywechoose.png';

const slides = [
  {
    image: sliderHospitalBuilding,
    alt: "Chandan Hospital Lucknow - Dr. Manas Aggarwal Surgical Gastroenterology",
    badge: "Chandan Hospital, Lucknow",
    subBadge: "Dr. Manas Aggarwal",
    title: "Premier Surgical Gastroenterology & GI Care Center",
    description: "Multi-speciality tertiary care hospital equipped with cutting-edge laparoscopic infrastructure for complex liver, pancreas, and GI surgeries.",
    link: "https://chandanhospital.in/doctor/dr-manas-aggarwal",
    actionText: "Book Appointment Online",
    doctorTag: "19+ Yrs Exp",
  },
  {
    image: sliderHospitalIcu,
    alt: "Advanced Critical Care & ICU Infrastructure - Chandan Hospital",
    badge: "State-of-the-Art Critical Care",
    subBadge: "24x7 Surgical Support",
    title: "Advanced High-Dependency & Post-Operative ICU Care",
    description: "Modern intensive care units with real-time continuous monitoring, ensuring rapid, safe, and sterile recovery for surgical patients.",
    link: "https://chandanhospital.in/doctor/dr-manas-aggarwal",
    actionText: "Schedule Consultation",
    doctorTag: "90%+ Keyhole",
  },
  {
    image: sliderHospitalPharmacy,
    alt: "Round-the-Clock Pharmacy & Diagnostic Services - Chandan Hospital Lucknow",
    badge: "24x7 In-House Facilities",
    subBadge: "Emergency & Diagnostics",
    title: "Comprehensive OPD, Diagnostic & 24x7 Pharmacy Services",
    description: "Complete in-house clinical support with streamlined patient registration, diagnostic imaging, and 24x7 emergency medical assistance.",
    link: "https://chandanhospital.in/doctor/dr-manas-aggarwal",
    actionText: "Book Appointment Online",
    doctorTag: "100+ Procedures",
  },
];

const HomeSlider = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  // Slider settings
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="relative w-full mx-auto h-fit pt-[68px] lg:pt-[76px]">
      {/* Slider */}
      <Slider {...settings} className="hero-slider relative w-full overflow-hidden">
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full outline-none">
            <div className="relative w-full h-[calc(100vh-76px)] min-h-[440px] max-h-[540px] sm:max-h-[560px] lg:max-h-[590px] xl:max-h-[620px] overflow-hidden select-none">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-[center_25%] select-none"
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "low"}
                decoding={idx === 0 ? "sync" : "async"}
                width="1376"
                height="768"
              />

              {/* Gentle readability overlay on text side - keeping hospital background bright and clear */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-transparent flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between">
                  {/* Left: Text & CTA */}
                  <div className="max-w-xl lg:max-w-2xl text-white z-10 py-4">
                    {/* Mobile Doctor Pill (ONLY on Slide 0) */}
                    {idx === 0 && (
                      <div className="flex md:hidden items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/25 mb-2.5 w-fit shadow-xs">
                        <img
                          src={doctorPic}
                          alt="Dr. Manas Aggarwal"
                          className="w-7 h-7 rounded-full object-cover object-top border border-emerald-400 bg-white"
                          loading="eager"
                          width="28"
                          height="28"
                        />
                        <div className="leading-tight">
                          <p className="text-[11px] font-bold text-white flex items-center gap-1">
                            Dr. Manas Aggarwal
                            <FaCheckCircle className="text-emerald-400 text-[9px]" />
                          </p>
                          <p className="text-[9px] text-emerald-200">MCh Surgical GI Specialist • Chandan Hospital</p>
                        </div>
                      </div>
                    )}

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 text-xs sm:text-sm font-medium backdrop-blur-sm mb-2 sm:mb-3 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{slide.badge}</span>
                      <span className="text-white/40 hidden sm:inline">•</span>
                      <span className="text-gray-200 hidden sm:inline">{slide.subBadge}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.65rem] font-serif font-bold text-white leading-tight drop-shadow-md">
                      {slide.title}
                    </h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-200 max-w-lg leading-relaxed drop-shadow line-clamp-2 sm:line-clamp-3">
                      {slide.description}
                    </p>

                    <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={activeSlide === idx ? 0 : -1}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs sm:text-sm font-serif font-semibold shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{slide.actionText}</span>
                        <span>→</span>
                      </a>
                      <Link
                        to="/about-dr-manas-aggarwal"
                        tabIndex={activeSlide === idx ? 0 : -1}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-serif font-medium border border-white/25 backdrop-blur-sm transition-colors"
                      >
                        <span>About Dr. Manas</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right: Dr. Manas Aggarwal (ONLY on Slide 0 - Hospital Building) */}
                  {idx === 0 && (
                    <div className="hidden md:flex flex-col items-center justify-end h-full relative z-10 shrink-0 self-end pr-2 xl:pr-6 pointer-events-none pb-2 sm:pb-3 lg:pb-4">
                      {/* Subtle aura lighting behind doctor */}
                      <div className="absolute bottom-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

                      <div className="relative h-[310px] sm:h-[350px] md:h-[390px] lg:h-[430px] xl:h-[470px] flex items-end">
                        <img
                          src={doctorPic}
                          alt="Dr. Manas Aggarwal - Senior Gastrosurgeon Chandan Hospital"
                          className="h-full w-auto object-contain object-bottom select-none filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)] pointer-events-auto"
                          loading="eager"
                          fetchPriority="high"
                          width="896"
                          height="1075"
                        />

                        {/* Floating Glassmorphism Doctor Badge */}
                        <div className="pointer-events-auto absolute bottom-3 sm:bottom-4 -left-6 lg:-left-9 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-[0_10px_24px_rgba(0,0,0,0.25)] border border-teal-100 text-slate-800 min-w-[190px] max-w-[215px]">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                              <FaUserMd />
                            </div>
                            <div className="leading-tight">
                              <h4 className="font-extrabold text-[0.8rem] text-slate-900 flex items-center gap-1">
                                Dr. Manas Aggarwal
                                <FaCheckCircle className="text-emerald-500 text-[10px]" />
                              </h4>
                              <p className="text-[9.5px] font-semibold text-teal-700 mt-0.5">
                                MCh (Surg. Gastroenterology)
                              </p>
                            </div>
                          </div>
                          <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[9px]">
                            <span className="text-gray-500 font-medium">Chandan Hospital</span>
                            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                              19+ Yrs Exp
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Cards Positioned Below the Slider - Premium Modern Look */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-20 my-10 sm:my-12 lg:my-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          
          {/* Card 1: Book Appointment (Teal Theme) */}
          <a
            href="https://chandanhospital.in/doctor/dr-manas-aggarwal"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full bg-[#f2fcf8] hover:bg-white rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,183,113,0.08)] hover:shadow-[0_12px_32px_rgba(0,183,113,0.18)] border border-[#cceee2] overflow-hidden cursor-pointer"
          >
            {/* Background Decorative Soft Waves */}
            <div className="absolute right-0 bottom-0 w-36 h-36 bg-gradient-to-tl from-[#00B771]/20 via-[#48d8a3]/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-8 -mb-8 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#daf5eb]/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-3.5">
              {/* Left 3D Icon */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center filter drop-shadow-[0_6px_10px_rgba(0,183,113,0.22)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={slider1}
                  alt="Book Appointment"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Middle Content */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-serif font-extrabold text-[1.12rem] sm:text-[1.2rem] text-[#112340] group-hover:text-[#00B771] transition-colors leading-tight">
                  Book Appointment
                </h3>
                <p className="text-gray-500 text-xs sm:text-[0.82rem] mt-1.5 leading-snug">
                  Easily schedule your visit online and manage your health.
                </p>
              </div>

              {/* Right Circular Arrow Button */}
              <div className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#00B771] text-white shadow-[0_4px_12px_rgba(0,183,113,0.4)] group-hover:bg-[#009b60] group-hover:scale-110 transition-all duration-300">
                <FiChevronRight className="text-xl sm:text-2xl group-hover:translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </div>
            </div>
          </a>

          {/* Card 2: Explore Our Cases (Blue Theme) */}
          <Link
            to="/cases"
            className="group relative block w-full bg-[#f2f8fe] hover:bg-white rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(20,130,230,0.08)] hover:shadow-[0_12px_32px_rgba(20,130,230,0.18)] border border-[#cfe5fc] overflow-hidden cursor-pointer"
          >
            {/* Background Decorative Soft Waves */}
            <div className="absolute right-0 bottom-0 w-36 h-36 bg-gradient-to-tl from-[#1982ea]/20 via-[#60a8f8]/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-8 -mb-8 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#ddecfe]/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-3.5">
              {/* Left 3D Icon */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center filter drop-shadow-[0_6px_10px_rgba(25,130,234,0.22)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={slider2}
                  alt="Explore Our Cases"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Middle Content */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-serif font-extrabold text-[1.12rem] sm:text-[1.2rem] text-[#112340] group-hover:text-[#1982ea] transition-colors leading-tight">
                  Explore Our Cases
                </h3>
                <p className="text-gray-500 text-xs sm:text-[0.82rem] mt-1.5 leading-snug">
                  Discover how we help our patients with personalized treatments.
                </p>
              </div>

              {/* Right Circular Arrow Button */}
              <div className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1982ea] text-white shadow-[0_4px_12px_rgba(25,130,234,0.4)] group-hover:bg-[#126ec9] group-hover:scale-110 transition-all duration-300">
                <FiChevronRight className="text-xl sm:text-2xl group-hover:translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* Card 3: Contact Us (Warm Orange Theme) */}
          <Link
            to="/contact"
            className="group relative block w-full bg-[#fff8f2] hover:bg-white rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(242,106,15,0.08)] hover:shadow-[0_12px_32px_rgba(242,106,15,0.18)] border border-[#fedec7] overflow-hidden cursor-pointer"
          >
            {/* Background Decorative Soft Waves */}
            <div className="absolute right-0 bottom-0 w-36 h-36 bg-gradient-to-tl from-[#f26a0f]/20 via-[#fa9a55]/10 to-transparent rounded-full blur-2xl pointer-events-none -mr-8 -mb-8 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#feeade]/60 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-3.5">
              {/* Left 3D Icon */}
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center filter drop-shadow-[0_6px_10px_rgba(242,106,15,0.22)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={slider3}
                  alt="Contact Us"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Middle Content */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="font-serif font-extrabold text-[1.12rem] sm:text-[1.2rem] text-[#112340] group-hover:text-[#f26a0f] transition-colors leading-tight">
                  Contact Us
                </h3>
                <p className="text-gray-500 text-xs sm:text-[0.82rem] mt-1.5 leading-snug">
                  Get in touch with our team for immediate assistance.
                </p>
              </div>

              {/* Right Circular Arrow Button */}
              <div className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f26a0f] text-white shadow-[0_4px_12px_rgba(242,106,15,0.4)] group-hover:bg-[#d65705] group-hover:scale-110 transition-all duration-300">
                <FiChevronRight className="text-xl sm:text-2xl group-hover:translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
