import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaUserMd, 
  FaHospital,
  FaPhoneAlt
} from 'react-icons/fa';
import { FiArrowRight, FiPhoneCall } from 'react-icons/fi';
import { LuCheck, LuActivity, LuInfo } from 'react-icons/lu';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { services } from '../../data/treatmentsData';
import BreadCrumbs from '../../Component/BreadCums';
import BookNowSection from '../../Component/BookingSection';
import BookApointement from '../../Component/BookApointement';
import doctorCutout from '../../assets/doctor.png';

// Tailored Hero Background Images for Every Treatment Field
import gallbladderHero from '../../assets/treatment-heroes/gallbladder-hero.jpg';
import liverHero from '../../assets/treatment-heroes/liver-hero.jpg';
import pancreasHero from '../../assets/treatment-heroes/pancreas-hero.jpg';
import stomachHero from '../../assets/treatment-heroes/stomach-hero.jpg';
import herniaHero from '../../assets/treatment-heroes/hernia-hero.jpg';
import colorectalHero from '../../assets/treatment-heroes/colorectal-hero.jpg';
import proctologyHero from '../../assets/treatment-heroes/proctology-hero.jpg';
import roboticHero from '../../assets/treatment-heroes/robotic-hero.jpg';
import defaultHero from '../../assets/cases-hero-bg.jpg';

