import React from 'react';
import { FaUserMd, FaCheckCircle, FaSyringe, FaStethoscope } from 'react-icons/fa'; // Importing necessary icons
import doctorImage from '../../assets/about/about3.jpg'; // Path to the doctor's image
import backgroundPattern from '../../assets/about/pattern-5.png'; // Path to the background pattern image

const WhatWeDo = () => {
    return (
        <div className="relative flex flex-col lg:flex-row bg-white pb-[7rem] md:pb-[12rem] max-w-7xl mx-auto pt-4"> {/* Set max-width and center */}
            {/* <div className='max-w-7xl flex items-center justify-center'> */}

      
            {/* Left Side Content */}
            <div className="flex-1 z-10 relative p-4 md:p-6 lg:p-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">What We Do</h2>
                <h1 className="mb-2">We Deliver Quality Care Giving Services</h1>
                <p className="text-lg mb-4 text-gray-600 leading-relaxed">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <div className="flex items-start gap-[2rem]">
                    {/* Left Side: Stethoscope Icon */}
                    <div className="text-green-700">
                        <FaStethoscope className="text-7xl" />
                    </div>

                    {/* Right Side: Text Content */}
                    <div className="w-1/2">
                        <h4 className="text-lg font-semibold mb-2 text-gray-800">Infection Prevention</h4>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            There are many variations of passages of Lorem Ipsum available majority.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side Image with Absolute Overlay */}
            <div className="flex-1 relative">
                <img 
                    src={doctorImage} 
                    alt="Doctor's Team" 
                    className="w-full h-auto  rounded-lg shadow-lg"
                />
                
                {/* Blue Background Div */}
                <div className=" hidden sm:flex absolute bottom-[-14%] xl:bottom-[10%] left-1/2 transform -translate-x-1/2 lg:left-[27%] bg-[rgb(18,74,148)] bg-opacity-75 items-center justify-center lg:p-8 p-6 rounded-lg shadow-lg w-full lg:w-auto">
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${backgroundPattern})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.5,
                            zIndex: 0,
                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative text-center text-white flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 z-10">
                        {/* Doctor's Experience */}
                        <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
                            <FaUserMd className="text-4xl sm:text-5xl lg:text-6xl mr-0 lg:mr-4 mb-2 lg:mb-0" />
                            <div className="text-center lg:text-left">
                                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">+ 350</h4>
                                <p className="text-md sm:text-lg lg:text-xl font-bold">Doctor’s Experience</p>
                            </div>
                        </div>

                        {/* Successful Missions */}
                        <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
                            <FaCheckCircle className="text-4xl sm:text-5xl lg:text-6xl mr-0 lg:mr-4 mb-2 lg:mb-0" />
                            <div className="text-center lg:text-left">
                                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">+ 2150</h4>
                                <p className="text-md sm:text-lg lg:text-xl font-bold">Successful Missions</p>
                            </div>
                        </div>

                        {/* Successful Surgeries */}
                        <div className="flex flex-col lg:flex-row items-center">
                            <FaSyringe className="text-4xl sm:text-5xl lg:text-6xl mr-0 lg:mr-4 mb-2 lg:mb-0" />
                            <div className="text-center lg:text-left">
                                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">+ 225</h4>
                                <p className="text-md sm:text-lg lg:text-xl font-bold">Successful Surgeries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        // </div>
    );
};

export default WhatWeDo;
