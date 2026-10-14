import React, { useEffect } from 'react';
import WebsiteContentCard from './WebsiteContentCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPages } from '../redux/slices/dynamicSlice';
import { Link } from 'react-router-dom';

const WebsiteContent = () => {
  const dispatch = useDispatch();
  const { dynamicPage = [] } = useSelector((state) => state.dynamic);

  useEffect(() => {
    dispatch(getAllPages());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* Heading with Add New Content Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Website Content</h1>
        <Link
          to="/add-content"
          className="bg-[#655CCE] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#3D4056] transition"
        >
          Add New Parent
        </Link>
      </div>

      {/* Card Container */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dynamicPage.map((data, index) => (
          <WebsiteContentCard data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default WebsiteContent;