const TreatmentDetail = () => {
  const { category, slug, name, details } = useParams();
  const location = useLocation();

  const activeSlug = slug || details || name || '';
  
  const [activeService, setActiveService] = useState(() => {
    const found = services.find(s => 
      s.link?.toLowerCase() === activeSlug.toLowerCase() ||
      s.link?.toLowerCase().replace(/[^a-z0-9]/g, '') === activeSlug.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    return found || services[0];
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    
    const found = services.find(s => 
      s.link?.toLowerCase() === lastPart?.toLowerCase() ||
      s.link?.toLowerCase().replace(/[^a-z0-9]/g, '') === lastPart?.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    if (found) {
      setActiveService(found);
    }
  }, [location.pathname, slug, details, name]);

  if (!activeService) return null;

  // Determine specific hero background image based on category and slug
  const getHeroBackground = () => {
    const cat = (category || '').toLowerCase();
    const s = (activeService.link || activeSlug || '').toLowerCase();

    if (cat.includes('gallbladder') || s.includes('gall') || s.includes('bile')) {
      return gallbladderHero;
    }
    if (cat.includes('liver') || s.includes('liver') || s.includes('cysts')) {
      return liverHero;
    }
    if (cat.includes('pancreas') || cat.includes('whipple') || s.includes('pancrea') || s.includes('whipple')) {
      return pancreasHero;
    }
    if (cat.includes('stomach') || cat.includes('antireflux') || s.includes('stomach') || s.includes('polyp') || s.includes('antireflux')) {
      return stomachHero;
    }
    if (cat.includes('hernia') || s.includes('hernia')) {
      return herniaHero;
    }
    if (cat.includes('intestine') || cat.includes('colon') || s.includes('intestin') || s.includes('colon') || s.includes('rectum') || s.includes('obstruction') || s.includes('perforation')) {
      return colorectalHero;
    }
    if (cat.includes('proctology') || s.includes('hemorrhoids') || s.includes('fisure') || s.includes('fistula') || s.includes('piles')) {
      return proctologyHero;
    }
    if (cat.includes('robotic') || cat.includes('weight-loss') || s.includes('robotic') || s.includes('weightloss')) {
      return roboticHero;
    }

    return defaultHero;
  };

  // Formatted category title
  const formattedCategory = (category || 'Specialty')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Treatments' },
    { label: formattedCategory },
    { label: activeService.name },
  ];

  return (
    <div className="overflow-x-hidden bg-[#fbfdfc] min-h-screen">
      {/* Dynamic SEO Meta */}
      <Helmet>
        <title>{activeService.name} - Treatment in Lucknow | Dr. Manas Aggarwal</title>
        <meta
          name="description"
          content={`Advanced treatment for ${activeService.name} in Lucknow by Dr. Manas Aggarwal (MCh Surgical Gastroenterology). Minimal downtime, precise diagnostics, and compassionate patient care at Chandan Hospital.`}
        />
        <meta name="keywords" content={`${activeService.name}, Surgical Gastroenterologist Lucknow, Dr Manas Aggarwal, GI Surgery, Chandan Hospital`} />
        <link rel="canonical" href={`https://drmanasaggarwal.com${location.pathname}`} />
      </Helmet>

      {/* ========================================================
          1. HERO SECTION - WITH DEDICATED FIELD-SPECIFIC BG IMAGE
          ======================================================== */}
      <BreadCrumbs
        headText={activeService.name}
        items={breadcrumbItems}
        image={getHeroBackground()}
      />

      {/* ========================================================
          2. MAIN CONTENT + SIDEBAR (COMPACT, NO UNNECESSARY SPACES)
          ======================================================== */}
      <section className="py-8 sm:py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ========================================================
              1. UPPER SECTION: EQUAL 2-COLUMN BALANCED LAYOUT
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-8 items-stretch mb-8 sm:mb-10 lg:mb-12">
            
            {/* Left Card (50% Equal Width): Medical Diagram & Clinical Highlights */}
            {activeService.images && activeService.images[0] && (
              <div 
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_6px_25px_rgba(20,122,140,0.06)] flex flex-col justify-between"
                data-aos="fade-up"
              >
                {/* 16:9 Medical Diagram Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 group">
                  <img
                    src={activeService.images[0]}
                    alt={`${activeService.name} Clinical Diagram`}
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Sleek Clinical Procedure Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#112340] text-xs font-semibold border border-teal-200/70 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#00B771] animate-pulse" />
                    <span>Clinical Procedure • Dr. Manas Aggarwal</span>
                  </div>
                </div>

                {/* Clinical Highlights Strip */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-2.5 rounded-2xl bg-teal-50/60 border border-teal-100/60">
                    <p className="text-xs font-bold text-[#0e6b56]">Minimally Invasive</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Laparoscopic Precision</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-teal-50/60 border border-teal-100/60">
                    <p className="text-xs font-bold text-[#0e6b56]">Rapid Recovery</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Day Care / 24-48h Stay</p>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-teal-50/60 border border-teal-100/60">
                    <p className="text-xs font-bold text-[#0e6b56]">Advanced GI Care</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Chandan Hospital</p>
                  </div>
                </div>
              </div>
            )}

            {/* Right Card (50% Equal Width): Clinical Overview & Doctor Consult */}
            <div 
              className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 shadow-[0_6px_25px_rgba(20,122,140,0.06)] flex flex-col justify-between"
              data-aos="fade-up"
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                    Clinical Overview
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#112340] mb-3">
                  About {activeService.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify mb-4">
                  {activeService.description}
                </p>

                {activeService.treatment?.overview && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-teal-50/70 border border-teal-100/90 text-teal-900 text-xs sm:text-sm leading-relaxed mb-4">
                    <p className="font-bold text-[#0e6b56] mb-1 flex items-center gap-2 text-xs sm:text-sm">
                      <LuInfo className="text-base shrink-0" /> Medical &amp; Surgical Management:
                    </p>
                    <p className="text-gray-700">{activeService.treatment.overview}</p>
                  </div>
                )}
              </div>

              {/* Doctor Quick Action Strip */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={doctorCutout}
                      alt="Dr. Manas Aggarwal"
                      className="w-12 h-12 rounded-xl object-cover object-top border border-teal-200 shadow-xs bg-teal-50"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-snug">
                        Dr. Manas Aggarwal
                      </h4>
                      <p className="text-[11px] text-[#00B771] font-semibold">
                        MCh (Surgical Gastroenterology)
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Chandan Hospital, Lucknow
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <BookApointement classes="flex-1 sm:flex-initial">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-4 py-2.5 bg-[#00B771] hover:bg-[#009e5f] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FaCalendarAlt />
                        <span>Book Consult</span>
                      </button>
                    </BookApointement>
                    <a
                      href="tel:+918318208837"
                      className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-800 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <FaPhoneAlt className="text-xs text-[#00B771]" />
                      <span>Call Doctor</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* ========================================================
              3. FULL-WIDTH CARDS: CLASSIFICATIONS / TYPES & VARIATIONS
              ======================================================== */}
          {activeService.types && activeService.types.length > 0 && (
            <div 
              className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 sm:mb-10 lg:mb-12"
              data-aos="fade-up"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                  Classifications
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#112340] mb-5">
                Types &amp; Clinical Variations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {activeService.types.map((type, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/70 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all duration-500 overflow-hidden"
                  >
                    {/* Smooth hover color overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50/80 via-emerald-50/50 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-in-out pointer-events-none z-0" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="font-bold text-gray-900 group-hover:text-[#0e6b56] transition-colors text-base sm:text-lg">
                          {type.title}
                        </h4>
                        <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-[#00B771]">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {type.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              4. FULL-WIDTH CARDS: CAUSES & SYMPTOMS (EQUAL 50% SPLIT)
              ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12" data-aos="fade-up">
            
            {/* Causes Card (Full Left Half) */}
            {activeService.causes && activeService.causes.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-0.5 bg-amber-500 rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Causes &amp; Factors
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#112340] mb-4">
                    Common Causes &amp; Risk Factors
                  </h3>
                  <ul className="space-y-3">
                    {activeService.causes.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Symptoms Card (Full Right Half) */}
            {activeService.symptoms && activeService.symptoms.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-0.5 bg-[#00B771] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                      Clinical Indicators
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#112340] mb-4">
                    Key Symptoms &amp; Warning Signs
                  </h3>
                  <ul className="space-y-3">
                    {activeService.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <LuActivity className="text-emerald-500 mt-1 shrink-0 text-base" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* ========================================================
              5. FULL-WIDTH CARDS: TREATMENT & SURGICAL PROTOCOLS
              ======================================================== */}
          {activeService.treatment?.details && activeService.treatment.details.length > 0 && (
            <div 
              className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8 sm:mb-10 lg:mb-12"
              data-aos="fade-up"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                  Interventions
                </span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#112340] mb-6">
                Treatment &amp; Surgical Protocols
              </h3>

              <div className={`grid grid-cols-1 ${activeService.treatment.details.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-5 sm:gap-6`}>
                {activeService.treatment.details.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-teal-400/50 bg-slate-50/70 hover:bg-transparent shadow-2xs hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Rich color overlay from top-right corner to bottom-left corner */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#147a8c] via-[#0e6b56] to-[#00B771] origin-top-right scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out pointer-events-none z-0" />

                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00B771] group-hover:bg-white/20 group-hover:text-white group-hover:backdrop-blur-sm group-hover:border group-hover:border-white/30 flex items-center justify-center text-sm font-bold mb-3.5 transition-all duration-500 shadow-2xs">
                          0{idx + 1}
                        </div>
                        <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors duration-500 text-base sm:text-lg mb-2">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 group-hover:text-teal-50 transition-colors duration-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================
          3. MODERN INTEGRATED CTA (BOOKING SECTION)
          ======================================================== */}
      <BookNowSection />

    </div>
  );
};

export default TreatmentDetail;
