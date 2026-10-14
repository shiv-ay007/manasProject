import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteInquiry, getInquiry } from '../redux/slices/dynamicSlice';

const ITEMS_PER_PAGE = 10; // Set the number of inquiries to display per page

const Inquiry = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic);
  const navigate = useNavigate();

  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filterByEmail, setFilterByEmail] = useState('');
  const [filterByPhone, setFilterByPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInquiry());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let filtered = inquiryList || [];

    if (filterByEmail) {
      filtered = filtered.filter((inquiry) => inquiry.email.includes(filterByEmail));
    }

    if (filterByPhone) {
      filtered = filtered.filter((inquiry) => inquiry.phoneNumber.includes(filterByPhone));
    }

    setFilteredInquiries(filtered);
  }, [filterByEmail, filterByPhone, inquiryList]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      const response = await dispatch(deleteInquiry(id));
      if (response?.payload) {
        dispatch(getInquiry()); // Refresh inquiries after deletion
      }
    }
  };

  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE); // Calculate total pages
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // Calculate start index for slicing
  const currentInquiries = filteredInquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE); // Slice the inquiries for the current page

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (error) {
    return <p>Error loading inquiries...</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500 font-medium text-lg">
        Loading inquiries...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Inquiry List</h1>

        {/* Filter section */}
        <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Filter by email"
            value={filterByEmail}
            onChange={(e) => setFilterByEmail(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3 md:mr-2"
          />
          <input
            type="text"
            placeholder="Filter by phone number"
            value={filterByPhone}
            onChange={(e) => setFilterByPhone(e.target.value)}
            className="p-2 border rounded w-full md:w-1/3"
          />
        </div>

        {/* Inquiry Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full bg-white divide-y divide-slate-100">
            <thead className="bg-[#1E1E2D] text-white">
              <tr className="uppercase text-[11px] font-bold tracking-wider text-slate-200">
                <th className="py-3 px-4 text-left font-bold text-white">Full Name</th>
                <th className="py-3 px-4 text-left font-bold text-white">Email</th>
                <th className="py-3 px-4 text-left font-bold text-white">Phone Number</th>
                <th className="py-3 px-4 text-left font-bold text-white">Message</th>
                <th className="py-3 px-4 text-left font-bold text-white">Date</th>
                <th className="py-3 px-4 text-right font-bold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {currentInquiries.length > 0 ? (
                currentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-slate-50 transition duration-150">
                    <td className="py-3 px-4 text-slate-800 font-semibold">{inquiry.fullName}</td>
                    <td className="py-3 px-4 text-slate-600">{inquiry.email}</td>
                    <td className="py-3 px-4 text-slate-600">{inquiry.phoneNumber}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={inquiry.message}>
                      {inquiry.message?.length > 50 ? `${inquiry.message.substring(0, 50)}...` : inquiry.message}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                          onClick={() => navigate('/inquiry/detail', { state: { inquiry } })}
                        >
                          <FaEye className="text-xs" /> <span>View</span>
                        </button>
                        <button
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                          onClick={() => handleDelete(inquiry._id)}
                        >
                          <FaTrashAlt className="text-xs" /> <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 px-4 text-center text-slate-400">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modern Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-3 border-t border-slate-100 gap-3">
          <p className="text-xs text-slate-500">
            Showing <span className="font-bold text-slate-700">{filteredInquiries.length > 0 ? startIndex + 1 : 0}</span> to{' '}
            <span className="font-bold text-slate-700">{Math.min(startIndex + ITEMS_PER_PAGE, filteredInquiries.length)}</span> of{' '}
            <span className="font-bold text-slate-700">{filteredInquiries.length}</span> inquiries
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-xl border border-indigo-100">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default Inquiry;
