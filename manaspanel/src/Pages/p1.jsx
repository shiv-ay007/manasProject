import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquiry } from '../redux/slices/dynamicSlice'; // Assuming same slice is used for stats too
import HomeLayout from '../Component/HomeLayout';

// Import icons from React Icons
import { FaSignOutAlt, FaInbox, FaBlog } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone, FiClock, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import image from '../assets/logo.png'

const Home = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const navigate=useNavigate()

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

  const truncateText = (text, maxLength) => (text.length > maxLength ? `${text.slice(0, maxLength)}...` : text);
  const today = new Date().toLocaleDateString();
  const timeNow = new Date().toLocaleTimeString();

  if (loading) return <p><HomeLayout>Loading dashboard...</HomeLayout></p>;
  if (error) return <p><HomeLayout>Error loading dashboard</HomeLayout></p>;

  const handleLogout = () => {
    const response=window.confirm("Are you Sure you want to logout")
    if(response){
    localStorage.removeItem('user'); // Example for local storage
    navigate('/login'); // Redirect to the login page
    }
};

  return (
    <HomeLayout>
      <div className="p-6">
        {/* Overview Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center bg-gray-100 p-6 rounded-md shadow">
            <div>
              <h1 className="text-3xl font-semibold">Welcome Dr. Manas Aggarwal</h1>
              <p className="text-lg mt-1">Today: {today}</p>
              <p className="text-lg">Current Time: <FiClock className="inline-block mr-2" />{timeNow}</p>
            </div>
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200" onClick={handleLogout}> 
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Total Inquiries</h2>
              <p className="text-2xl font-bold">{inquiryList.length}</p>
            </div>
            <FaInbox className="text-blue-500 text-3xl" />
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Total Blogs</h2>
              <p className="text-2xl font-bold">12</p>
            </div>
            <FaBlog className="text-green-500 text-3xl" />
          </div>
        </section>

        {/* Recent Inquiries Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Inquiries</h2>
          {recentInquiries.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Full Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Phone Number</th>
                  <th className="py-2 px-4 border-b text-left">Message</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <FiUser className="inline-block mr-2" />
                      {inquiry?.fullName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <MdOutlineEmail className="inline-block mr-2" />
                      {inquiry?.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <FiPhone className="inline-block mr-2" />
                      {inquiry?.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b">{truncateText(inquiry?.message, 50)}</td>
                    <td className="py-2 px-4 border-b">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent inquiries</p>
          )}
        </section>

        {/* Button for viewing all inquiries */}
        <section className="text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition duration-200"
            onClick={() => (window.location.href = '/inquiry')}
          >
            <FaInbox className="mr-2" />
            View All Inquiries
          </button>
        </section>
      </div>
    </HomeLayout>
  );
};

export default Home;
