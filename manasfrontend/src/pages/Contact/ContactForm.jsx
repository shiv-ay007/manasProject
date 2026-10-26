import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { submitInquiry } from "../../redux/Slice/Parent.slice";
import BreadCrumbs from "../../Component/BreadCums";
import contactHeroBg from "../../assets/contact-hero-bg.jpg";

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
      url: `https://wa.me/918318208837?text=${encodeURIComponent(
        "Hello Dr. Manas Aggarwal, I would like to consult with you."
      )}`,
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      // Allow only letters and spaces (blocks numbers and symbols)
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));

      if (lettersOnly.trim().length >= 3) {
        setErrors((prev) => ({ ...prev, fullName: "" }));
      }
      return;
    }

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));

      if (numericValue.length > 0) {
        if (numericValue.length < 10) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber: "Phone number must be 10 digits",
          }));
        } else if (!validatePhone(numericValue)) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber: "Phone must start with 6, 7, 8, or 9",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phoneNumber: "" }));
        }
      } else {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "fullName" && value.trim().length >= 3) {
        setErrors((prev) => ({ ...prev, fullName: "" }));
      }

      if (name === "email" && validateEmail(value.trim())) {
        setErrors((prev) => ({ ...prev, email: "" }));
      }

      if (name === "message" && value.trim().length >= 10) {
        setErrors((prev) => ({ ...prev, message: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name (minimum 3 characters)";
    }

    if (
      !formData.phoneNumber ||
      formData.phoneNumber.length !== 10 ||
      !validatePhone(formData.phoneNumber)
    ) {
      newErrors.phoneNumber =
        "Please enter a valid 10-digit Indian phone number (starting with 6-9)";
    }

    if (!formData.email || !validateEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Please write a brief medical query or message (minimum 10 characters)";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    const errorKeys = Object.keys(formErrors);

    if (errorKeys.length > 0) {
      const firstErrorMessage = formErrors[errorKeys[0]];
      toast.error(firstErrorMessage, {
        id: "contact-form-error",
      });
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await dispatch(submitInquiry(formData));

      if (
        response?.payload?.data ||
        response?.meta?.requestStatus === "fulfilled" ||
        response?.payload?.success
      ) {
        setIsSuccess(true);
        toast.success(
          "Thank you! Your inquiry has been sent successfully. Dr. Manas Aggarwal's team will contact you shortly.",
          {
            id: "contact-form-success",
            duration: 5000,
          }
        );

        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          concern: "",
          message: "",
        });
        setErrors({});

        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        const errorMsg =
          response?.payload?.message || "Failed to submit inquiry. Please try again.";
        toast.error(errorMsg, { id: "contact-form-error" });
      }
    } catch (err) {
      console.error("Submission failed", err);
      toast.error(
        "Network error. Please check your internet connection or call our clinic directly.",
        { id: "contact-form-error" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us - Dr. Manas Aggarwal";
  }, []);

  return (
    <section className="bg-[#f8fbfb] min-h-screen text-slate-800">
      <Helmet>
        <title>Contact Us - Dr. Manas Aggarwal</title>
        <meta
          name="description"
          content="Get in touch with Dr. Manas Aggarwal for consultations, second opinions, and appointments regarding surgical gastroenterology and liver health in Lucknow."
        />
        <meta
          name="keywords"
          content="Contact Dr. Manas Aggarwal, Gastroenterology Surgeon Lucknow, Book Appointment, Clinic Location, Phone Number"
        />
        <meta property="og:title" content="Contact Us - Dr. Manas Aggarwal" />
        <meta
          property="og:description"
          content="Get in touch with Dr. Manas Aggarwal for consultations and inquiries regarding surgical gastroenterology in Lucknow."
        />
      </Helmet>

      <BreadCrumbs
        headText={"Contact Us"}
        items={breadcrumbItems}
        image={contactHeroBg}
      />

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
                        Mon – Sat: 9:00 AM – 5:00 PM{" "}
                        <span className="text-teal-300 font-semibold">
                          (By Appointment)
                        </span>
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

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
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
                        onKeyDown={(e) => {
                          if (/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm outline-none transition-all duration-200 ${
                          errors.fullName
                            ? "bg-red-50/20 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "bg-slate-50 border-slate-200 focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">
                          {errors.fullName}
                        </p>
                      )}
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
                        placeholder="10 digits (e.g. 9876543210)"
                        className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm outline-none transition-all duration-200 ${
                          errors.phoneNumber
                            ? "bg-red-50/20 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "bg-slate-50 border-slate-200 focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20"
                        }`}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">
                          {errors.phoneNumber}
                        </p>
                      )}
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
                        className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm outline-none transition-all duration-200 ${
                          errors.email
                            ? "bg-red-50/20 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "bg-slate-50 border-slate-200 focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
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
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm outline-none transition-all duration-200 resize-none ${
                        errors.message
                          ? "bg-red-50/20 border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                          : "bg-slate-50 border-slate-200 focus:bg-white focus:border-[#00B771] focus:ring-2 focus:ring-[#00B771]/20"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-[11px] mt-1 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00b26b] to-[#00B771] hover:from-[#009e5f] hover:to-[#00a867] text-white font-bold text-sm shadow-[0_8px_20px_rgba(0,183,113,0.3)] hover:shadow-[0_12px_28px_rgba(0,183,113,0.42)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
