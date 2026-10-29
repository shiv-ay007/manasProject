import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import doctorCutout from '../../assets/doctor.png';
import clinicBg from '../../assets/slider/slider-hospital-lobby.jpg';

const patientAvatars = [
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    alt: 'Happy Patient 1',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    alt: 'Happy Patient 2',
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    alt: 'Happy Patient 3',
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    alt: 'Happy Patient 4',
  },
];

const HomeAbout = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#edf7f4] to-[#e4f4ee] py-14 sm:py-16 lg:py-20">
      {/* Prestigious Medical Ambient Lighting (No dots, clean & elegant) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-[#00B771]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#1CB6E6]/18 rounded-full blur-[130px]" />
        <div className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] bg-teal-200/20 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">

          {/* Left Side: Text, Credentials, Stats, CTA */}
          <div className="flex-1 lg:max-w-xl xl:max-w-2xl" data-aos="fade-right">
            
            {/* Category Tag with green dash */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
              <span className="text-[0.78rem] sm:text-xs font-bold tracking-widest uppercase text-teal-800">
                About Dr. Manas Aggarwal
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-serif font-bold text-[#112340] tracking-tight leading-[1.25]">
              Senior Gastrosurgeon, GI Cancer &amp; Pancreas Specialist in Lucknow
            </h2>

            {/* Credentials / Degrees */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[0.85rem] text-gray-700 font-medium mt-3.5">
              <span className="text-teal-900 font-semibold">MBBS</span>
              <span>•</span>
              <span className="text-teal-900 font-semibold">MS (General Surgery)</span>
              <span>•</span>
              <span className="text-[#00B771] font-bold">MCh (Surgical Gastroenterology)</span>
              <span>•</span>
              <span className="text-gray-500 font-normal">Chandan Hospital</span>
            </div>

            {/* Concise Bio */}
            <p className="text-sm sm:text-[0.92rem] text-gray-600 leading-relaxed text-left mt-4">
              Dr. Manas Aggarwal is a proficient Gastrointestinal and Hepato-biliary-pancreatic (GI &amp; HPB) surgeon with expertise across 100+ surgical varieties. Trained from prestigious premier medical institutes of India, he performs more than 90 percent of surgeries through modern minimally invasive laparoscopic and robotic precision techniques with an unwavering commitment to patient well-being and sterility.
            </p>

            {/* Animated Social Proof / Patient Trust Badge matching reference */}
            <div className="mt-6 mb-7 pt-5 border-t border-teal-100/70">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 group">
                
                {/* Overlapping Avatar Stack */}
                <div className="flex items-center -space-x-3 shrink-0">
                  {patientAvatars.map((avatar, idx) => (
                    <div
                      key={idx}
                      className="relative transform hover:-translate-y-1.5 hover:scale-110 hover:z-20 transition-all duration-300 ease-out cursor-pointer"
                      style={{ transitionDelay: `${idx * 40}ms` }}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.alt}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
                        loading="lazy"
                      />
                    </div>
                  ))}

                  {/* Doctor Profile PNG Circle */}
                  <div
                    className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#e8f8f2] via-[#d7f4e8] to-[#bfeadb] ring-2 ring-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] z-10 shrink-0 transform hover:-translate-y-1.5 hover:scale-110 hover:z-20 transition-all duration-300 ease-out cursor-pointer overflow-hidden flex items-end justify-center"
                    title="Dr. Manas Aggarwal"
                  >
                    <img
                      src={doctorCutout}
                      alt="Dr. Manas Aggarwal"
                      className="w-full h-full object-cover object-top scale-115 origin-top"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Trust Text & 5 Golden Stars */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[1.05rem] sm:text-[1.12rem] font-serif font-extrabold text-[#112340] tracking-tight leading-snug">
                      Trusted by 16,000+ Happy Patients
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-xs sm:text-sm drop-shadow-xs transition-transform hover:scale-125" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-[0.82rem] font-bold text-gray-800 ml-1">
                      4.9 / 5
                    </span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-[0.72rem] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs">
                      100% Ethical Care
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Pill CTA Button */}
            <div className="mt-6">
              <Link to="/about-dr-manas-aggarwal" className="inline-block">
                <button className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 text-[0.88rem] font-serif font-semibold text-white tracking-wide rounded-full overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#0ea5e9] hover:from-[#18a2cd] hover:via-[#30c0ec] hover:to-[#1CB6E6] shadow-[0_4px_16px_rgba(28,182,230,0.38)] hover:shadow-[0_6px_24px_rgba(28,182,230,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] border border-white/30 cursor-pointer">
                  {/* Shimmer sweep animation */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  <span className="relative z-10 font-medium">Know More About Doctor</span>
                  <FaArrowRight className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

          </div>

          {/* Right Side: Circular Arch Curve with Clinic Background + Doctor Cutout */}
          <div className="flex-1 w-full flex justify-center lg:justify-end" data-aos="fade-left">
            <div className="relative w-[310px] sm:w-[380px] md:w-[420px] lg:w-[460px] h-[370px] sm:h-[450px] md:h-[490px] lg:h-[530px] flex items-end justify-center">
              
              {/* Outer Circular Curved Border/Ring */}
              <div className="absolute inset-0 rounded-l-[180px] sm:rounded-l-[220px] lg:rounded-l-[260px] rounded-r-3xl border-[3px] border-[#00B771]/80 shadow-[0_10px_35px_rgba(0,183,113,0.15)] overflow-hidden">
                {/* Modern Soft Clinic / Hospital Background */}
                <img
                  src={clinicBg}
                  alt="Chandan Hospital Clinic"
                  className="w-full h-full object-cover object-center filter brightness-105 contrast-95 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-teal-900/10" />
              </div>

              {/* Doctor Cutout Image positioned over the curve */}
              <div className="relative z-10 w-[95%] sm:w-[92%] h-full flex items-end justify-center">
                <img
                  src={doctorCutout}
                  alt="Dr. Manas Aggarwal"
                  className="max-h-[105%] w-auto object-contain object-bottom select-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
                  loading="lazy"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
