import React, { useEffect } from 'react';
import { FiUsers, FiTarget } from 'react-icons/fi';
import { LuMicroscope, LuHeartPulse, LuShieldCheck, LuFlaskConical } from 'react-icons/lu';
import AOS from 'aos';
import 'aos/dist/aos.css';
import doctorTeamBg from '../../assets/slider/slider-doctor.jpg';

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const cards = [
    {
      id: '01',
      icon: <LuMicroscope className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Expert Knowledge',
      description: 'Specializing in digestive health and offering a deep understanding of GI conditions.',
    },
    {
      id: '02',
      icon: <LuHeartPulse className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Diagnostic Precision',
      description: 'Performing essential tests for accurate diagnoses and precise treatment plans.',
    },
    {
      id: '03',
      icon: <LuShieldCheck className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Preventive Focus',
      description: 'Prioritizing early detection to ensure long-term health and well-being.',
    },
    {
      id: '04',
      icon: <LuFlaskConical className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Cutting-edge Technology',
      description: 'Utilizing the latest technology for superior care and accurate diagnosis.',
    },
    {
      id: '05',
      icon: <FiUsers className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Comprehensive Care',
      description: 'Delivering holistic, patient-centered treatment plans tailored to you.',
    },
    {
      id: '06',
      icon: <FiTarget className="text-2xl sm:text-[1.65rem] text-[#147a8c] group-hover:text-[#00B771] transition-colors duration-500" />,
      title: 'Precise Diagnoses',
      description: 'Focusing on accuracy and timely diagnoses for your overall well-being.',
    },
  ];

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#e4f5ef] via-[#eff8f5] to-[#def2eb]">
      
      {/* Blurred Doctor/Medical Team Background matching reference */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={doctorTeamBg}
          alt="Medical Doctors"
          className="w-full h-full object-cover object-center filter blur-md scale-105 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-[#e8f6f2]/75 to-white/85" />
        {/* Distinct Style: Precision Medical Blueprint Grid (No dots) */}
        <div className="absolute inset-0 bg-grid-medical mask-radial-faded pointer-events-none opacity-60" />
        {/* Vibrant Ambient Brand Glows */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#1CB6E6]/25 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#00B771]/22 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Leading Surgical Gastroenterologist in Lucknow
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] font-serif font-bold text-[#112340] tracking-tight max-w-3xl leading-snug">
            Specialized care for stomach, liver, pancreas &amp; GI disorders with proven success.
          </h2>
        </div>

        {/* 6 Cards Grid (3 columns x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 transition-all duration-500 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(20,122,140,0.22)] border border-slate-100 hover:border-teal-400 overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              {/* Left to right color overlay - slowly slides in on hover and slowly retreats back on mouse leave */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#147a8c] via-[#0f8b80] to-[#00B771] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out pointer-events-none z-0" />

              {/* Number Badge (01, 02, etc.) */}
              <span className="absolute top-5 right-6 text-sm font-bold text-[#80bcc9] group-hover:text-white/80 transition-colors duration-500 font-mono z-10">
                {card.id}
              </span>

              <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                
                {/* Modern Circular Icon with Soft Glow Base */}
                <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d3f4ec] via-[#ebfaf6] to-white group-hover:from-white group-hover:to-white group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] border border-teal-100/90 group-hover:border-white shadow-[inset_0_2px_8px_rgba(0,183,113,0.12)] transition-all duration-700 ease-out" />
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pr-6">
                  <h3 className="text-base sm:text-[1.08rem] font-bold text-[#112340] group-hover:text-white transition-colors duration-500 leading-snug mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[0.84rem] text-gray-500 group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
