import React, { useState } from 'react';
import { FiCalendar, FiActivity, FiShield, FiHeart, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const PatientJourney = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      step: '01',
      title: 'Book Appointment',
      subtitle: 'Effortless & Instant',
      desc: 'Call our direct hotline or submit our quick online form to confirm your priority OPD consultation slot.',
      badge: 'Step 1',
      duration: 'Immediate',
      icon: <FiCalendar className="text-2xl transition-transform duration-500 group-hover:scale-110" />,
      accent: 'from-[#00B771] to-[#0ea0cc]',
      accentColor: '#00B771',
    },
    {
      step: '02',
      title: 'Expert Diagnosis',
      subtitle: 'Precision Evaluation',
      desc: 'Detailed review of Endoscopy, USG & CT imaging to isolate the root cause with zero guesswork.',
      badge: 'Step 2',
      duration: 'Day 1',
      icon: <FiActivity className="text-2xl transition-transform duration-500 group-hover:scale-110" />,
      accent: 'from-[#1CB6E6] to-[#0b8cb5]',
      accentColor: '#1CB6E6',
    },
    {
      step: '03',
      title: 'Advanced Treatment',
      subtitle: 'Laparoscopic Care',
      desc: 'Painless, minimally-invasive keyhole surgery designed for maximum precision, zero blood loss & total safety.',
      badge: 'Step 3',
      duration: 'Minimal Invasive',
      icon: <FiShield className="text-2xl transition-transform duration-500 group-hover:scale-110" />,
      accent: 'from-[#00B771] to-[#1CB6E6]',
      accentColor: '#00B771',
    },
    {
      step: '04',
      title: 'Rapid Recovery',
      subtitle: 'Back on Your Feet',
      desc: 'Swift 24–48 hours hospital discharge backed with tailor-made postoperative dietary & recovery roadmap.',
      badge: 'Step 4',
      duration: '24-48 Hours',
      icon: <FiHeart className="text-2xl transition-transform duration-500 group-hover:scale-110" />,
      accent: 'from-[#1CB6E6] to-[#00B771]',
      accentColor: '#1CB6E6',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#ffffff] via-[#ecf7f3] to-[#e4f4ee] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Distinct Style: Flowing Journey Waves & Path Flares (No dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#1CB6E6]/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#00B771]/20 rounded-full blur-[110px]" />
        {/* Subtle horizontal connective glow along the 4 steps */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-24 bg-gradient-to-r from-cyan-200/25 via-emerald-200/25 to-teal-200/25 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Seamless Patient Experience
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] tracking-tight max-w-3xl leading-snug">
            Your Journey to Healing in 4 Simple Steps
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
            From your very first consultation to complete postoperative recovery, experience transparent, ethical, and world-class surgical care.
          </p>
        </div>

        {/* Interactive Steps Grid with Connecting Timeline Line */}
        <div className="relative">
          
          {/* Animated Gradient Timeline Track (Desktop only) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-200 rounded-full -z-0">
            <div
              className="h-full bg-gradient-to-r from-[#00B771] to-[#1CB6E6] transition-all duration-700 ease-out rounded-full shadow-[0_0_12px_rgba(28,182,230,0.5)]"
              style={{
                width: hoveredStep !== null ? `${((hoveredStep + 1) / 4) * 100}%` : '25%',
              }}
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch relative z-10">
            {steps.map((item, idx) => {
              const isHovered = hoveredStep === idx;
              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="group relative bg-white rounded-3xl p-6 sm:p-7 transition-all duration-500 ease-out shadow-[0_6px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(20,150,170,0.2)] border border-gray-100 hover:border-[#1CB6E6]/60 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Slow Translucent Radial Ambient Flare */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1CB6E6]/10 via-[#00B771]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />

                  {/* Top Glowing Wave Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00B771] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div>
                    {/* Top Header Row with Stepper Indicator & Step Number */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 group-hover:bg-[#00B771] text-[#0e6b56] group-hover:text-white font-bold text-xs tracking-wider border border-teal-100 group-hover:border-[#00B771] transition-all duration-500 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] group-hover:bg-white animate-pulse" />
                        {item.badge}
                      </span>
                      
                      {/* Big Translucent Number */}
                      <span className="text-3xl font-serif font-extrabold text-slate-200 group-hover:text-[#1CB6E6]/40 transition-colors duration-500 font-mono tracking-tighter">
                        {item.step}
                      </span>
                    </div>

                    {/* Circular Icon Orb with Interactive Concentric Glow Rings */}
                    <div className="relative mx-auto my-3 w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] flex items-center justify-center">
                      
                      {/* Concentric Decorative Ring */}
                      <div className="absolute inset-0 rounded-full border border-teal-200/70 group-hover:border-[#1CB6E6] group-hover:scale-110 transition-all duration-700 ease-out" />
                      
                      {/* Orbiting Satellite Dot */}
                      <span className="absolute -top-0.5 right-1 w-2.5 h-2.5 rounded-full bg-[#00B771] group-hover:bg-[#1CB6E6] shadow-sm transition-all duration-700 group-hover:scale-125" />

                      {/* Inner Glowing Core Badge */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#d3f4ec] via-[#ebfaf6] to-white group-hover:from-[#1CB6E6] group-hover:to-[#00B771] text-[#147a8c] group-hover:text-white shadow-[inset_0_2px_8px_rgba(0,183,113,0.15)] group-hover:shadow-[0_8px_20px_rgba(28,182,230,0.4)] flex items-center justify-center transition-all duration-700 ease-out">
                        {item.icon}
                      </div>
                    </div>

                    {/* Card Title & Subtitle */}
                    <div className="text-center mt-3 mb-2">
                      <span className="text-[11px] font-semibold text-[#00B771] group-hover:text-[#1CB6E6] tracking-wider uppercase transition-colors duration-500 block mb-0.5">
                        {item.subtitle}
                      </span>
                      <h3 className="text-base sm:text-[1.12rem] font-serif font-bold text-[#112340] group-hover:text-[#0b5f78] transition-colors duration-500 leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[0.84rem] text-gray-500 group-hover:text-gray-600 transition-colors duration-500 leading-relaxed text-center">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Milestone Bar */}
                  <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-gray-400 group-hover:text-[#0e6b56] font-medium transition-colors">
                      <FiCheckCircle className="text-[#00B771] text-xs" />
                      {item.duration}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-teal-50 group-hover:bg-[#1CB6E6] text-[#00B771] group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm">
                      <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default PatientJourney;
