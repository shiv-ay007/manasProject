import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { getSections } from '../../redux/Slice/Parent.slice';
import BreadCrumbs from '../../Component/BreadCums';
import blogHeroBg from '../../assets/blog-hero-bg.jpg';
import doctorCutout from '../../assets/doctor.png';
import BookNowSection from '../../Component/BookingSection';
import BookApointement from '../../Component/BookApointement';
import FaqSection from '../Home/FaqSection';
import { Helmet } from 'react-helmet';
import { FaXTwitter } from 'react-icons/fa6';
import { 
  FaRegCalendarAlt, 
  FaHospitalAlt, 
  FaPhoneAlt, 
  FaShareAlt, 
  FaClock, 
  FaCheckCircle,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaAward,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
  FaUserCheck,
  FaUserMd,
  FaStethoscope,
  FaCapsules,
  FaArrowRight,
  FaShieldAlt,
  FaComments
} from 'react-icons/fa';
import { LuPhoneCall } from 'react-icons/lu';

// Clean kebab-case slug generator for matching and canonical URLs
const createSlug = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = useParams();
  const sliderRef = useRef(null);

  const [currentPost, setCurrentPost] = useState(location.state || null);
  const sections = useSelector((state) => state?.parent?.sections) || [];
  const loading = useSelector((state) => state?.parent?.loading);

  // Recent posts excluding current one
  const recentPosts = useMemo(() => {
    if (!sections.length) return [];
    const currentId = currentPost?._id;
    const currentTitle = currentPost?.title?.trim().toLowerCase();
    const currentSlug = currentPost?.title ? createSlug(currentPost.title) : '';
    return sections.filter((post) => {
      if (currentId && post?._id === currentId) return false;
      if (currentTitle && post?.title?.trim().toLowerCase() === currentTitle) return false;
      if (currentSlug && post?.title && createSlug(post.title) === currentSlug) return false;
      return true;
    });
  }, [sections, currentPost]);

  // Slick slider settings for Recent Blogs sidebar
  const recentSliderSettings = {
    dots: true,
    arrows: false,
    infinite: recentPosts.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  // Fetch sections if not already in store
  useEffect(() => {
    if (!sections.length) {
      dispatch(getSections());
    }
  }, [dispatch, sections.length]);

  // Find current post by matching genuine slug, normalized title, or ID
  useEffect(() => {
    if (sections.length > 0 && title) {
      const decodedParam = decodeURIComponent(title).trim().toLowerCase();
      const slugParam = createSlug(decodedParam);
      const found = sections.find((post) => {
        if (!post) return false;
        // 1. Match generated genuine kebab-case slug
        if (post.title && createSlug(post.title) === slugParam) return true;
        // 2. Match raw title (backward compatibility for existing URLs or %20 spaces)
        if (post.title && post.title.trim().toLowerCase() === decodedParam) return true;
        // 3. Match backend slug if present
        if (post.slug && (post.slug.toLowerCase() === decodedParam || createSlug(post.slug) === slugParam)) return true;
        // 4. Match by ID if param was an ID
        if (post._id && post._id === title) return true;
        return false;
      });
      if (found) {
        setCurrentPost(found);
      }
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

  // Share URL using production live deployment with genuine clean slug
  const articleShareUrl = currentPost?.title 
    ? `https://manasproject.onrender.com/blog/${createSlug(currentPost.title)}`
    : 'https://manasproject.onrender.com/blog';

  // Clean description HTML to remove excessive empty paragraphs and blank gaps
  const cleanDescription = useMemo(() => {
    if (!currentPost?.description) return '';
    let html = currentPost.description;

    // Remove empty paragraphs containing whitespace, &nbsp;, <br>, or empty tags
    html = html.replace(/<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>|<(?:span|strong|em|b|i)[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/(?:span|strong|em|b|i)>)*<\/p>/gi, '');

    // Remove empty headings
    html = html.replace(/<h[1-6][^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/h[1-6]>/gi, '');

    // Collapse multiple consecutive <br> tags into at most one <br>
    html = html.replace(/(?:<br\s*\/?>\s*){2,}/gi, '<br />');

    // Remove leading/trailing breaks and non-breaking spaces inside paragraphs
    html = html.replace(/<p[^>]*>(?:\s*<br\s*\/?>|\s|&nbsp;)+/gi, '<p>');
    html = html.replace(/(?:\s*<br\s*\/?>|\s|&nbsp;)+<\/p>/gi, '</p>');

    return html;
  }, [currentPost?.description]);

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
    <div className="relative overflow-x-clip w-full bg-gradient-to-b from-[#f2faf6] via-[#edf7f3] to-[#f7fbf9] text-slate-800">
      
      {/* Homepage-style Ambient Medical Glows & Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -left-28 w-[500px] h-[500px] bg-[#00B771]/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-28 w-[550px] h-[550px] bg-[#1CB6E6]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-40 left-1/4 w-[450px] h-[450px] bg-[#0e6b56]/8 rounded-full blur-[120px]" />
      </div>

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

      {/* Main Container - 2-Column Responsive Layout matching user's drawing */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-8 sm:py-12">
        
        {/* Top Navigation Row: Back to All Blogs Link */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0e6b56] hover:text-[#00B771] transition-colors group cursor-pointer"
          >
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Health Articles</span>
          </button>
          <span className="text-xs text-gray-400 font-medium">
            Published in Surgical Gastroenterology Insights
          </span>
        </div>

        {/* 2-COLUMN GRID: Left (Blog Detail) + Right (Recent Blogs Slider + Doctor Stats & Book Appointment) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              LEFT COLUMN: BLOG DETAIL EDITORIAL (lg:col-span-8)
              ======================================================== */}
          <article className="lg:col-span-8 flex flex-col space-y-8">
            
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-5 sm:p-7 md:p-8 lg:p-9 overflow-hidden">
              
              {/* Category, Date & Read Time Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs sm:text-sm text-gray-500">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00B771] font-bold border border-emerald-200/80 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] animate-pulse" />
                    Medical Insights
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-500 text-xs sm:text-sm">
                    <FaRegCalendarAlt className="text-[#00B771]" />
                    {formatDate(currentPost.createdAt || currentPost.updatedAt)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-xs sm:text-sm">
                  <FaClock className="text-[#1CB6E6]" />
                  <span>{readTimeMinutes} min read</span>
                </div>
              </div>

              {/* Article Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] leading-[1.28] tracking-tight my-4 sm:my-6 text-left">
                {currentPost.title}
              </h1>

              {/* Verified Author & Credentials Strip */}
              <div className="flex items-center justify-between flex-wrap gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#f4f9f6] border border-teal-100/90 mb-5 sm:mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={doctorCutout}
                    alt="Dr. Manas Aggarwal"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top border-2 border-white shadow-xs bg-emerald-100 shrink-0"
                  />
                  <div>
                    <h2 className="text-sm sm:text-base font-serif font-bold text-[#112340] leading-tight">
                      Dr. Manas Aggarwal
                    </h2>
                    <p className="text-[11px] sm:text-xs text-[#0e6b56] font-semibold mt-0.5">
                      Senior Consultant Surgical Gastroenterologist • Chandan Hospital, Lucknow
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#00B771] font-bold bg-white px-3 py-1.5 rounded-full shadow-2xs border border-emerald-200/70">
                  <FaCheckCircle className="text-xs" />
                  <span>Medically Verified</span>
                </div>
              </div>

              {/* Featured Article Cover Image */}
              {currentPost.photo?.secure_url && (
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.07)] group w-full">
                  <img
                    src={currentPost.photo.secure_url}
                    alt={currentPost.title}
                    className="w-full max-h-[440px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* Full Width Rich Blog Body Content - Clean, Compact & Perfectly Spaced */}
              <div
                className="blog-content-body max-w-none pt-1 text-justify sm:text-left text-slate-700 leading-relaxed text-[0.95rem] sm:text-[1.02rem] [&>*:last-child]:mb-0 [&>p:last-of-type]:mb-0 [&_h2]:!mt-4 [&_h2]:!mb-1.5 [&_h3]:!mt-3.5 [&_h3]:!mb-1.5 [&_p]:!my-1.5 [&_p]:!leading-relaxed [&_p:empty]:!hidden [&_p:has(>br:only-child)]:!hidden [&_br+br]:!hidden"
                dangerouslySetInnerHTML={{ __html: cleanDescription }}
              />

              {/* Post-Article Social Share Bar (Seamlessly Placed Right Below Blog Content) */}
              <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700">
                  <FaShareAlt className="text-[#00B771]" />
                  <span>Share this medical guidance:</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(currentPost.title + ' - Read here: ' + articleShareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <FaWhatsapp className="text-base sm:text-lg" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleShareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <FaFacebookF className="text-xs sm:text-sm" />
                  </a>
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}&url=${encodeURIComponent(articleShareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <FaXTwitter className="text-xs sm:text-sm" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleShareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <FaLinkedinIn className="text-xs sm:text-sm" />
                  </a>
                </div>
              </div>

            </div>

            {/* Doctor Detailed Profile Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center gap-5">
              <div className="relative shrink-0">
                <img
                  src={doctorCutout}
                  alt="Dr. Manas Aggarwal"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top border-4 border-slate-100 shadow-sm bg-emerald-50"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#00B771] text-white text-[10px] font-bold shadow-xs">
                  19+ Yrs
                </span>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#112340]">
                    Dr. Manas Aggarwal
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0e6b56] border border-emerald-200/60">
                    SGPGIMS Alumnus
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#00B771] font-bold">
                  MCh Surgical Gastroenterology • MS (General Surgery) • MBBS
                </p>
                <p className="text-xs sm:text-[0.85rem] text-gray-600 mt-2 leading-relaxed">
                  Vice-Chairperson &amp; Senior Consultant at Chandan Hospital, Lucknow. Specializes in advanced laparoscopic HPB, stomach, colorectal, and digestive tract cancer surgeries.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center justify-center sm:justify-start gap-4">
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

          </article>

          {/* ========================================================
              RIGHT COLUMN: SIDEBAR (lg:col-span-4)
              Top: Recent Blogs Slider
              Bottom: Doctor Stats & Book Appointment Button
              ======================================================== */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* WIDGET 1: RECENT BLOGS VERTICAL LIST */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-5 sm:p-6 overflow-hidden">
              
              {/* Header with Title */}
              <div className="pb-3.5 mb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-[#0e6b56] uppercase block">
                    Stay Informed
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#112340] leading-tight mt-0.5">
                    Recent Articles
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#00B771] border border-emerald-200/60">
                  {recentPosts.length} Guides
                </span>
              </div>

              {/* Vertical Stack List */}
              {recentPosts.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No other recent articles found.</p>
              ) : (
                <div className="divide-y divide-slate-100 space-y-3.5">
                  {recentPosts.slice(0, 5).map((post, idx) => (
                    <Link
                      key={idx}
                      to={`/blog/${createSlug(post.title)}`}
                      className="group flex gap-3.5 items-center pt-3.5 first:pt-0 hover:bg-slate-50/70 p-2 rounded-2xl transition-all duration-200"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-100">
                        <img
                          src={post.photo?.secure_url || blogHeroBg}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[10.5px] text-gray-400 font-medium mb-1">
                          <FaRegCalendarAlt className="text-[#00B771] text-[10px]" />
                          <span>{formatDate(post.updatedAt || post.createdAt)}</span>
                        </div>
                        <h4 className="text-xs sm:text-[0.88rem] font-serif font-bold text-[#112340] group-hover:text-[#00B771] transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#00B771] group-hover:translate-x-1 transition-transform">
                          <span>Read Now</span>
                          <span>→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View All Blogs Link */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
                <Link
                  to="/blog"
                  className="text-xs font-bold text-[#0e6b56] hover:text-[#00B771] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore all medical journals &amp; guides</span>
                  <span>→</span>
                </Link>
              </div>

            </div>

            {/* WIDGET 2: DOCTOR STATS & BOOK APPOINTMENT CARD (CLEAN & MINIMAL) */}
            <div className="relative bg-gradient-to-br from-[#112340] via-[#14334f] to-[#0e6b56] rounded-3xl p-5 sm:p-6 text-white shadow-[0_12px_35px_rgba(17,35,64,0.18)] overflow-hidden border border-teal-500/20">
              {/* Subtle background glow */}
              <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#00B771]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#1CB6E6]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Doctor Minimal Profile Strip */}
                <div className="flex items-center gap-3 pb-3.5 border-b border-white/10">
                  <div className="relative shrink-0">
                    <img
                      src={doctorCutout}
                      alt="Dr. Manas Aggarwal"
                      className="w-12 h-12 rounded-xl object-cover object-top border-2 border-emerald-400 bg-white shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#00B771] border-2 border-[#112340]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                      Lead Surgeon
                    </span>
                    <h4 className="text-[0.98rem] font-serif font-bold text-white leading-tight truncate">
                      Dr. Manas Aggarwal
                    </h4>
                    <p className="text-[11px] text-gray-300 font-medium truncate">
                      MCh Surgical GI • SGPGIMS
                    </p>
                  </div>
                </div>

                {/* DOCTOR STATS (3 Minimal Balanced Counters) */}
                <div className="grid grid-cols-3 gap-2 my-3.5">
                  
                  {/* Stat 1: Experience */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                    <div className="flex justify-center text-emerald-400 text-xs mb-0.5">
                      <FaBriefcase />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-white block leading-tight font-sans">
                      19+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 block font-semibold">
                      Yrs Exp
                    </span>
                  </div>

                  {/* Stat 2: Patients Treated */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                    <div className="flex justify-center text-teal-300 text-xs mb-0.5">
                      <FaUserCheck />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-[#00B771] block leading-tight font-sans">
                      16k+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 block font-semibold">
                      Treated
                    </span>
                  </div>

                  {/* Stat 3: Procedures */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 text-center border border-white/10">
                    <div className="flex justify-center text-sky-300 text-xs mb-0.5">
                      <FaAward />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-white block leading-tight font-sans">
                      90%+
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-300 block font-semibold">
                      Keyhole
                    </span>
                  </div>

                </div>

                {/* Hospital OPD Location Strip */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 mb-3.5 text-[11px] text-gray-200">
                  <FaHospitalAlt className="text-emerald-400 shrink-0 text-xs" />
                  <span className="truncate">Chandan Hospital, Gomti Nagar, Lucknow</span>
                </div>

                {/* Single Aligned Action Button: Book Appointment (Triggers Modal) */}
                <BookApointement>
                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-full bg-[#00B771] hover:bg-[#009b60] text-white font-serif font-bold text-xs sm:text-sm text-center shadow-[0_6px_20px_rgba(0,183,113,0.35)] transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaRegCalendarAlt className="text-xs" />
                    <span>Book Appointment Online</span>
                  </button>
                </BookApointement>

              </div>
            </div>

            {/* WIDGET 3: SPECIALIZED SURGICAL EXPERTISE (Clinical Categories) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-5 sm:p-6">
              <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-[#0e6b56] uppercase block">
                    Advanced Care
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#112340] leading-tight mt-0.5">
                    Clinical Specialities
                  </h4>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-[#00B771] flex items-center justify-center text-xs">
                  <FaStethoscope />
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { name: "Gallbladder & Stone Surgery", path: "/treatment/gallbladder/gallbladderstones", tag: "Laser / Lap" },
                  { name: "Laparoscopic Hernia Repair", path: "/treatment/hernia/inguinalhernia", tag: "Daycare" },
                  { name: "Pancreas & Liver (HPB) Care", path: "/treatment/pancreas/pancreatictumor", tag: "Super-Speciality" },
                  { name: "GI & Colorectal Oncology", path: "/treatment/colorectal/coloncancer", tag: "Advanced Care" },
                  { name: "Piles, Fissure & Proctology", path: "/treatment/proctology/hemorrhoids", tag: "Minimally Invasive" },
                ].map((spec, i) => (
                  <Link
                    key={i}
                    to={spec.path}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f4f9f6] border border-transparent hover:border-emerald-200/70 transition-all text-xs"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-[#00B771] transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B771] group-hover:scale-125 transition-transform" />
                      <span>{spec.name}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-600 group-hover:text-[#0e6b56] font-medium transition-colors">
                      {spec.tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 4: SECOND OPINION / CONFIDENTIAL QUERY MINIMAL BADGE */}
            <div className="rounded-3xl p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-white text-[#00B771] shadow-xs flex items-center justify-center text-sm mb-2.5">
                <FaShieldAlt />
              </div>
              <h5 className="text-sm font-serif font-bold text-[#112340]">
                Need a Confidential Second Opinion?
              </h5>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Send your MRI, CT scans, or biopsy reports for an honest super-specialist surgical assessment.
              </p>
              <div className="mt-3.5 flex justify-center">
                <BookApointement>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-full bg-[#00B771] hover:bg-[#009b60] text-white font-serif font-bold text-xs shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
                  >
                    Request Case Review →
                  </button>
                </BookApointement>
              </div>
            </div>

          </aside>

        </div>

      </main>

      {/* FAQs Section */}
      <FaqSection />

      {/* Book Consultation Banner CTA (At the very bottom) */}
      <BookNowSection />

    </div>
  );
};

export default BlogDetail;
