import React, { useEffect } from 'react';
import HomeLayout from '../Component/HomeLayout';
import { FaHome, FaPlaceOfWorship } from 'react-icons/fa';
import { MdContactPhone, MdOutlineRoundaboutRight, MdReviews } from 'react-icons/md';
import WebsiteContentCard from './WebsiteContentCard';
import { GrGallery } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPages } from '../redux/slices/dynamicSlice';
import { Link } from 'react-router-dom';

const WebsiteContent = () => {
    const dispatch = useDispatch();
    const { dynamicPage } = useSelector((state) => state.dynamic);

    useEffect(() => {
        dispatch(getAllPages());
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className='p-4'>
                {/* Heading with Add New Content Button */}
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-bold'>Website Content</h1>
                    <Link to="/add-content" className='bg-[#655CCE] text-white font-semibold py-2 px-4 rounded hover:bg-[#3D4056]'>
                        Add New Parent
                    </Link>
                </div>

                {/* Card Container */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {dynamicPage.map((data, index) => (
                        <WebsiteContentCard data={data} key={index} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default WebsiteContent;
