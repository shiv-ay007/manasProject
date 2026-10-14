import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import p1 from '../../assets/about/pattern-11.png';
import image1 from '../../assets/about/about1.jpg';
import image2 from '../../assets/about/about2.jpg';
import sign from '../../assets/about/signature.png';

const AboutClinic = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Ensure animations only happen once
        });
    }, []);

    return (
        <div className="relative flex flex-col lg:flex-row bg-white overflow-hidden p-8 md:p-12 lg:items-center">
            {/* Background Pattern Image */}
            <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: `url(${p1})`, 
                    backgroundSize: 'contain',  
                    backgroundPosition: 'center',
                    opacity: 0.8,
                    width: '40%', 
                    left: '0',
                }} 
            ></div>

            {/* Left Side Content */}
            <div className="flex-1 z-10 relative p-6 md:p-10 lg:p-12 ">
                <h1 
                    className="text-xl font-bold mb-4 text-gray-600 transition duration-300 transform"
                    data-aos="fade-right"
                >
                    About Dr. Manas Aggarwal
                </h1>
                <h1 className="mb-2" data-aos="fade-right" data-aos-delay="100">Dedicated to Pancreatic Disorders</h1>
                <h3 
                    className="text-xl font-medium mb-4 text-gray-600"
                    data-aos="fade-right" 
                    data-aos-delay="200"
                >
                    Ethical & Evidence-Based Treatment
                </h3>
                <p 
                    className="text-lg mb-4 text-gray-600 leading-relaxed"
                    data-aos="fade-right" 
                    data-aos-delay="300"
                >
                    Dr. Manas Aggarwal brings over 19+ years of experience in pancreatic and complex GI disorders, trained at prestigious institutes and now focused on delivering holistic, ethical, and evidence-based care.
                </p>
                <p 
                    className="text-lg mb-6 text-gray-600 leading-relaxed"
                    data-aos="fade-right" 
                    data-aos-delay="400"
                >
                    He believes in a holistic approach that integrates meditation, lifestyle changes, and dietary management, while reserving surgery for more complex cases.
                </p>

                {/* Key Services Section */}
                <h4 
                    className="text-xl font-semibold mb-4 text-gray-800"
                    data-aos="fade-right" 
                    data-aos-delay="500"
                >
                    Key Skills & Experience:
                </h4>
                <ul 
                    className="list-disc list-inside text-gray-600 mb-6"
                    data-aos="fade-right" 
                    data-aos-delay="600"
                >
                    <li className="flex items-start mb-4">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 text-xl" /> 
                        <div>
                            <span className="font-medium text-gray-800">Workup & Planning:</span>
                            <p className="text-gray-600">Comprehensive workup for OPD patients, including preoperative and postoperative care.</p>
                        </div>
                    </li>
                    <li className="flex items-start mb-4">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 text-xl" /> 
                        <div>
                            <span className="font-medium text-gray-800">Emergency & Surgical Care:</span>
                            <p className="text-gray-600">Expert in both laparoscopic and open surgical procedures, including emergency surgical interventions.</p>
                        </div>
                    </li>
                    <li className="flex items-start mb-4">
                        <FaCheckCircle className="text-green-500 mr-2 mt-1 text-xl" /> 
                        <div>
                            <span className="font-medium text-gray-800">Inpatient & Casualty Management:</span>
                            <p className="text-gray-600">Handling patient triage, resuscitation, and 24/7 inpatient services with multidisciplinary coordination.</p>
                        </div>
                    </li>
                </ul>

                {/* Professional Experience Section */}
                <h4 
                    className="text-xl font-semibold mb-4 text-gray-800"
                    data-aos="fade-right" 
                    data-aos-delay="700"
                >
                    Professional Experience:
                </h4>
                <ul 
                    className="list-disc list-inside text-gray-600 mb-6"
                    data-aos="fade-right" 
                    data-aos-delay="800"
                >
                    <li className="mb-2">
                        <strong>Vice-Chairperson</strong>, Chandan Hospital, Lucknow (July 2023 - Present) 
                        <p>Regularly performing simple and complex GI surgeries, coordinating with multiple specialties.</p>
                    </li>
                    <li className="mb-2">
                        <strong>Consultant</strong>, Medanta Hospital, Lucknow (October 2019 - July 2023)
                        <p>Played a key role in setting up the GI Surgery department and assisted in liver transplants.</p>
                    </li>
                    <li>
                        <strong>Senior Resident</strong>, SGPGIMS, Lucknow (July 2016 - October 2019)
                        <p>Managed a wide range of GI surgeries, including liver transplants.</p>
                    </li>
                </ul>

                {/* Founder Section */}
                <div className="flex items-center mt-6 p-4" data-aos="fade-right" data-aos-delay="900">
                    <img 
                        src={sign} 
                        alt="Signature" 
                        className="w-24 h-24 mr-4 rounded-full"
                    />
                    <div>
                        <p className="text-lg font-semibold">Dr. Manas Aggarwal</p>
                        <span className="text-base text-gray-500">Founder, Dr. Manas Aggarwal Clinic</span>
                    </div>
                </div>
            </div>

            {/* Right Side Images with Overlapping Effect */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 relative mt-[18rem] sm:mt-[20rem] md:mt-[28rem] lg:mt-[2rem] space-y-4" data-aos="fade-left">
                <div className="relative w-full">
                    {/* First Image */}
                    <img 
                        src={image1} 
                        alt="Clinic" 
                        className="w-[80%] h-auto rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                    />
                    {/* Second Image */}
                    <img 
                        src={image2} 
                        alt="Clinic Interior" 
                        className="absolute top-[-90%] md:top-[-90%] lg:top-[-90%] left-[60%] md:left-[65%] lg:left-[70%] transform -translate-x-1/2 w-3/4 h-auto rounded-lg shadow-2xl transition-transform hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutClinic;
