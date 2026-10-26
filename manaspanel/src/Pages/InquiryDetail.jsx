import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaUser,
  FaCommentDots,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaBriefcaseMedical
} from 'react-icons/fa';
import { deleteInquiry } from '../redux/slices/dynamicSlice';
import { confirmDelete, showToast } from '../helper/sweetAlert';

const InquiryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = location || {};
  const { inquiry } = state || {};

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDelete({
      title: 'Delete Inquiry?',
      text: 'Are you sure you want to delete this inquiry? This action cannot be undone.',
      confirmButtonText: 'Yes, Delete',
    });

    if (isConfirmed) {
      const response = await dispatch(deleteInquiry(id));
      if (response?.payload) {
        showToast({
          icon: 'success',
          title: 'Inquiry deleted successfully',
        });
        navigate('/inquiry');
      }
    }
  };

  if (!inquiry) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <FaUser className="text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">No Inquiry Details Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested inquiry record is not available or the page was reloaded.
        </p>
        <button
          onClick={() => navigate('/inquiry')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition cursor-pointer"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Inquiries List</span>
        </button>
      </div>
    );
  }

  const formattedDate = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : inquiry.updatedAt
    ? new Date(inquiry.updatedAt).toLocaleDateString('en-GB')
    : '—';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigate('/inquiry')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 mb-1.5 transition cursor-pointer"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Inquiries</span>
          </button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Inquiry Information
          </h1>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {inquiry.email && (
            <a
              href={`mailto:${inquiry.email}`}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold transition cursor-pointer"
              title="Reply by Email"
            >
              <FaEnvelope className="text-xs" />
              <span>Send Email</span>
            </a>
          )}
          {inquiry.phoneNumber && (
            <a
              href={`tel:${inquiry.phoneNumber}`}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-xs font-bold transition cursor-pointer"
              title="Call Phone"
            >
              <FaPhoneAlt className="text-xs" />
              <span>Call Now</span>
            </a>
          )}
          <button
            onClick={() => handleDelete(inquiry._id)}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-bold transition cursor-pointer"
            title="Delete Inquiry"
          >
            <FaTrashAlt className="text-xs" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
        {/* Card Header Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-[#1E1E2D] to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 border-2 border-white/20 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md shrink-0">
              {inquiry.fullName ? (
                inquiry.fullName.charAt(0).toUpperCase()
              ) : (
                <FaUser />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white truncate">
                  {inquiry.fullName || 'Anonymous Patient'}
                </h2>
                <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  New Lead
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <FaCalendarAlt className="text-indigo-400 text-xs" />
                <span>Received on {formattedDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information & Concern Grid */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 border-b border-slate-200 bg-slate-50/50">
          {/* Email */}
          <div className="p-3.5 sm:p-4 bg-white border border-slate-200 flex items-start gap-3">
            <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 shrink-0 border border-indigo-100">
              <FaEnvelope className="text-base sm:text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </span>
              {inquiry.email ? (
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 break-all inline-flex items-center gap-1.5 mt-0.5"
                >
                  <span>{inquiry.email}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              ) : (
                <span className="text-xs sm:text-sm text-slate-400 italic">Not provided</span>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="p-3.5 sm:p-4 bg-white border border-slate-200 flex items-start gap-3">
            <div className="p-2.5 sm:p-3 bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
              <FaPhoneAlt className="text-base sm:text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Phone Number
              </span>
              {inquiry.phoneNumber ? (
                <a
                  href={`tel:${inquiry.phoneNumber}`}
                  className="text-xs sm:text-sm font-bold text-slate-800 hover:text-emerald-700 font-mono inline-flex items-center gap-1.5 mt-0.5"
                >
                  <span>{inquiry.phoneNumber}</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              ) : (
                <span className="text-xs sm:text-sm text-slate-400 italic">Not provided</span>
              )}
            </div>
          </div>

          {/* Procedure / Concern */}
          <div className="p-3.5 sm:p-4 bg-white border border-slate-200 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
            <div className="p-2.5 sm:p-3 bg-teal-50 text-teal-600 shrink-0 border border-teal-100">
              <FaBriefcaseMedical className="text-base sm:text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Procedure / Concern
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 block break-words">
                {inquiry.concern || "General Consultation"}
              </span>
            </div>
          </div>
        </div>

        {/* Message Content Section */}
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-700">
            <FaCommentDots className="text-indigo-600 text-base sm:text-lg" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              Patient / Visitor Message
            </h3>
          </div>

          <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 min-h-[120px] overflow-hidden break-words">
            {inquiry.message ? (
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-normal break-words break-all">
                {inquiry.message}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-400 italic">No message text provided.</p>
            )}
          </div>
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-100/70 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={() => navigate('/inquiry')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Inquiry List</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {inquiry.email && (
              <a
                href={`mailto:${inquiry.email}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <FaEnvelope className="text-xs" />
                <span>Reply by Email</span>
              </a>
            )}
            {inquiry.phoneNumber && (
              <a
                href={`tel:${inquiry.phoneNumber}`}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <FaPhoneAlt className="text-xs" />
                <span>Call Patient</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
