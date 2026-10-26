import React, { memo } from 'react';
import { FaRegCalendarAlt, FaBookOpen } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Cloudinary optimization helper: converts original multi-megabyte images to lightweight WebP/AVIF (600px width)
const optimizeCloudinaryUrl = (url, width = 600) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    if (!url.includes('/upload/f_auto')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill/`);
    }
  }
  return url;
};

const BlogCard = ({ title, category, photo, date, description, updatedAt, priority = false }) => {
  const removeHTMLTags = (text) => {
    return text ? text.replace(/<[^>]*>/g, '') : '';
  };

  const truncateText = (text, maxLength = 85) => {
    const cleanText = removeHTMLTags(text);
    if (cleanText.length > maxLength) {
      return cleanText.slice(0, maxLength) + '...';
    }
    return cleanText;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Recent';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const themeColor = '#00B771';
  const optimizedImgUrl = optimizeCloudinaryUrl(photo?.secure_url, 600);

  return (
    <Link
      to={`/blog/${encodeURIComponent(title)}`}
      state={{ title, category, photo, date, description }}
      aria-label={`Read article about ${title}`}
      className="group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl h-[280px] sm:h-[310px] md:h-[320px] border-[2px] border-slate-200/90 hover:border-[#00B771] shadow-sm hover:shadow-xl transition-all duration-500 ease-out cursor-pointer bg-slate-900"
    >
      {/* Full Background Image - Smooth Zoom & Decoded */}
      <img
        src={optimizedImgUrl}
        alt={title}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Ambient Image Dimmer Overlay */}
      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/35 transition-all duration-300 pointer-events-none" />

      {/* Top Category Badge */}
      {category && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0e6b56] text-[11px] font-bold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B771]" />
            {category.split('•')[0]?.trim() || category}
          </span>
        </div>
      )}

      {/* Top/Right Date Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium shadow-sm">
          <FaRegCalendarAlt className="text-teal-300 text-xs" />
          <span>{formatDate(updatedAt || date)}</span>
        </span>
      </div>

      {/* Center Dropping Floating Icon Badge (Smooth & Elegant Ease) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full group-hover:top-[30%] group-hover:-translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-none">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base shadow-lg transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: themeColor }}
        >
          <FaBookOpen />
        </div>
      </div>

      {/* Bottom Arched Wave Banner (Slides up gently on hover) */}
      <div className="absolute bottom-0 left-0 right-0 top-[68%] group-hover:top-[38%] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 flex flex-col justify-end pointer-events-none">
        {/* SVG Wave Arc */}
        <div className="relative w-full h-6 shrink-0">
          <svg
            className="absolute bottom-0 left-0 w-full h-full text-white/90 fill-current"
            viewBox="0 0 100 25"
            preserveAspectRatio="none"
          >
            <path d="M0,25 Q50,0 100,25 Z" />
          </svg>
        </div>

        {/* Frosted Bottom Container */}
        <div className="bg-white/95 backdrop-blur-md px-4 pb-4 pt-1 text-center flex-1 flex flex-col items-center justify-center">
          {/* Blog Title */}
          <h3 className="text-sm sm:text-base font-serif font-bold transition-colors duration-300 line-clamp-2 max-w-[92%] leading-snug">
            <span className="text-[#112340] group-hover:text-[#00B771] transition-colors duration-200">
              {title}
            </span>
          </h3>

          {/* Description & Read More revealed on hover */}
          <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-out overflow-hidden flex flex-col items-center mt-1">
            <p className="text-xs text-gray-600 line-clamp-2 font-normal leading-relaxed px-1">
              {truncateText(description)}
            </p>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00B771] mt-2 group-hover:translate-x-0.5 transition-transform duration-300">
              Read Article <FiArrowRight className="text-xs" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(BlogCard);
