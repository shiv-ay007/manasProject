import React, { useEffect, useState } from 'react';
import { FaPlus, FaBriefcaseMedical } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCases } from '../../redux/Slice/Parent.slice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BreadCrumbs from '../../Component/BreadCums';
import BookNowSection from '../../Component/BookingSection';
import casesHeroBg from '../../assets/cases-hero-bg.jpg';

// Fallback image in case a case has no image uploaded
import defaultCaseImg from '../../assets/cases/case0.jpeg';

// Harmonious palette of medical surgical theme colors
const themeColors = [
  "#00B771",
  "#147a8c",
  "#0e6b56",
  "#0284c7",
  "#059669",
  "#0d9488",
  "#2563eb",
  "#10b981",
  "#0891b2",
  "#047857",
  "#0369a1",
];

const Cases = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { cases = [], loading } = useSelector((state) => state?.parent || {});
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
    window.scrollTo(0, 0);
    dispatch(getCases());
  }, [dispatch, location]);

  // Sort cases so the latest published case appears first (at the top)
  const sortedCases = React.useMemo(() => {
    if (!Array.isArray(cases)) return [];
    return [...cases].sort((a, b) => {
      const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (dateA && dateB && dateA !== dateB) {
        return dateB - dateA;
      }
      if (a?._id && b?._id) {
        return String(b._id).localeCompare(String(a._id));
      }
      return 0;
    });
  }, [cases]);

  const handleOpenModal = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  // Strip HTML tags for card preview
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
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

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#00B771] font-bold border border-emerald-200/80 text-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] animate-pulse" />
              Surgical Excellence &amp; Operative Results
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#112340]">
              Documented Clinical Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Review real clinical presentations, intraoperative findings, and surgical outcomes managed by Dr. Manas Aggarwal.
            </p>
          </div>

          {/* Loading Shimmer Skeleton */}
          {loading && sortedCases.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-3xl h-[300px] bg-slate-100 animate-pulse border border-slate-200"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && sortedCases.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#00B771] flex items-center justify-center text-2xl mx-auto mb-4">
                <FaBriefcaseMedical />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Cases Published Yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                New clinical surgical case documentation will appear here once added from the admin panel.
              </p>
            </div>
          )}

          {/* Dynamic Cases Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {sortedCases.map((caseItem, index) => {
              const themeColor = themeColors[index % themeColors.length];
              const caseImg = caseItem?.photo?.secure_url || defaultCaseImg;
              const cleanDesc = stripHtml(caseItem?.description);

              return (
                <div
                  key={caseItem._id || index}
                  onClick={() => handleOpenModal(caseItem)}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl h-[280px] sm:h-[310px] md:h-[330px] border-[2.5px] shadow-sm hover:shadow-xl transition-all duration-500 ease-out cursor-pointer bg-slate-900"
                  style={{ borderColor: themeColor }}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  {/* Case Surgical Image */}
                  <img
                    src={caseImg}
                    alt={caseItem.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Ambient Image Dimmer on Hover */}
                  <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/25 transition-all duration-300 pointer-events-none" />

                  {/* Center Dropping Floating Icon Badge */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full group-hover:top-[30%] group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: themeColor }}
                    >
                      <FaPlus />
                    </div>
                  </div>

                  {/* Bottom Arched Wave Banner */}
                  <div className="absolute bottom-0 left-0 right-0 top-[70%] group-hover:top-[44%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 flex flex-col justify-end pointer-events-none">
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
                    <div className="bg-white/70 backdrop-blur-md px-4 pb-5 pt-1 text-center flex-1 flex flex-col items-center justify-center">
                      <h3 className="text-base sm:text-lg font-serif font-bold transition-colors duration-300 line-clamp-1">
                        <span className="text-[#112340] group-hover:hidden transition-all duration-200">
                          {caseItem.title}
                        </span>
                        <span
                          className="hidden group-hover:inline transition-all duration-200"
                          style={{ color: themeColor }}
                        >
                          {caseItem.title}
                        </span>
                      </h3>
                      {cleanDesc && (
                        <p className="text-xs sm:text-[0.82rem] text-gray-700 line-clamp-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                          {cleanDesc}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox / Modal */}
      {isModalOpen && selectedCase && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl p-4 sm:p-6 max-w-3xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseModal} 
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer shadow-md"
            >
              ✕
            </button>
            <div className="max-h-[60vh] overflow-hidden rounded-2xl mb-4 bg-slate-950 flex items-center justify-center">
              <img 
                src={selectedCase.photo?.secure_url || defaultCaseImg} 
                alt={selectedCase.title} 
                className="max-h-[60vh] w-auto max-w-full object-contain" 
              />
            </div>
            <div className="text-center pt-1 px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00B771] block mb-1">
                Clinical Surgical Case
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#112340]">
                {selectedCase.title}
              </h3>
              <div
                className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl mx-auto leading-relaxed text-justify sm:text-center"
                dangerouslySetInnerHTML={{ __html: selectedCase.description || '' }}
              />
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
