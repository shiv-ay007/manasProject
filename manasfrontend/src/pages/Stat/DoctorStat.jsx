import React, { useEffect, useState, useRef } from "react";
import { FiUsers, FiCalendar, FiFileText } from "react-icons/fi";
import { LuScissors } from "react-icons/lu";
import AOS from "aos";
import "aos/dist/aos.css";

// Smooth Counting Animation Component
const CountUpNumber = ({ target, duration = 1800, prefix = "+" }) => {
  const [current, setCurrent] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCurrent(Math.floor(easeOutExpo * target));

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCurrent(target);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.15 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}{current.toLocaleString()}
    </span>
  );
};

const stats = [
  {
    id: 1,
    title: "Happy Patients",
    count: 16000,
    prefix: "+",
    subtitle: "Smiles restored with holistic care",
    icon: <FiUsers className="text-xl sm:text-2xl text-[#0e6b56]" />,
  },
  {
    id: 2,
    title: "Years Experience",
    count: 19,
    prefix: "+",
    subtitle: "Years of dedicated GI surgical excellence",
    icon: <FiCalendar className="text-xl sm:text-2xl text-[#0e6b56]" />,
  },
  {
    id: 3,
    title: "Total Cases Solved",
    count: 3200,
    prefix: "+",
    subtitle: "Complex digestive disorders resolved",
    icon: <FiFileText className="text-xl sm:text-2xl text-[#0e6b56]" />,
  },
  {
    id: 4,
    title: "Successful Surgeries",
    count: 1600,
    prefix: "+",
    subtitle: "Advanced laparoscopic & GI procedures",
    icon: <LuScissors className="text-xl sm:text-2xl text-[#0e6b56]" />,
  },
];

const ClinicStats = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#e3f4ee] via-[#edf7f3] to-[#daf0e8] overflow-hidden">
      {/* Distinct Style: Prestige Trophy Rings & Center Spotlight (No dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Concentric subtle decorative circular rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-teal-300/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-cyan-300/35" />
        {/* Core radiant spotlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-r from-[#1CB6E6]/25 via-teal-200/30 to-[#00B771]/25 rounded-full blur-[90px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Our Track Record of Success
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] font-serif font-bold text-[#112340] tracking-tight leading-snug">
            Thousands of happy patients and years of trusted surgical experience.
          </h2>
          
          <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
            Delivering evidence-based surgical gastroenterology with ethical care, precision diagnostics, and minimal patient downtime.
          </p>
        </div>

        {/* 4 Stats Linear Row with Circular Icons and Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0" data-aos="fade-up">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex items-center gap-4 sm:gap-5 px-3 lg:px-6 transition-all duration-300 hover:-translate-y-1 ${
                index !== 0 ? "lg:border-l lg:border-teal-100" : ""
              }`}
            >
              {/* Circular Glowing Icon Base */}
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c4f2e6] via-[#e2faf4] to-white shadow-[0_4px_16px_rgba(0,183,113,0.18)] border border-teal-100/90" />
                <div className="relative z-10">
                  {stat.icon}
                </div>
              </div>

              {/* Stat Info */}
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#0f5367] tracking-tight leading-none mb-1">
                  <CountUpNumber target={stat.count} prefix={stat.prefix} />
                </div>
                <h4 className="text-sm sm:text-[0.95rem] font-bold text-[#112340] leading-snug">
                  {stat.title}
                </h4>
                <p className="text-[0.72rem] sm:text-xs text-gray-500 mt-0.5 leading-snug max-w-[170px]">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClinicStats;
