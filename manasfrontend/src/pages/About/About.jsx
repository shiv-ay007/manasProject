import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import image from '../../assets/Apron.jpg';
import { FaStethoscope, FaSyringe, FaProcedures, FaHospitalAlt } from 'react-icons/fa';
import BreadCrumbs from '../../Component/BreadCums';
import AboutClinic from './AboutClinic';
import WhatWeDo from './WhatWeDo';
import ServiceCard from '../Services/ServiceCard';
import FaqAccordion from '../../Component/FaqAccor';
import BookNowSection from '../../Component/BookingSection';
import Newsletter from '../../Component/EmailAddress';
import AnimatedBeamDemo from '../../Component/Skill';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';



const AboutUs = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' },
   
]

const location = useLocation();


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

    // Scroll to top on component mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
      if (location.pathname === '/about') {
        window.scrollTo(0, 0);
      }
    }, [location]);
  

  return (
    <div>
          <Helmet>
        <title>About Dr. Manas Aggarwal - Best Gastroenterology Surgeon in Lucknow</title>
        <meta name="description" content="Learn about Dr. Manas Aggarwal, an ethical and experienced gastroenterology surgeon specializing in holistic and evidence-based patient care." />
        <meta name="keywords" content="About Dr. Manas Aggarwal, Gastroenterology, Surgeon, Lucknow, Medical Professional" />
      </Helmet>
      <BreadCrumbs headText={"Dubai Delights"} items={breadcrumbItems} />
    <div className='pb-6'>

    <AboutClinic/>
    <BookNowSection/>
    <ServiceCard/>
    <WhatWeDo/>
     {/* <AnimatedBeamDemo/> */}
    <FaqAccordion/>
    {/* <Newsletter/> */}

 
    {/* <section className="max-w-7xl mx-auto px-4 py-12 overflow-x-hidden overflow-y-hidden">
   
       
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
       
        <div data-aos="fade-right">
      
          <h1 className=" mb-6  transition-colors duration-300">Dr. Manas Aggarwal</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Dr. Manas Aggarwal has more than 19+ years of experience in advanced gastrointestinal and pancreatic disorders. Trained in prestigious institutes and well-experienced in handling complex pancreatic cases, he now dedicates his practice to ethical, evidence-based treatment.
          </p>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            He believes in a holistic approach that includes meditation, lifestyle changes, and dietary management, with surgery reserved for more difficult cases.
          </p>

   
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
          <ul className="list-none space-y-2 text-gray-600">
            <li className="flex items-center hover:scale-105 transform transition-transform duration-300">
              <FaStethoscope className="text-xl text-[#4f6f8f] mr-3" /> Workup and planning for OPD patients
            </li>
            <li className="flex items-center hover:scale-105 transform transition-transform duration-300">
              <FaHospitalAlt className="text-xl text-[#4f6f8f] mr-3" /> Ward management with preoperative and postoperative care
            </li>
            <li className="flex items-center hover:scale-105 transform transition-transform duration-300">
              <FaSyringe className="text-xl text-[#4f6f8f] mr-3" /> Casualty management, patient triage, and resuscitation
            </li>
            <li className="flex items-center hover:scale-105 transform transition-transform duration-300">
              <FaProcedures className="text-xl text-[#4f6f8f] mr-3" /> Emergency surgical procedures
            </li>
            <li className="flex items-center hover:scale-105 transform transition-transform duration-300">
              <FaProcedures className="text-xl text-[#4f6f8f] mr-3" /> Laparoscopic and open surgical procedures
            </li>
          </ul>
        </div>

    
        <div 
          data-aos="fade-left" 
          className="flex justify-center lg:justify-end md:justify-center sm:justify-center"
        >
          <div className="relative overflow-hidden w-80 h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] shadow-xl rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-gray-300">
            <img
              src={image}
              alt="Dr. Manas Aggarwal"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>


      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center" data-aos="fade-up">
        <div className="  bg-gradient-to-r from-[#4f6f8f] to-[#768b9f] cursor-pointer p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
          <h3 className="text-3xl font-bold text-white">19+</h3>
          <p className="text-gray-100 mt-2">Years of Experience</p>
        </div>
        <div className="bg-gradient-to-r from-[#4f6f8f] to-[#768b9f] p-6 cursor-pointer rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
          <h3 className="text-3xl font-bold text-white">500+</h3>
          <p className="text-gray-100 mt-2">Surgeries Performed</p>
        </div>
        <div className="bg-gradient-to-r from-[#4f6f8f] to-[#768b9f] p-6 cursor-pointer rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
          <h3 className="text-3xl font-bold text-white">30+</h3>
          <p className="text-gray-100 mt-2">Published Papers</p>
        </div>
        <div className="bg-gradient-to-r from-[#4f6f8f] to-[#768b9f] p-6 cursor-pointer rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
          <h3 className="text-3xl font-bold text-white">15</h3>
          <p className="text-gray-100 mt-2">Awards Received</p>
        </div>
      </div>

     
      <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-md" data-aos="fade-up">
        <h1 className=" mb-6">Professional Experience</h1>
        <div className="space-y-6 text-gray-600">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Vice-Chairperson, Chandan Hospital, Lucknow</h3>
            <p className="italic text-sm sm:text-base">July 2023 - Present</p>
            <p>Regularly performing simple and complex GI surgeries, coordinating with multiple specialties.</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Consultant, Medanta Hospital, Lucknow</h3>
            <p className="italic text-sm sm:text-base">October 2019 - July 2023</p>
            <p>Key role in setting up the GI Surgery department, training staff, and assisting liver transplants.</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Senior Resident, SGPGIMS, Lucknow</h3>
            <p className="italic text-sm sm:text-base">July 2016 - October 2019</p>
            <p>Managed the whole spectrum of GI surgeries and procedures including liver transplants.</p>
          </div>
        </div>
      </div>

    
      <div className="mt-12 bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] p-8 rounded-lg shadow-md" data-aos="fade-up">
        <h1 className=" mb-6">Testimonials</h1>
        <div className="space-y-4">
          <blockquote className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <p className="italic text-gray-600">"Dr. Manas is an extraordinary surgeon. His expertise and patient care are unparalleled. I owe my recovery to him!"</p>
            <footer className="mt-4 text-right text-sm text-gray-500">- John Doe, Patient</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-300">
            <p className="italic text-gray-600">"His calm demeanor and ability to explain complex procedures helped me feel more confident going into surgery."</p>
            <footer className="mt-4 text-right text-sm text-gray-500">- Jane Smith, Colleague</footer>
          </blockquote>
        </div>
      </div>


      <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-md" data-aos="fade-up">
        <h1 className="mb-6">Education</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-600">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-sm sm:text-base">Degree</th>
                <th className="px-4 py-2 text-sm sm:text-base">University</th>
                <th className="px-4 py-2 text-sm sm:text-base">Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-sm sm:text-base">MBBS</td>
                <td className="border px-4 py-2 text-sm sm:text-base">Maulana Azad Medical College, Delhi</td>
                <td className="border px-4 py-2 text-sm sm:text-base">2005 - 2010</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-sm sm:text-base">MS</td>
                <td className="border px-4 py-2 text-sm sm:text-base">UCMS & GTB Hospital, Delhi</td>
                <td className="border px-4 py-2 text-sm sm:text-base">2012 - 2015</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-sm sm:text-base">MCh</td>
                <td className="border px-4 py-2 text-sm sm:text-base">SGPGIMS, Lucknow</td>
                <td className="border px-4 py-2 text-sm sm:text-base">2016 - 2019</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-sm sm:text-base">FIAGES</td>
                <td className="border px-4 py-2 text-sm sm:text-base">Indian Association of Gastrointestinal Endosurgeons, Kanpur</td>
                <td className="border px-4 py-2 text-sm sm:text-base">2020</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section> */}

    
    </div>
    </div>
  );
};

export default AboutUs;
