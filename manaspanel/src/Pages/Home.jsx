import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquiry } from '../redux/slices/dynamicSlice';
// Import icons from React Icons
import { FaInbox, FaBlog } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone, FiUser } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInquiry());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (inquiryList?.length > 0) {
      setRecentInquiries(inquiryList.slice(0, 5));
    }
  }, [inquiryList]);

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500 font-medium text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12 text-red-500 font-medium text-lg">
        Error loading dashboard
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-xl font-semibold opacity-90">Total Inquiries</h2>
            <p className="text-4xl font-bold mt-2">{inquiryList.length}</p>
          </div>
          <FaInbox className="text-5xl opacity-80" />
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-xl shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-xl font-semibold opacity-90">Total Blogs</h2>
            <p className="text-4xl font-bold mt-2">12</p>
          </div>
          <FaBlog className="text-5xl opacity-80" />
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-xl shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
          <div>
            <h2 className="text-xl font-semibold opacity-90">Today Inquiry Today</h2>
            <p className="text-4xl font-bold mt-2">5</p>
          </div>
          <MdOutlineEmail className="text-5xl opacity-80" />
        </div>
      </section>

      {/* Recent Inquiries Section */}
      <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Inquiries</h2>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      <FiUser className="inline-block mr-2 text-gray-400" />
                      {inquiry?.fullName}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      <MdOutlineEmail className="inline-block mr-2 text-gray-400" />
                      {inquiry?.email}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      <FiPhone className="inline-block mr-2 text-gray-400" />
                      {inquiry?.phoneNumber}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {truncateText(inquiry?.message, 50)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry?.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 py-4 text-center">No recent inquiries found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
