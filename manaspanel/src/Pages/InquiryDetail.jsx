import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InquiryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const { state } = location || {};
  const { inquiry } = state || {};

  if (!inquiry) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-md max-w-xl mx-auto mt-8">
        <p className="text-gray-500 mb-4">No inquiry details available</p>
        <button
          onClick={() => navigate('/inquiry')}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
          Back to Inquiries
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-600">Inquiry Details</h2>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
        >
          Previous Page
        </button>
      </div>

      {/* Inquiry Information */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">Full Name:</h3>
          <p className="text-gray-900 mt-1">{inquiry.fullName}</p>
        </div>

        {/* Email */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
          <p className="text-gray-900 mt-1">{inquiry.email}</p>
        </div>

        {/* Phone Number */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">Phone Number:</h3>
          <p className="text-gray-900 mt-1">{inquiry.phoneNumber}</p>
        </div>

        {/* Message */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">Message:</h3>
          <p className="text-gray-900 mt-1 whitespace-pre-wrap">{inquiry.message}</p>
        </div>

        {/* Updated At */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-700">Message Date:</h3>
          <p className="text-gray-900 mt-1">
            {inquiry.updatedAt ? new Date(inquiry.updatedAt).toLocaleDateString() : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
