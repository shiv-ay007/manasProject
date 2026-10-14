import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { FiX, FiPhone, FiMail, FiUser, FiCheckCircle } from "react-icons/fi";

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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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

  // Phone validation function
  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle phone validation on change
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      const limitedValue = numericValue.slice(0, 10); // Limit to 10 digits

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
            phone: "Phone number must start with 6, 7, 8, or 9",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "" }));
        }
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrors({});

    try {
      const res = await axios.post(
        "https://db.drmanasaggarwal.com/api/v1/appointement",
        formData
      );

      if (res.status === 200 || res.status === 201) {
        setMessage(
          "✅ Appointment request submitted successfully! We will contact you soon."
        );
        setFormData({
          fname: "",
          lname: "",
          phone: "",
          email: "",
          patientType: "",
          reason: "",
          description: "",
        });

        setTimeout(() => {
          setIsOpen(false);
          setMessage("");
        }, 2200);
      }
    } catch (error) {
      console.error("Submission error:", error);

      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setMessage("❌ Please check your information and try again.");
        } else if (status === 500) {
          setMessage("❌ Server error. Please try again later.");
        } else {
          setMessage("❌ Something went wrong. Please try again.");
        }
      } else if (error.request) {
        setMessage(
          "❌ Network error. Please check your connection and try again."
        );
      } else {
        setMessage(
          "❌ Failed to submit appointment request. Please try again."
        );
      }
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
        {/* Subtle top decoration bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#00B771]" />

        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <FiX className="text-lg" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-[#00B771] uppercase tracking-wider block mb-1">
            Free Callback Assistance
          </span>
          <h2 className="text-2xl sm:text-[1.7rem] font-bold text-[#112340]">
            Request a Callback
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fill in your details and our medical coordinator will call you back shortly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20 outline-none transition-all text-gray-800"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digits (e.g. 9876543210)"
                required
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all text-gray-800 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
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
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[#1CB6E6] focus:ring-2 focus:ring-[#1CB6E6]/20 outline-none transition-all text-gray-800"
              />
            </div>

            {/* Patient Type */}
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

            {/* Brief Detail */}
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
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="consent"
              className="mt-1 w-4 h-4 rounded text-[#1CB6E6] focus:ring-[#1CB6E6] border-gray-300 cursor-pointer"
              required
            />
            <label htmlFor="consent" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
              By submitting, you authorize Dr. Manas Aggarwal’s team to contact you via call or WhatsApp.
            </label>
          </div>

          {/* Alert Message */}
          {message && (
            <div
              className={`text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium ${
                message.includes("✅")
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || errors.phone}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#1495be] via-[#1CB6E6] to-[#0ea5e9] hover:from-[#18a2cd] hover:via-[#30c0ec] hover:to-[#1CB6E6] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#1CB6E6]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
          >
            {loading ? "Submitting Request..." : "Request a Callback Now →"}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <div className={classes ? classes : (children ? "inline-block w-auto" : "inline-block")}>
      {/* Button to open modal */}
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

      {/* Render Modal into document.body to prevent any container clipping */}
      {typeof document !== "undefined" && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
}
