import React, { useEffect } from "react";
import { 
  FaHospitalAlt, 
  FaStethoscope, 
  FaSyringe, 
  FaBriefcase, 
  FaGraduationCap, 
  FaShieldAlt, 
  FaLeaf, 
  FaMicroscope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaUserMd, 
  FaProcedures
} from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import doctorimg from '../../assets/doctor.png';
import doctorTeamBg from '../../assets/slider/slider-doctor.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FaqSection from "../Home/FaqSection";
import BreadCrumbs from "../../Component/BreadCums";
import BookNowSection from "../../Component/BookingSection";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const DoctorAbout = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 600 });
    window.scrollTo(0, 0);
  }, [location]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Dr. Manas Aggarwal" },
  ];

  const skillsData = [
    {
      title: "OPD Evaluation & Care Plans",
      desc: "Comprehensive diagnostic workup, radiological correlation, and personalized medical pathways for outpatients.",
      icon: <FaStethoscope />,
      tag: "Diagnosis",
    },
    {
      title: "Perioperative & Ward Care",
      desc: "Multidisciplinary postoperative recovery protocols, intensive ICU monitoring, and rapid patient rehabilitation.",
      icon: <FaHospitalAlt />,
      tag: "Inpatient",
    },
    {
      title: "Emergency GI Resuscitation",
      desc: "Critical casualty triage, trauma resuscitation, acute abdomen stabilization, and emergency surgical interventions.",
      icon: <FaSyringe />,
      tag: "24x7 Critical",
    },
    {
      title: "Minimally Invasive Surgery",
      desc: "Advanced laparoscopic and keyhole surgeries for gallbladder, hernia, pancreas, colorectal, and GI cancers.",
      icon: <FaProcedures />,
      tag: "Laparoscopy",
    },
  ];

  const experienceData = [
    {
      role: "Vice-Chairperson & Senior Consultant",
      institution: "Chandan Hospital, Lucknow",
      period: "July 2023 – Present",
      type: "Current Leadership",
      typeColor: "bg-emerald-50 text-[#00B771] border-emerald-200/80",
      description: "Directing surgical departments, leading complex hepatobiliary and pancreatic (HPB) operative cases, and supervising tertiary critical surgical care.",
    },
    {
      role: "Consultant GI Surgeon",
      institution: "Medanta Hospital, Lucknow",
      period: "October 2019 – July 2023",
      type: "Senior Consultant",
      typeColor: "bg-teal-50 text-[#0e6b56] border-teal-200/80",
      description: "Spearheaded the establishment and clinical protocol formulation of the GI Surgery division, training resident surgeons and medical staff.",
    },
    {
      role: "Senior Resident (MCh Super-Speciality)",
      institution: "SGPGIMS, Lucknow",
      period: "2016 – 2019",
      type: "Super-Specialization",
      typeColor: "bg-sky-50 text-sky-700 border-sky-200/80",
      description: "Rigorous 3-year academic and clinical super-specialty residency handling the full spectrum of complex digestive, pancreatic, and liver surgeries.",
    },
    {
      role: "Senior Resident (General Surgery Residency)",
      institution: "UCMS & Guru Teg Bahadur Hospital, Delhi",
      period: "2012 – 2015",
      type: "Master of Surgery",
      typeColor: "bg-slate-50 text-slate-700 border-slate-200/80",
      description: "Mastered emergency surgical procedures, trauma resuscitation, high-volume abdominal operations, and patient triage in central Delhi.",
    },
    {
      role: "Undergraduate Medical Training (MBBS)",
      institution: "MAMC & Lok Nayak Hospital, Delhi",
      period: "Medical Graduation",
      type: "Academic Foundation",
      typeColor: "bg-emerald-50/70 text-[#0e6b56] border-emerald-200/60",
      description: "Completed undergraduate medical education with academic distinction at India’s premier medical institution, Maulana Azad Medical College.",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/drmanasaggarwal?mibextid=LQQJ4d&rdid=9uqGCQZ6y2xPH6el&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F5AShzHFdfS4VAe2b%2F%3Fmibextid%3DLQQJ4d",
      icon: <FaFacebookF />,
      iconBg: "bg-[#1877F2] text-white",
      hoverBorder: "hover:border-[#1877F2]/60",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/drmanasaggarwal/?igsh=MWpmY2FzZWFpcGRpcQ%3D%3D&utm_source=qr",
      icon: <FaInstagram />,
      iconBg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
      hoverBorder: "hover:border-[#ee2a7b]/60",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@DrManasAggarwal",
      icon: <FaYoutube />,
      iconBg: "bg-[#FF0000] text-white",
      hoverBorder: "hover:border-[#FF0000]/60",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/918318208837?text=${encodeURIComponent("Hello Dr. Manas Aggarwal, I would like to consult with you.")}`,
      icon: <FaWhatsapp />,
      iconBg: "bg-[#25D366] text-white",
      hoverBorder: "hover:border-[#25D366]/60",
    },
  ];

  return (
    <div className="overflow-x-hidden w-full text-slate-800">
      <Helmet>
        <title>About Dr. Manas Aggarwal - Best Gastroenterology Surgeon in Lucknow</title>
        <meta name="description" content="Learn about Dr. Manas Aggarwal, an ethical and experienced gastroenterology surgeon with 19+ years of expertise specializing in holistic and evidence-based patient care." />
        <meta name="keywords" content="About Dr. Manas Aggarwal, Gastroenterology, Surgeon, Lucknow, Medical Professional, SGPGIMS" />
      </Helmet>

      <BreadCrumbs headText={"About Dr. Manas Aggarwal"} items={breadcrumbItems} />

      {/* ========================================================
          SECTION 1: HERO & DOCTOR INTRODUCTION (CLEAN OPEN LAYOUT)
          ======================================================== */}
      <section className="relative py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#e4f5ef] via-[#eff8f5] to-[#def2eb] overflow-hidden border-b border-teal-100/70">
        {/* Background Design Matching Why Choose Us: Blurred Medical Image + Precision Grid + Radial Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={doctorTeamBg}
            alt="Medical Doctors"
            className="w-full h-full object-cover object-center filter blur-md scale-105 opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#eef8f4]/80 to-white/90" />
          {/* Medical Blueprint Grid */}
          <div className="absolute inset-0 bg-grid-medical mask-radial-faded pointer-events-none opacity-60" />
          {/* Ambient Brand Glows */}
          <div className="absolute -top-24 -left-20 w-[500px] h-[500px] bg-[#00B771]/20 rounded-full blur-[110px]" />
          <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] bg-[#1CB6E6]/20 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
            
            {/* Left Side: Editorial Content & Credentials (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between" data-aos="fade-right">
              <div className="space-y-4 sm:space-y-5">
                
                {/* Badge: Senior Consultant & Super-Specialist */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-[#00B771] text-xs sm:text-[0.84rem] font-bold tracking-wide shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#00B771] animate-pulse" />
                  <span>Senior Consultant &amp; Super-Specialist</span>
                </div>

                {/* Heading */}
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#112340] tracking-tight leading-[1.18] font-sans">
                    About <br className="hidden sm:inline" />
                    <span className="text-[#00B771]">Dr. Manas Aggarwal</span>
                  </h1>
                  <p className="text-[0.72rem] sm:text-xs font-bold text-teal-800 tracking-wider uppercase mt-2">
                    MBBS • MS (GENERAL SURGERY) • MCH SURGICAL GASTROENTEROLOGY (SGPGIMS)
                  </p>
                </div>

                {/* Bio Paragraphs */}
                <div className="space-y-3 text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">
                  <p>
                    Dr. Manas Aggarwal brings more than <strong className="text-gray-900 font-semibold">19+ years of specialized surgical expertise</strong> in advanced gastroenterology, hepatology, and complex pancreatic disorders. Trained at premier medical institutions in Delhi (MAMC &amp; UCMS), he earned his super-specialist MCh degree from the prestigious <strong className="text-gray-900 font-semibold">SGPGIMS, Lucknow</strong>, followed by distinguished clinical tenures at Medanta Hospital and Chandan Hospital.
                  </p>
                </div>

                {/* 3 Modern Metric Cards with Icons */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                  
                  {/* Metric 1 */}
                  <div className="group bg-white hover:bg-emerald-50/70 p-3.5 sm:p-4 rounded-2xl border border-teal-100/90 transition-all duration-300 text-left flex items-center gap-3 shadow-xs hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00B771] flex items-center justify-center shrink-0 shadow-xs border border-teal-100 group-hover:scale-110 transition-transform duration-300">
                      <FaBriefcase className="text-base" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#00B771] block leading-none font-sans">
                        19+
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1 leading-tight">
                        Years Experience
                      </span>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="group bg-white hover:bg-emerald-50/70 p-3.5 sm:p-4 rounded-2xl border border-teal-100/90 transition-all duration-300 text-left flex items-center gap-3 shadow-xs hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0e6b56] flex items-center justify-center shrink-0 shadow-xs border border-teal-100 group-hover:scale-110 transition-transform duration-300">
                      <FaGraduationCap className="text-lg" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-extrabold text-slate-800 block leading-none font-sans">
                        SGPGIMS
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1 leading-tight">
                        Alumnus Specialist
                      </span>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="group bg-white hover:bg-emerald-50/70 p-3.5 sm:p-4 rounded-2xl border border-teal-100/90 transition-all duration-300 text-left flex items-center gap-3 shadow-xs hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00B771] flex items-center justify-center shrink-0 shadow-xs border border-teal-100 group-hover:scale-110 transition-transform duration-300">
                      <FaUserMd className="text-base" />
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#00B771] block leading-none font-sans">
                        16k+
                      </span>
                      <span className="text-[11px] sm:text-xs text-gray-600 font-medium block mt-1 leading-tight">
                        Patients Treated
                      </span>
                    </div>
                  </div>

                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <a
                    href="https://chandanhospital.in/doctor/dr-manas-aggarwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#00B771] hover:bg-[#009b60] text-white font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(0,183,113,0.32)] hover:shadow-[0_8px_25px_rgba(0,183,113,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Book Appointment</span>
                    <span>→</span>
                  </a>

                  <a
                    href="tel:+918318208837"
                    className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-teal-50 text-slate-800 font-bold text-xs sm:text-sm border border-teal-200/80 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer hover:border-[#00B771] shadow-xs"
                  >
                    <FaPhoneAlt className="text-xs text-[#00B771]" />
                    <span>+91-8318208837</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Right Side: Doctor Cutout with Floating Designation Badge (5 cols) */}
            <div className="lg:col-span-5 relative flex flex-col justify-end items-center" data-aos="fade-left">
              {/* Soft Ambient Radial Light Flares */}
              <div className="absolute top-1/4 w-80 h-80 bg-[#00B771]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-16 w-80 h-80 bg-[#1CB6E6]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Doctor Cutout Image */}
              <div className="relative z-10 w-full flex justify-center items-end">
                <img
                  src={doctorimg}
                  alt="Dr. Manas Aggarwal - Senior Consultant Surgical Gastroenterology"
                  className="w-full max-w-[310px] sm:max-w-[350px] lg:max-w-[380px] h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] hover:scale-103 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Floating Glass Badge Card - snug and connected to doctor cutout */}
              <div className="relative z-20 w-full max-w-sm -mt-5 sm:-mt-7 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-teal-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center transition-all duration-500 hover:shadow-[0_14px_35px_rgba(0,183,113,0.18)]">
                <h3 className="font-bold text-[#112340] text-base sm:text-lg font-sans">
                  Dr. Manas Aggarwal
                </h3>
                <p className="text-xs sm:text-[0.82rem] text-[#00B771] font-bold mt-0.5">
                  Vice-Chairperson, Chandan Hospital, Lucknow
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">
                  Senior Consultant • Surgical Gastroenterology &amp; Pancreatic Care
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: PRACTICE PHILOSOPHY (CONCENTRIC RINGS & SOFT SPOTLIGHT)
          ======================================================== */}
      <section className="relative py-12 md:py-16 bg-gradient-to-tr from-[#f1faf6] via-[#ffffff] to-[#e4f3ed] overflow-hidden border-b border-teal-100/70">
        {/* Style Variant 2: Concentric Surgical Ripple Rings + Dual Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle concentric rings like in stats section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-teal-200/50 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-200/40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-emerald-200/45 pointer-events-none" />
          
          <div className="absolute -top-24 -right-16 w-[450px] h-[450px] bg-[#00B771]/16 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-16 w-[450px] h-[450px] bg-[#1CB6E6]/16 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 md:mb-10">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
                Practice Philosophy
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#112340] tracking-tight">
              Holistic, Ethical &amp; Evidence-Based Healing
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              Dr. Manas Aggarwal’s practice is built upon the foundational belief that clinical care must be ethical, compassionate, and evidence-based. Combining modern scientific protocols with mindful lifestyle modifications and specialized dietary strategies, medications and surgical options are reserved strictly for refractory cases.
            </p>
          </div>

          {/* 3 Standalone Interactive Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <div className="group relative overflow-hidden flex items-start gap-4 bg-white p-6 rounded-2xl border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-emerald-50/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out pointer-events-none" />

              <div className="relative z-10 w-12 h-12 rounded-xl bg-emerald-500/10 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-500 shadow-xs">
                <FaShieldAlt className="text-xl" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-[#112340] group-hover:text-[#00B771] transition-colors duration-300 text-base sm:text-lg">Ethical Standards</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">Transparent medical advice prioritizing genuine patient needs above all.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden flex items-start gap-4 bg-white p-6 rounded-2xl border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-emerald-50/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out pointer-events-none" />

              <div className="relative z-10 w-12 h-12 rounded-xl bg-emerald-500/10 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-500 shadow-xs">
                <FaLeaf className="text-xl" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-[#112340] group-hover:text-[#00B771] transition-colors duration-300 text-base sm:text-lg">Holistic Healing</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">Prioritizing diet, meditation &amp; lifestyle changes before surgical intervention.</p>
              </div>
            </div>

            <div className="group relative overflow-hidden flex items-start gap-4 bg-white p-6 rounded-2xl border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 via-emerald-50/20 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out pointer-events-none" />

              <div className="relative z-10 w-12 h-12 rounded-xl bg-emerald-500/10 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-500 shadow-xs">
                <FaMicroscope className="text-xl" />
              </div>
              <div className="relative z-10">
                <h4 className="font-bold text-[#112340] group-hover:text-[#00B771] transition-colors duration-300 text-base sm:text-lg">Evidence-Based</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">Scientific treatments backed by global gastroenterology surgical protocols.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 3: SPECIALIZED SKILLS & COMPETENCIES (CYAN/TEAL DOT MATRIX)
          ======================================================== */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#e3f4ef] via-[#eff8f5] to-[#dff2ec] overflow-hidden border-b border-teal-100/70">
        {/* Style Variant 3: Aceternity Dot Matrix Pattern + Vibrant Glows like Healthcare Services */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-dot-teal mask-radial-faded pointer-events-none opacity-75" />
          <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-[#1CB6E6]/22 rounded-full blur-[110px]" />
          <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-[#00B771]/22 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
                  Core Competencies
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#112340] tracking-tight">
                Specialized Surgical Skills &amp; Expertise
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
              Refined clinical &amp; operative proficiencies accumulated across 19+ years of superspecialty practice.
            </p>
          </div>

          {/* Standalone Skills Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {skillsData.map((skill, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Corner-to-corner diagonal color overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#147a8c] via-[#0d8272] to-[#00B771] origin-top-left scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out pointer-events-none z-0" />

                {/* Decorative subtle ambient circle in the corner */}
                <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-teal-50/70 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none z-0" />

                <div className="relative z-10">
                  {/* Header Row: Icon + Number & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#d3f4ec] via-[#ebfaf6] to-white group-hover:from-white group-hover:to-white text-[#147a8c] group-hover:text-[#00B771] border border-teal-100 group-hover:border-white shadow-[inset_0_2px_8px_rgba(0,183,113,0.12)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 group-hover:scale-105 shrink-0">
                      {skill.icon}
                    </div>
                    
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-white/60 transition-colors duration-500">
                        0{idx + 1}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 group-hover:bg-white/20 group-hover:text-white px-2.5 py-0.5 rounded-full border border-emerald-200/60 group-hover:border-white/30 transition-all duration-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] group-hover:bg-white animate-pulse" />
                        {skill.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 group-hover:text-white text-base sm:text-[1.1rem] transition-colors duration-500 leading-snug mb-2.5">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[0.85rem] text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors duration-500">
                    {skill.desc}
                  </p>
                </div>

                {/* Bottom Footer Row */}
                <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-100 group-hover:border-white/20 flex items-center justify-between text-xs text-gray-400 group-hover:text-white/90 transition-all duration-500">
                  <span className="font-medium tracking-wide">Clinical Standard</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-white/20 flex items-center justify-center text-[#147a8c] group-hover:text-white transition-all duration-500 group-hover:translate-x-1 font-bold">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: PROFESSIONAL EXPERIENCE (SURGICAL DIAGONAL LINES & TIMELINE GLOW)
          ======================================================== */}
      <section className="relative py-14 md:py-18 bg-gradient-to-b from-[#edf8f4] via-[#ffffff] to-[#e4f3ec] overflow-hidden border-b border-teal-100/70">
        {/* Style Variant 4: Diagonal Architectural Micro-Lines + Central Path Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-lines-diagonal mask-radial-faded pointer-events-none opacity-60" />
          <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-[#1CB6E6]/18 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-[#00B771]/16 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          {/* Section Header */}
          <div className="text-center flex flex-col items-center justify-center mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
              <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
                Career Journey &amp; Leadership
              </span>
              <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] tracking-tight max-w-2xl leading-snug">
              Distinguished Professional Experience
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
              Accumulated over 19+ years of surgical excellence across India’s premier institutes, hospitals and super-specialty departments.
            </p>
          </div>

          {/* Connected Timeline List */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#00B771]/30 space-y-8 sm:space-y-10">
            {experienceData.map((item, index) => (
              <div
                key={index}
                className="relative group bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-teal-100 shadow-[0_6px_25px_rgba(20,150,170,0.06)] hover:shadow-[0_14px_35px_rgba(20,150,170,0.14)] hover:border-[#00B771]/50 transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Glowing Node Dot on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full bg-white border-4 border-[#00B771] shadow-[0_0_12px_rgba(0,183,113,0.6)] group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${item.typeColor}`}>
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                      <FaBriefcase className="text-[#00B771] text-xs" />
                      {item.period}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#112340] group-hover:text-[#00B771] transition-colors leading-snug">
                  {item.role}
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-[#0e6b56] mt-0.5 flex items-center gap-1.5">
                  <FaHospitalAlt className="text-xs" />
                  {item.institution}
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 5: CONTACT & CONNECT CHANNELS (MICRO CROSS MATRIX)
          ======================================================== */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#e8f6f0] via-[#f7fbf9] to-[#dff0e7] overflow-hidden border-b border-teal-100/70">
        {/* Style Variant 5: Subtle Micro Cross Matrix + Wide Center Spotlight */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-cross-matrix mask-radial-faded pointer-events-none opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-gradient-to-r from-[#1CB6E6]/18 via-teal-100/25 to-[#00B771]/18 rounded-full blur-[100px]" />
          <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-[#1CB6E6]/18 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] bg-[#00B771]/18 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
                <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
                  Direct Connectivity
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#112340] tracking-tight">
                Get in Touch &amp; Consult
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
              Reach out for OPD consultations, second surgical opinions, and surgical queries across our direct channels.
            </p>
          </div>

          {/* Standalone Contact Cards 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1: Location */}
            <a
              href="https://www.google.com/maps/dir//Dr+Manas+Aggarwal+-+Best+Gastroenterologist+Gomti+Nagar+Lucknow"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white border border-teal-100 flex items-center justify-center text-lg transition-all duration-300 shadow-2xs">
                    <FaMapMarkerAlt />
                  </div>
                  <span className="text-[11px] font-bold text-[#0e6b56] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    Clinic Location
                  </span>
                </div>

                <h3 className="font-bold text-[#112340] text-lg group-hover:text-[#00B771] transition-colors leading-snug">
                  Chandan Hospital
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                  Faizabad Rd, Vijayant Khand, Gomti Nagar, Lucknow, UP 226010
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00B771] group-hover:text-[#009b60] transition-colors">
                  <span>View on Google Maps</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>

            {/* Card 2: Phone */}
            <a
              href="tel:+918318208837"
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white border border-teal-100 flex items-center justify-center text-lg transition-all duration-300 shadow-2xs">
                    <FaPhoneAlt />
                  </div>
                  <span className="text-[11px] font-bold text-[#0e6b56] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    Direct Helpline
                  </span>
                </div>

                <h3 className="font-bold text-[#112340] text-lg group-hover:text-[#00B771] transition-colors leading-snug">
                  Phone &amp; Appointments
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                  Connect directly for priority consultations, second opinions &amp; urgent bookings.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00B771] group-hover:text-[#009b60] transition-colors">
                  <span>+91-8318208837</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>

            {/* Card 3: Email */}
            <a
              href="mailto:aggarwal.manas@gmail.com"
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-teal-100 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-[#00B771] text-[#00B771] group-hover:text-white border border-teal-100 flex items-center justify-center text-lg transition-all duration-300 shadow-2xs">
                    <FaEnvelope />
                  </div>
                  <span className="text-[11px] font-bold text-[#0e6b56] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    Official Email
                  </span>
                </div>

                <h3 className="font-bold text-[#112340] text-lg group-hover:text-[#00B771] transition-colors leading-snug">
                  Online Medical Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                  Send clinical reports, patient case histories &amp; second opinion inquiries online.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00B771] group-hover:text-[#009b60] transition-colors break-all">
                  <span>aggarwal.manas@gmail.com</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </a>
          </div>

          {/* Social Channels Strip */}
          <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8 border border-teal-100 shadow-[0_8px_30px_rgba(20,150,170,0.06)] relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#0e6b56] text-xs font-semibold mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] animate-pulse" />
                  <span>Verified Social Channels</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#112340] tracking-tight">
                  Connect With Dr. Manas Aggarwal Online
                </h3>
                <p className="text-xs sm:text-[0.88rem] text-gray-500 mt-1 max-w-lg leading-relaxed">
                  Follow for regular health tips, patient awareness videos &amp; surgical insights.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow on ${social.name}`}
                    className={`group/btn flex items-center gap-2.5 px-4 py-2.5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/80 ${social.hoverBorder} shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    <span className={`w-8 h-8 rounded-xl ${social.iconBg} flex items-center justify-center text-sm shadow-xs transition-transform duration-300 group-hover/btn:scale-110`}>
                      {social.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover/btn:text-gray-900 transition-colors">
                      {social.name}
                    </span>
                    <span className="text-xs text-gray-400 group-hover/btn:text-[#00B771] group-hover/btn:translate-x-0.5 transition-all">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION 6: FREQUENTLY ASKED QUESTIONS
          ======================================================== */}
      <FaqSection />

      {/* ========================================================
          SECTION 7: CTA (BOOKING CONSULTATION BANNER)
          ======================================================== */}
      <BookNowSection />

    </div>
  );
};

export default DoctorAbout;
