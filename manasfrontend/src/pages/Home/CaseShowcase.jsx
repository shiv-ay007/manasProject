import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import img1 from "../../assets/cases/case2.jpeg";
import img2 from "../../assets/cases/case3.jpeg";
import img3 from "../../assets/cases/case4.jpeg";
import img4 from "../../assets/cases/case5.jpeg";
import img5 from "../../assets/cases/case6.jpeg";
import img6 from "../../assets/cases/case7.jpeg";
import img7 from "../../assets/cases/case8.jpeg";
import img8 from "../../assets/cases/case9.jpeg";
import img9 from "../../assets/cases/case10.jpeg";
import img10 from "../../assets/cases/case11.jpeg";
import img11 from "../../assets/cases/case12.jpeg";
import img0 from "../../assets/cases/case0.jpeg";
import img12 from "../../assets/cases/case15.jpg";
import BreadCrumbs from "../../Component/BreadCums";
import "aos/dist/aos.css";
import AOS from "aos";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaPlus } from "react-icons/fa";
import Container from "../../utlis/Container";
import SectionWrapper from "../../utlis/SectionWrapper";

const Cases = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const cases = [
    {
      id: 0,
      name: "Stomach polyp",
      desc: "Excision of a stomach polyp.          ",
      image: img0,
    },
    {
      id: 1,
      name: "Stomach polyp",
      desc: "Excision of a stomach polyp.          ",
      image: img1,
    },
    {
      id: 2,
      name: "Sigmoid colon cancer",
      desc: "Surgery: sigmoidectomy procedure done.  ",
      image: img2,
    },
    {
      id: 3,
      name: "Small intestine diverticulae",
      desc: "Management of diverticulae in intestine. ",
      image: img3,
    },
    {
      id: 4,
      name: "Road Traffic Accident",
      desc: "Management of pancreatic injury after accident.",
      image: img4,
    },
    {
      id: 5,
      name: "Colon cancer",
      desc: "Surgery: right hemicolectomy performed.  ",
      image: img5,
    },
    {
      id: 6,
      name: "Large incisional hernia",
      desc: "Surgery: open hernia repair procedure done.",
      image: img6,
    },
    {
      id: 7,
      name: "Laparoscopic hernia repair",
      desc: "Repairing two hernias in a single surgery. ",
      image: img7,
    },
    {
      id: 8,
      name: "Gall bladder stones",
      desc: "Laparoscopic cholecystectomy performed.    ",
      image: img8,
    },
    {
      id: 9,
      name: "Stones in small intestine",
      desc: "Management of stones in the small intestine.",
      image: img9,
    },
    {
      id: 10,
      name: "Gall Bladder",
      desc: "Laparoscopic cholecystectomy for gall bladder.",
      image: img10,
    },
    {
      id: 11,
      name: "Pancreatic trauma",
      desc: "Management of pancreatic trauma from accident.",
      image: img11,
    },
  ];

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Cases" }];

  // Slider settings for slick carousel
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    AOS.init({ duration: 600 });
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  return (
    <section className="relative bg-gradient-to-b from-[#f2f9f7] via-[#e6f5f0] to-[#f4faf8] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Distinct Style: Clinical Gallery Center Spotlight (No dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-gradient-to-r from-[#1CB6E6]/18 via-teal-100/30 to-[#00B771]/18 rounded-full blur-[100px]" />
        <div className="absolute -top-20 right-10 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Header - Compact & Minimal Spacing */}
        <div className="text-center flex flex-col items-center justify-center mb-5 md:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#0e6b56] uppercase">
              Healing With Care, Treating With Expertise
            </span>
            <span className="w-6 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#112340] tracking-tight max-w-3xl leading-snug">
            Trusted solutions for stomach, colon, and digestive disorders in Lucknow.
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto mt-1.5 leading-relaxed">
            Real surgical cases and successful clinical outcomes performed with laparoscopic &amp; precision techniques.
          </p>
        </div>

        {/* Carousel Slider - Tight Gap & Minimal Cards */}
        <div className="case-slider-container -mx-2.5">
          <Slider {...settings} pauseOnHover={true}>
            {cases.map((caseItem, index) => (
              <div key={caseItem.id} className="px-2.5 pb-2 h-full flex">
                <div
                  onClick={() => handleOpenModal(index)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(20,140,160,0.16)] border border-slate-200/80 hover:border-teal-400 transition-all duration-300 cursor-pointer flex flex-col h-full w-full hover:-translate-y-1"
                >
                  {/* Image Container - Compact & Sleek */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={caseItem.image}
                      alt={`${caseItem.name} - Case Study`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Category pill on top of image */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[#0e6b56] text-[10px] font-bold shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00B771]" />
                        Case Study
                      </span>
                    </div>

                    {/* Compact View Plus Overlay (No GPU glitching blur) */}
                    <div className="absolute inset-0 bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="w-9 h-9 rounded-full bg-white/95 text-[#1495be] shadow-md flex items-center justify-center font-bold text-sm">
                        <FaPlus />
                      </span>
                    </div>
                  </div>

                  {/* Card Content Section - Compact & Minimal */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      <h3 className="text-sm sm:text-base font-serif font-bold text-[#112340] group-hover:text-[#0b5f78] transition-colors duration-300 leading-snug mb-1 capitalize line-clamp-1">
                        {caseItem.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {caseItem.desc.trim()}
                      </p>
                    </div>

                    {/* Bottom Link Indicator */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#1495be] group-hover:text-[#00B771] transition-colors">
                      <span>View Surgical Case</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Case Preview Modal */}
      {isModalOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[99999] p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative border border-teal-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="relative max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={cases[selectedIndex].image}
                alt={cases[selectedIndex].name}
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-white text-left">
              <span className="text-[11px] font-bold text-[#00B771] uppercase tracking-wider block mb-1">
                Surgical Case Analysis
              </span>
              <h3 className="text-xl font-serif font-bold text-[#112340] capitalize mb-1">
                {cases[selectedIndex].name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {cases[selectedIndex].desc.trim()}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cases;
