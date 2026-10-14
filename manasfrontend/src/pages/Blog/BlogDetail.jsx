import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSections } from '../../redux/Slice/Parent.slice';
import BreadCrumbs from '../../Component/BreadCums';
import blogHeroBg from '../../assets/blog-hero-bg.jpg';
import doctorCutout from '../../assets/doctor.png';
import BookNowSection from '../../Component/BookingSection';
import FaqSection from '../Home/FaqSection';
import { Helmet } from 'react-helmet';
import { 
  FaRegCalendarAlt, 
  FaHospitalAlt, 
  FaPhoneAlt, 
  FaShareAlt, 
  FaClock, 
  FaCheckCircle,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaAward,
  FaArrowLeft
} from 'react-icons/fa';
import { LuPhoneCall } from 'react-icons/lu';

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { title } = useParams();

  const [currentPost, setCurrentPost] = useState(null);
  const sections = useSelector((state) => state?.parent?.sections) || [];
  const loading = useSelector((state) => state?.parent?.loading);

  // Fetch sections if not already in store
  useEffect(() => {
    if (!sections.length) {
      dispatch(getSections());
    }
  }, [dispatch, sections.length]);

  // Find current post by matching normalized title
  useEffect(() => {
    if (sections.length > 0 && title) {
      const decodedParam = decodeURIComponent(title).trim().toLowerCase();
      const found = sections.find((post) => {
        if (!post?.title) return false;
        return post.title.trim().toLowerCase() === decodedParam;
      });
      setCurrentPost(found || null);
    }
  }, [title, sections]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  // Formatter for readable date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent Article';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Recent Article';
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Estimate read time based on word count
  const readTimeMinutes = useMemo(() => {
    if (!currentPost?.description) return 3;
    const cleanText = currentPost.description.replace(/<[^>]*>/g, ' ');
    const words = cleanText.trim().split(/\s+/).length;
    return Math.max(2, Math.ceil(words / 200));
  }, [currentPost]);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: currentPost?.title || 'Article' },
  ];

  // Current page URL for sharing
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading && !currentPost) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 bg-[#f7fbf9]">
        <div className="w-12 h-12 border-4 border-[#00B771] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-semibold text-gray-600">Loading Medical Article...</p>
      </div>
    );
  }

  if (!currentPost && !loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-[#f7fbf9]">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl font-bold mb-4">
          !
        </div>
        <h2 className="text-2xl font-bold text-[#112340]">Article Not Found</h2>
        <p className="text-sm text-gray-500 max-w-md mt-2">
          The medical article you are looking for may have been moved or updated.
        </p>
        <Link
          to="/blog"
          className="mt-6 px-6 py-2.5 bg-[#00B771] text-white rounded-full font-bold text-sm shadow-md hover:bg-[#009b60] transition-colors"
        >
          View All Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden w-full bg-[#f8faf9] text-slate-800">
      <Helmet>
        <title>{currentPost.title} - Dr. Manas Aggarwal</title>
        <meta
          name="description"
          content={`Read insightful medical guidance on "${currentPost.title}" by Dr. Manas Aggarwal, leading Surgical Gastroenterologist in Lucknow.`}
        />
        <meta property="og:title" content={`${currentPost.title} - Dr. Manas Aggarwal`} />
        <meta property="og:image" content={currentPost.photo?.secure_url || blogHeroBg} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Hero Breadcrumb Header */}
      <BreadCrumbs 
        headText={currentPost.title} 
        items={breadcrumbItems} 
        image={blogHeroBg} 
      />

      {/* Main Full-Width Editorial Reader Container - Matches Header Width (max-w-7xl) */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10 sm:py-16">
        
        {/* Top Navigation Row: Back to All Blogs Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e6b56] hover:text-[#00B771] transition-colors group"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Health Articles</span>
          </Link>
          <span className="text-xs text-gray-400 font-medium">
            Published in Surgical Gastroenterology Insights
          </span>
        </div>

        {/* ========================================================
            FULL WIDTH ARTICLE EDITORIAL CARD
            ======================================================== */}
        <article className="flex flex-col space-y-8 sm:space-y-10">
          
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14 overflow-hidden">
            
            {/* Category, Date & Read Time Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 text-xs sm:text-sm text-gray-500">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00B771] font-bold border border-emerald-200/80 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] animate-pulse" />
                  Medical Insights
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-500">
                  <FaRegCalendarAlt className="text-[#00B771]" />
                  {formatDate(currentPost.createdAt || currentPost.updatedAt)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <FaClock className="text-[#1CB6E6]" />
                <span>{readTimeMinutes} min read</span>
              </div>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#112340] leading-[1.28] tracking-tight my-6 sm:my-8 text-left">
              {currentPost.title}
            </h1>

            {/* Verified Author & Credentials Strip */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-teal-100/90 mb-8 sm:mb-10">
              <div className="flex items-center gap-3.5">
                <img
                  src={doctorCutout}
                  alt="Dr. Manas Aggarwal"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-white shadow-xs bg-emerald-100 shrink-0"
                />
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#112340] leading-tight">
                    Dr. Manas Aggarwal
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#0e6b56] font-semibold mt-0.5">
                    Senior Consultant Surgical Gastroenterologist • Chandan Hospital, Lucknow
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#00B771] font-bold bg-white px-3.5 py-1.5 rounded-full shadow-2xs border border-emerald-200/70">
                <FaCheckCircle className="text-xs" />
                <span>Medically Verified</span>
              </div>
            </div>

            {/* Featured Article Cover Image */}
            {currentPost.photo?.secure_url && (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.08)] group max-w-4xl mx-auto">
                <img
                  src={currentPost.photo.secure_url}
                  alt={currentPost.title}
                  className="w-full max-h-[520px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {/* Full Width Rich Blog Body Content */}
            <div
              className="blog-content-body max-w-none pt-2 text-justify sm:text-left"
              dangerouslySetInnerHTML={{ __html: currentPost.description }}
            />

            {/* Post-Article Social Share Bar */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                <FaShareAlt className="text-[#00B771]" />
                <span>Share this medical guidance:</span>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(currentPost.title + ' ' + pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                >
                  <FaWhatsapp className="text-lg" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}&url=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                >
                  <FaTwitter className="text-sm" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
              </div>
            </div>

          </div>

          {/* Doctor Author Bio Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
              <img
                src={doctorCutout}
                alt="Dr. Manas Aggarwal"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-4 border-slate-100 shadow-sm bg-emerald-50"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#00B771] text-white text-[10px] font-bold shadow-xs">
                19+ Yrs
              </span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#112340]">
                  Dr. Manas Aggarwal
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0e6b56] border border-emerald-200/60">
                  SGPGIMS Alumnus
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#00B771] font-bold">
                MCh Surgical Gastroenterology • MS (General Surgery) • MBBS
              </p>
              <p className="text-xs sm:text-[0.88rem] text-gray-600 mt-2.5 leading-relaxed">
                Vice-Chairperson &amp; Senior Consultant at Chandan Hospital, Lucknow. Specializes in advanced laparoscopic HPB, stomach, colorectal, and digestive tract cancer surgeries with evidence-based compassionate care.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <Link
                  to="/about-dr-manas-aggarwal"
                  className="text-xs sm:text-sm font-bold text-[#0e6b56] hover:text-[#00B771] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Profile</span>
                  <span>→</span>
                </Link>
                <span className="text-gray-300">•</span>
                <a
                  href="tel:+918318208837"
                  className="text-xs sm:text-sm font-bold text-[#00B771] hover:text-[#009b60] inline-flex items-center gap-1.5"
                >
                  <FaPhoneAlt className="text-xs" />
                  <span>+91-8318208837</span>
                </a>
              </div>
            </div>
          </div>

          {/* OPD Appointment Banner Card */}
          <div className="relative bg-gradient-to-br from-[#112340] via-[#14334f] to-[#0e6b56] rounded-3xl p-6 sm:p-8 text-white shadow-[0_12px_32px_rgba(17,35,64,0.18)] overflow-hidden border border-teal-500/20">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] animate-pulse" />
                  <span>Chandan Hospital, Gomti Nagar, Lucknow</span>
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif">
                  Need Expert Surgical Consultation?
                </h4>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl">
                  Consult directly with Dr. Manas Aggarwal for personalized diagnosis, second opinion, or minimally invasive laparoscopic surgery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="https://chandanhospital.in/doctor/dr-manas-aggarwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#00B771] hover:bg-[#009b60] text-white font-bold text-xs sm:text-sm text-center shadow-md transition-all hover:scale-102 active:scale-98"
                >
                  Book Priority Appointment →
                </a>
                <a
                  href="tel:+918318208837"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <LuPhoneCall className="text-sm text-[#00B771]" />
                  <span>+91-8318208837</span>
                </a>
              </div>
            </div>
          </div>

        </article>

      </main>

      {/* Book Consultation Banner */}
      <BookNowSection />

      {/* FAQs Section */}
      <FaqSection />

    </div>
  );
};

export default BlogDetail;
