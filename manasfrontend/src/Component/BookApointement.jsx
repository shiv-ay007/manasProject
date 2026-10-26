import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiX, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import axiosInstance1 from "../helper/axiosInstace";

export default function CallbackModal({ classes, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    patientType: "",
    reason: "",
    description: "",
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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

    if (name === "fname" || name === "lname") {
      // Allow only letters and spaces (blocks numbers and symbols)
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));

      if (name === "fname" && lettersOnly.trim().length >= 3) {
        setErrors((prev) => ({ ...prev, fname: "" }));
      }
      return;
    }

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      const limitedValue = numericValue.slice(0, 10);

      setFormData((prev) => ({ ...prev, [name]: limitedValue }));

      if (limitedValue.length > 0) {
        if (limitedValue.length < 10) {
          setErrors((prev) => ({
            ...prev,
            phone: "Phone number must be 10 digits",
          }));
        } else if (!validatePhone(limitedValue)) {
          setErrors((prev) => ({
            ...prev,
            phone: "Phone must start with 6, 7, 8, or 9",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "" }));
        }
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "fname" && value.trim().length >= 3) {
        setErrors((prev) => ({ ...prev, fname: "" }));
      }

      if (name === "email" && value.trim()) {
        if (validateEmail(value.trim())) {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
      }
    }
  };

  const validateForm = () => {
    const errs = {};

    if (!formData.fname || formData.fname.trim().length < 3) {
      errs.fname = "Please enter your full name (minimum 3 characters)";
    }

    if (!formData.phone || formData.phone.length !== 10 || !validatePhone(formData.phone)) {
      errs.phone = "Please enter a valid 10-digit Indian phone number (starting with 6-9)";
    }

    if (formData.email && formData.email.trim().length > 0) {
      if (!validateEmail(formData.email.trim())) {
        errs.email = "Please enter a valid email address";
      }
    }

    if (!consent) {
      errs.consent = "Please authorize Dr. Manas Aggarwal's team by checking this box";
    }

    setErrors(errs);
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    const errorKeys = Object.keys(formErrors);

    if (errorKeys.length > 0) {
      const firstErrorMessage = formErrors[errorKeys[0]];
      toast.error(firstErrorMessage, {
        id: "callback-form-error",
      });
      return;
    }

    setLoading(true);

    try {
      let res;
      try {
        res = await axiosInstance1.post("/appointement", formData);
      } catch (instErr) {
        // Fallback to direct Render backend URL
        res = await axios.post(
          "https://dr-manas-backend-gpg1.onrender.com/api/v1/appointement",
          formData
        );
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(
          "Callback request submitted successfully! Dr. Manas Aggarwal's team will contact you shortly.",
          {
            id: "callback-form-success",
            duration: 5000,
          }
        );

        // Reset form
        setFormData({
          fname: "",
          lname: "",
          phone: "",
          email: "",
          patientType: "",
          reason: "",
          description: "",
        });
        setConsent(false);
        setErrors({});

        // Close modal after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Submission error:", error);

      let errorMsg = "Something went wrong. Please try again or call us directly.";
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      toast.error(errorMsg, {
        id: "callback-form-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-8 relative border border-teal-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#00B771]" />

        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FiX className="text-lg" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-[#00B771] uppercase tracking-wider block mb-1">
            Free Callback Assistance
          </span>
          <h2 className="text-2xl sm:text-[1.7rem] font-serif font-bold text-[#112340]">
            Request a Callback
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fill in your details and our medical coordinator will call you back shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all text-gray-800 ${
                  errors.fname
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                    : "border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20"
                }`}
              />
              {errors.fname && (
                <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.fname}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digits (e.g. 9876543210)"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all text-gray-800 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                    : "border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@example.com"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all text-gray-800 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20"
                    : "border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Patient Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Patient Status
              </label>
              <select
                name="patientType"
                value={formData.patientType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="">Are you a new or existing patient?</option>
                <option value="new">New Patient</option>
                <option value="existing">Existing Patient</option>
              </select>
            </div>

            {/* Reason for Call */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Reason for Call
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20 outline-none transition-all text-gray-800 bg-white"
              >
                <option value="">Select reason</option>
                <option value="appointment">Doctor Appointment</option>
                <option value="second_opinion">Second Opinion</option>
                <option value="surgery_guidance">Surgery Consultation</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            {/* Brief Concern */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Brief Concern
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Gallbladder, Hernia, Liver"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20 outline-none transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-1">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) {
                    setErrors((prev) => ({ ...prev, consent: "" }));
                  }
                }}
                className={`mt-1 w-4 h-4 rounded text-[#1CB6E6] focus:ring-[#1CB6E6] cursor-pointer ${
                  errors.consent ? "border-red-500 ring-2 ring-red-200" : "border-gray-300"
                }`}
              />
              <label htmlFor="consent" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                By submitting, you authorize Dr. Manas Aggarwal’s team to contact you via call or WhatsApp. <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-[11px] mt-1 pl-6 font-medium">{errors.consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#0ea5e9] hover:from-[#18a2cd] hover:via-[#30c0ec] hover:to-[#1CB6E6] text-white font-serif font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#1CB6E6]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Submitting Request...
              </>
            ) : (
              "Request a Callback Now →"
            )}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <div className={classes ? classes : children ? "inline-block w-auto" : "inline-block"}>
      {children ? (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer w-full">
          {children}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`button ${classes || ""}`}
        >
          <span>Request a Callback</span>
        </button>
      )}

      {/* Render Modal via Portal */}
      {typeof document !== "undefined" && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
}
