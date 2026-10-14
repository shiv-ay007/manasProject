import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInquiry, logoutManas } from '../redux/slices/dynamicSlice';
import HomeLayout from '../Component/HomeLayout';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Import icons from React Icons
import { FaSignOutAlt, FaInbox, FaBlog } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone, FiClock, FiUser } from 'react-icons/fi';

import companylogo from '../assets/cclogo.png'

const Home = () => {
  const dispatch = useDispatch();
  const { inquiryList = [], loading, error } = useSelector((state) => state.dynamic);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = async() => {
    const isConfirm=window.confirm("Are you sure,you want to logout")
    if(isConfirm){
      dispatch(logoutManas()); // Correctly dispatch the logoutManas action here
      navigate("/login"); // Optionally, navigate to the login page after logout
    }

  };

  return (
    <HomeLayout>
      <div className="p-8 min-h-screen">
        {/* Overview Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-xl transition-transform duration-300 hover:shadow-2xl">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">Welcome  Dr. Manas Aggarwal</h1>
            </div>
            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200" onClick={()=>handleLogout()}> 
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
            <div>
              <h2 className="text-xl font-semibold">Total Inquiries</h2>
              <p className="text-3xl font-bold">{inquiryList.length}</p>
            </div>
            <FaInbox className="text-4xl" />
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
            <div>
              <h2 className="text-xl font-semibold">Total Blogs</h2>
              <p className="text-3xl font-bold">12</p>
            </div>
            <FaBlog className="text-4xl" />
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-lg shadow-lg flex items-center justify-between text-white transition-transform duration-300 hover:shadow-xl">
            <div>
              <h2 className="text-xl font-semibold">Today Inquiry Today</h2>
              <p className="text-3xl font-bold">5</p>
            </div>
            <MdOutlineEmail className="text-4xl" />
          </div>
        </section>

        {/* Recent Inquiries Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-semibold mb-4">Recent Inquiries</h2>
            {/* <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 transition duration-200"
              onClick={() => (window.location.href = '/inquiry')}
            >
              <FaInbox className="mr-2" />
              View All Inquiries
            </button> */}
          </div>

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
      </div>

      {/* Footer Section */}
      <footer className="bg-[#2F3349] text-white py-4 mt-4">
        <div className="container mx-auto flex items-center justify-center">
          <Link to={"https://www.codecrafter.co.in/"} target='_blank'>
          <img
            src={companylogo} // Replace with your image path
            alt="Developed by Code Crafter Web Solutions"
            className=" h-20"
          />
          </Link>
          <Link to={"https://www.codecrafter.co.in/"} target='_blank'>
          <p className="text-center text-lg">Copyright 2024 Dr. Manas Aggarwal || All Rights Reserved</p>
          </Link>
          {/* <p className="text-center text-sm">© {new Date().getFullYear()} All Rights Reserved</p> */}
        </div>
      </footer>
    </HomeLayout>
  );
};

export default Home;
