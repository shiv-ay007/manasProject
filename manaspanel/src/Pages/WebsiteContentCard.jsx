import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LuView } from "react-icons/lu";

const WebsiteContentCard = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col justify-between p-4 border border-gray-300 bg-[#655CCE] rounded-md shadow-sm hover:shadow-md transition-all transform hover:scale-105`}>
            <h2 className='text-lg text-white font-semibold mb-2'>{data.name}</h2>
            <button
                className='mt-auto py-2 text-sm font-normal text-white bg-[#2F3349] rounded-md shadow hover:bg-[#3D4056] flex items-center justify-center gap-2'
                onClick={() => navigate(`/website-content/details/${data.name}`)}
            >
                <LuView className='text-lg' />
                View Now
            </button>
        </div>
    );
}

export default WebsiteContentCard;
