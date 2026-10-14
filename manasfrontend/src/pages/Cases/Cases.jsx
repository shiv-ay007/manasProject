import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BreadCrumbs from '../../Component/BreadCums';
import Container from '../../utlis/Container';
import BookNowSection from '../../Component/BookingSection';
import casesHeroBg from '../../assets/cases-hero-bg.jpg';

import img0 from '../../assets/cases/case0.jpeg';
import img1 from '../../assets/cases/case2.jpeg';
import img2 from '../../assets/cases/case3.jpeg';
import img3 from '../../assets/cases/case4.jpeg';
import img4 from '../../assets/cases/case5.jpeg';
import img5 from '../../assets/cases/case6.jpeg';
import img6 from '../../assets/cases/case7.jpeg';
import img7 from '../../assets/cases/case8.jpeg';
import img8 from '../../assets/cases/case9.jpeg';
import img9 from '../../assets/cases/case10.jpeg';
import img10 from '../../assets/cases/case11.jpeg';
import img11 from '../../assets/cases/case12.jpeg';

const cases = [
  { id: 0, name: "Stomach Polyp", desc: "Excision of a stomach polyp.", image: img0, themeColor: "#00B771" },
  { id: 1, name: "Sigmoid Colon Cancer", desc: "Sigmoidectomy procedure performed.", image: img1, themeColor: "#147a8c" },
  { id: 2, name: "Small Intestine Diverticulae", desc: "Management of intestinal diverticulae.", image: img2, themeColor: "#0e6b56" },
  { id: 3, name: "Road Traffic Accident", desc: "Pancreatic injury management post-accident.", image: img3, themeColor: "#0284c7" },
  { id: 4, name: "Colon Cancer", desc: "Right hemicolectomy surgery performed.", image: img4, themeColor: "#059669" },
  { id: 5, name: "Large Incisional Hernia", desc: "Open hernia repair procedure done.", image: img5, themeColor: "#0d9488" },
  { id: 6, name: "Laparoscopic Hernia Repair", desc: "Repairing two hernias in a single surgery.", image: img6, themeColor: "#2563eb" },
  { id: 7, name: "Gall Bladder Stones", desc: "Laparoscopic cholecystectomy performed.", image: img7, themeColor: "#10b981" },
  { id: 8, name: "Small Intestine Stones", desc: "Management of stones in the small intestine.", image: img8, themeColor: "#0891b2" },
  { id: 9, name: "Gall Bladder", desc: "Laparoscopic cholecystectomy performed.", image: img9, themeColor: "#047857" },
  { id: 10, name: "Pancreatic Trauma", desc: "Management of pancreatic trauma.", image: img10, themeColor: "#0369a1" },
];

const Cases = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 600 });
    window.scrollTo(0, 0);
  }, [location]);

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  return (
    <section className="bg-[#fbfdfc] min-h-screen">
      <Helmet>
        <title>Clinical Cases &amp; Surgical Procedures | Dr. Manas Aggarwal</title>
        <meta
          name="description"
          content="Explore clinical surgical cases handled by Dr. Manas Aggarwal, Senior GI and Laparoscopic Surgeon at Chandan Hospital, Lucknow."
        />
      </Helmet>

      {/* Hero Header */}
      <BreadCrumbs 
        headText="Clinical Cases" 
        items={[{ label: 'Home', href: '/' }, { label: 'Cases' }]} 
        image={casesHeroBg} 
      />

      {/* Cases Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {cases.map((caseItem, index) => (
              <div
                key={caseItem.id}
                onClick={() => handleOpenModal(index)}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-[280px] sm:h-[310px] md:h-[330px] border-[2.5px] shadow-sm hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
                style={{ borderColor: caseItem.themeColor }}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >
                {/* Case Surgical Image */}
                <img
                  src={caseItem.image}
                  alt={caseItem.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient Image Dimmer on Hover */}
                <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/25 transition-all duration-300 pointer-events-none" />

                {/* Center Dropping Floating Icon Badge (Exact behavior from reference site) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full group-hover:top-[30%] group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: caseItem.themeColor }}
                  >
                    <FaPlus />
                  </div>
                </div>

                {/* Bottom Arched Wave Banner (Exact sliding up curve from reference site) */}
                <div className="absolute bottom-0 left-0 right-0 top-[70%] group-hover:top-[46%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 flex flex-col justify-end pointer-events-none">
                  {/* SVG Wave Arc */}
                  <div className="relative w-full h-6 shrink-0">
                    <svg
                      className="absolute bottom-0 left-0 w-full h-full text-white/60 fill-current"
                      viewBox="0 0 100 25"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,25 Q50,0 100,25 Z" />
                    </svg>
                  </div>

                  {/* Frosted Bottom Container with Smooth Color Reveal */}
                  <div className="bg-white/60 backdrop-blur-md px-4 pb-5 pt-1 text-center flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-base sm:text-lg font-bold transition-colors duration-300">
                      <span className="text-[#112340] group-hover:hidden transition-all duration-200">
                        {caseItem.name}
                      </span>
                      <span
                        className="hidden group-hover:inline transition-all duration-200"
                        style={{ color: caseItem.themeColor }}
                      >
                        {caseItem.name}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-[0.82rem] text-gray-700 line-clamp-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                      {caseItem.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Modal */}
      {isModalOpen && selectedIndex !== null && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/75 backdrop-blur-sm z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-3xl w-full relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal} 
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer shadow-md"
            >
              ✕
            </button>
            <div className="max-h-[65vh] overflow-hidden rounded-2xl mb-4 bg-slate-950 flex items-center justify-center">
              <img 
                src={cases[selectedIndex].image} 
                alt={cases[selectedIndex].name} 
                className="max-h-[65vh] w-auto max-w-full object-contain" 
              />
            </div>
            <div className="text-center pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B771] block mb-1">
                Clinical Surgical Case
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#112340]">
                {cases[selectedIndex].name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 max-w-xl mx-auto">
                {cases[selectedIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Integrated Bottom CTA Section */}
      <BookNowSection />
    </section>
  );
};

export default Cases;