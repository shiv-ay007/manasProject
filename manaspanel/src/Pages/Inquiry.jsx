import React, { useEffect, useState } from 'react';
import HomeLayout from '../Component/HomeLayout';
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
      <HomeLayout>
        <p>Loading...</p>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="p-6 rounded-lg shadow-md">
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-[#2F3349]">
              <tr>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Full Name</th>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Email</th>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Phone Number</th>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Message</th>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Date</th>
                <th className="py-3 px-4 border-b text-left font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries.length > 0 ? (
                currentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="py-3 px-4 border-b text-gray-800">{inquiry.fullName}</td>
                    <td className="py-3 px-4 border-b text-gray-800">{inquiry.email}</td>
                    <td className="py-3 px-4 border-b text-gray-800">{inquiry.phoneNumber}</td>
                    <td className="py-3 px-4 border-b text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden max-w-xs">
                      {inquiry.message.length > 50 ? `${inquiry.message.substring(0, 50)}...` : inquiry.message}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-800">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b flex space-x-2">
                      {/* View More */}
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/inquiry/detail', { state: { inquiry } })}
                      >
                        <FaEye /> View
                      </button>
                      {/* Delete */}
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(inquiry._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-3 px-4 border-b text-center text-gray-500">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white bg-blue-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Inquiry;
