import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { FiSend, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { submitInquiry } from "../../redux/Slice/Parent.slice";
import BreadCrumbs from "../../Component/BreadCums";
import contactHeroBg from "../../assets/contact-hero-bg.jpg";
import FaqSection from "../Home/FaqSection";

const ContactForm = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/drmanasaggarwal?mibextid=LQQJ4d&rdid=9uqGCQZ6y2xPH6el&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F5AShzHFdfS4VAe2b%2F%3Fmibextid%3DLQQJ4d",
      color: "bg-[#1877F2] hover:bg-[#0c63d4]",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/drmanasaggarwal/?igsh=MWpmY2FzZWFpcGRpcQ%3D%3D&utm_source=qr",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      label: "Instagram",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@DrManasAggarwal",
      color: "bg-[#FF0000] hover:bg-[#cc0000]",
      label: "YouTube",
    },
    {
      icon: <FaWhatsapp />,
      url: `https://wa.me/918318208837?text=${encodeURIComponent("Hello Dr. Manas Aggarwal, I would like to consult with you.")}`,
      color: "bg-[#25D366] hover:bg-[#1ebc57]",
      label: "WhatsApp",
    },
  ];

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    concern: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await dispatch(submitInquiry(formData));
      if (response?.payload?.data || response?.meta?.requestStatus === "fulfilled") {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          concern: "",
          message: "",
        });
        setTimeout(() => setIsSuccess(false), 6000);
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-[#f8fbfb] min-h-screen text-slate-800">
      <BreadCrumbs headText={"Contact Us"} items={breadcrumbItems} image={contactHeroBg} />

      {/* Main Form & Contact Information Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="relative bg-white rounded-3xl shadow-[0_15px_50px_rgba(20,140,160,0.08)] border border-slate-100 overflow-hidden">
          {/* Subtle Decorative Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-100/40 via-emerald-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
            {/* Left Column: Doctor Info, Direct Contacts, & Schedule (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#112340] via-[#14324f] to-[#0c4a5c] text-white flex flex-col justify-between relative overflow-hidden">
              {/* Geometric Background Accents */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#00B771]/15 blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-[#1CB6E6]/10 blur-xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#00B771] animate-pulse" />
                  Connect with Dr. Manas Aggarwal
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-tight mb-3">
                  Let’s Discuss Your Health &amp; Recovery
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                  Get in touch for OPD consultations, second surgical opinions, and minimally invasive gastrointestinal surgery inquiries at Chandan Hospital, Lucknow.
                </p>

                {/* Contact Information Blocks */}
                <div className="space-y-4">
                  {/* Address */}
                  <a
                    href="https://www.google.com/maps/dir//Dr+Manas+Aggarwal+-+Best+Gastroenterologist+Gomti+Nagar+Lucknow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B771] to-[#1CB6E6] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <FaMapMarkerAlt className="text-white text-base" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-teal-300 tracking-wide uppercase">
                        Clinical OPD Location
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-200 mt-0.5 leading-snug font-medium">
                        Chandan Hospital, Faizabad Rd, Gomti Nagar, Lucknow, UP
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918318208837"
                    className="group flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B771] to-[#1CB6E6] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <FaPhoneAlt className="text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-teal-300 tracking-wide uppercase">
                        Direct Appointment Hotline
                      </h4>
                      <p className="text-sm font-bold text-white mt-0.5 group-hover:text-teal-300 transition-colors">
                        +91-8318208837
                      </p>
                    </div>
                  </a>

                  {/* Timings */}
                  <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B771] to-[#1CB6E6] flex items-center justify-center shrink-0 shadow-md">
                      <FaClock className="text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-teal-300 tracking-wide uppercase">
                        Consultation Timings
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-200 mt-0.5 font-medium">
                        Mon – Sat: 9:00 AM – 5:00 PM <span className="text-teal-300 font-semibold">(By Appointment)</span>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:aggarwal.manas@gmail.com"
                    className="group flex items-start gap-4 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B771] to-[#1CB6E6] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <FaEnvelope className="text-white text-sm" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-teal-300 tracking-wide uppercase">
                        Email Correspondence
                      </h4>
                      <p className="text-xs sm:text-[13px] text-slate-200 mt-0.5 font-medium group-hover:text-teal-300 transition-colors">
                        aggarwal.manas@gmail.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Channels Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                  Follow &amp; Connect On Social Platforms
                </span>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 rounded-xl ${social.color} text-white flex items-center justify-center text-sm shadow-md transition-all duration-300 hover:scale-110`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Premium Modern Interactive Form (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-center">
              <div className="max-w-xl mx-auto w-full">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                      Quick Inquiry &amp; Consultation
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#112340] tracking-tight">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
                    Fill out the form below. Our clinical desk will get back to you promptly to confirm consultation details.
                  </p>
                </div>

                {isSuccess && (
                  <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0e6b56] flex items-center gap-3 animate-fade-in">
                    <FiCheckCircle className="text-xl text-[#00B771] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">
                      Thank you! Your message has been sent successfully. Our team will contact you shortly.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Name and Phone side-by-side on sm+ screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email & Medical Concern */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20 outline-none transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Procedure / Concern
                      </label>
                      <input
                        type="text"
                        name="concern"
                        value={formData.concern}
                        onChange={handleChange}
                        placeholder="e.g. Gallstones, Hernia, Laparoscopy"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message / Medical Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Briefly describe your symptoms, questions, or medical history..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20 outline-none transition-all duration-200 resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00b26b] to-[#00B771] hover:from-[#009e5f] hover:to-[#00a867] text-white font-bold text-sm shadow-[0_8px_20px_rgba(0,183,113,0.3)] hover:shadow-[0_12px_28px_rgba(0,183,113,0.42)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Submitting Your Message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <FiSend className="text-sm" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                    🔒 We respect your privacy. Medical information is kept strictly confidential.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Location & Interactive Google Map Section */}
      <section className="py-8 md:py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6b56]">
                  Clinic &amp; Hospital Location
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#112340] tracking-tight">
                Find Us on Google Maps
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                Easily navigate to Dr. Manas Aggarwal’s department at Chandan Hospital, Faizabad Road, Gomti Nagar, Lucknow.
              </p>
            </div>

            <a
              href="https://www.google.com/maps/dir//Dr+Manas+Aggarwal+-+Best+Gastroenterologist+Gomti+Nagar+Lucknow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-[#00B771] text-[#0e6b56] hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 border border-teal-200/60 shadow-sm shrink-0 self-start md:self-auto"
            >
              <span>Get Driving Directions</span>
              <FiArrowRight className="text-sm" />
            </a>
          </div>

          {/* Interactive Map Embed with Modern Container */}
          <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7117.865288250847!2d81.02269!3d26.873881!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfb781a8e1edf%3A0xbb68c9fe3bbab90b!2sDr%20Manas%20Aggarwal%20-%20Best%20Gastroenterologist%20Gomti%20Nagar%20Lucknow%20%7C%20Gastroenterology%20Cancer%20Surgeon%20Lucknow%20%26%20Piles%20Specialist!5e0!3m2!1sen!2sin!4v1728634517939!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Manas Aggarwal Clinic Location at Chandan Hospital, Lucknow"
            />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <FaqSection />
    </section>
  );
};

export default ContactForm;
