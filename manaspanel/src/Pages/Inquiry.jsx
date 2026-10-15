import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaSyncAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteInquiry, getInquiry } from '../redux/slices/dynamicSlice';

const ITEMS_PER_PAGE = 10;

const Inquiry = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic);
  const navigate = useNavigate();

  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByEmail, setFilterByEmail] = useState('');
  const [filterByPhone, setFilterByPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInquiries = () => {
    dispatch(getInquiry());
  };

  useEffect(() => {
    fetchInquiries();
  }, [dispatch]);

  // Filter effect + sort latest first + reset to page 1 on filter change
  useEffect(() => {
    let sorted = [...(inquiryList || [])].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return String(b._id || '').localeCompare(String(a._id || ''));
    });

    if (filterByName.trim()) {
      sorted = sorted.filter((inquiry) =>
        inquiry.fullName?.toLowerCase().includes(filterByName.trim().toLowerCase())
      );
    }

    if (filterByEmail.trim()) {
      sorted = sorted.filter((inquiry) =>
        inquiry.email?.toLowerCase().includes(filterByEmail.trim().toLowerCase())
      );
    }

    if (filterByPhone.trim()) {
      sorted = sorted.filter((inquiry) =>
        inquiry.phoneNumber?.includes(filterByPhone.trim())
      );
    }

    setFilteredInquiries(sorted);
    setCurrentPage(1);
  }, [filterByName, filterByEmail, filterByPhone, inquiryList]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const response = await dispatch(deleteInquiry(id));
      if (response?.payload) {
        dispatch(getInquiry());
      }
    }
  };

  const handleClearFilters = () => {
    setFilterByName('');
    setFilterByEmail('');
    setFilterByPhone('');
  };

  const hasActiveFilters = Boolean(filterByName || filterByEmail || filterByPhone);

  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInquiries = filteredInquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Inquiry List
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filteredInquiries.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage, filter, and view details of patient and customer inquiries
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer flex items-center gap-1.5"
            >
              <FaTimes className="text-xs text-slate-500" />
              <span>Clear Filters</span>
            </button>
          )}
          <button
            onClick={fetchInquiries}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition cursor-pointer flex items-center gap-1.5"
            title="Refresh Inquiries"
          >
            <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5 p-3.5 bg-slate-50/70 border border-slate-200">
        {/* Filter by Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Name
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by name..."
              value={filterByName}
              onChange={(e) => setFilterByName(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-none text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter by Email */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by email..."
              value={filterByEmail}
              onChange={(e) => setFilterByEmail(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-none text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter by Phone */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Phone Number
          </label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by phone number..."
              value={filterByPhone}
              onChange={(e) => setFilterByPhone(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-none text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Table Section with subtle grid borders and no border-radius */}
      <div className="overflow-x-auto border border-slate-300 rounded-none bg-white">
        <table className="w-full border-collapse text-center text-sm">
          <thead className="bg-[#1E1E2D] text-white">
            <tr className="uppercase text-[11px] font-bold tracking-wider">
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white w-14 whitespace-nowrap">
                SR NO
              </th>
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white whitespace-nowrap w-24">
                ACTION
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                FULL NAME
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                EMAIL
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                PHONE NUMBER
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white">
                MESSAGE
              </th>
              <th className="py-3 px-4 text-center text-white whitespace-nowrap w-28">
                DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                  <div className="inline-flex items-center gap-2">
                    <FaSyncAlt className="animate-spin text-indigo-600 text-base" />
                    <span>Loading inquiries...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-red-500 font-medium">
                  Error loading inquiries. Please refresh the page.
                </td>
              </tr>
            ) : currentInquiries.length > 0 ? (
              currentInquiries.map((inquiry, index) => {
                const serialNumber = startIndex + index + 1;
                return (
                  <tr
                    key={inquiry._id || index}
                    className="hover:bg-indigo-50/40 transition-colors duration-150 odd:bg-white even:bg-slate-50/40"
                  >
                    {/* 1. SR NO */}
                    <td className="py-3 px-3 border border-slate-200 text-center font-semibold text-slate-600 text-xs bg-slate-50/50 whitespace-nowrap">
                      {serialNumber}
                    </td>

                    {/* 2. ACTION (Icon only) */}
                    <td className="py-3 px-3 border border-slate-200 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate('/inquiry/detail', { state: { inquiry } })}
                          className="w-8 h-8 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 flex items-center justify-center transition cursor-pointer shadow-2xs"
                          title="View Details"
                          aria-label="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="w-8 h-8 rounded bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 flex items-center justify-center transition cursor-pointer shadow-2xs"
                          title="Delete Inquiry"
                          aria-label="Delete Inquiry"
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </td>

                    {/* 3. FULL NAME */}
                    <td className="py-3 px-4 border border-slate-200 font-semibold text-slate-800 whitespace-nowrap text-center">
                      {inquiry.fullName || '—'}
                    </td>

                    {/* 4. EMAIL */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-600 whitespace-nowrap text-center">
                      {inquiry.email || '—'}
                    </td>

                    {/* 5. PHONE NUMBER */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-700 font-mono text-xs whitespace-nowrap text-center">
                      {inquiry.phoneNumber || '—'}
                    </td>

                    {/* 6. MESSAGE */}
                    <td
                      className="py-3 px-4 border border-slate-200 text-slate-600 max-w-xs md:max-w-md truncate text-center"
                      title={inquiry.message}
                    >
                      {inquiry.message || '—'}
                    </td>

                    {/* 7. DATE */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-500 whitespace-nowrap text-xs font-medium text-center">
                      {inquiry.createdAt
                        ? new Date(inquiry.createdAt).toLocaleDateString('en-GB')
                        : '—'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-12 px-4 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-base font-semibold text-slate-600">No inquiries found</p>
                    <p className="text-xs text-slate-400">
                      {hasActiveFilters
                        ? 'Try adjusting your search filters to find what you are looking for.'
                        : 'No inquiries have been received yet.'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={handleClearFilters}
                        className="mt-2 px-3 py-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium underline cursor-pointer"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-slate-200 gap-3">
        <p className="text-xs text-slate-600">
          Showing{' '}
          <span className="font-bold text-slate-800">
            {filteredInquiries.length > 0 ? startIndex + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-bold text-slate-800">
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredInquiries.length)}
          </span>{' '}
          of{' '}
          <span className="font-bold text-slate-800">{filteredInquiries.length}</span> entries
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 rounded-none"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Previous</span>
          </button>

          {/* Page Number indicator / buttons */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-1 text-slate-400 text-xs">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-8 h-7 text-xs font-semibold border transition cursor-pointer rounded-none ${
                        currentPage === page
                          ? 'bg-[#1E1E2D] text-white border-[#1E1E2D]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 rounded-none"
          >
            <span>Next</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
