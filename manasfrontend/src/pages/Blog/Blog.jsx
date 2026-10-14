import React, { useEffect } from 'react';
import BlogList from './BlogList';

import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from '../../redux/Slice/Parent.slice';
import SkeletonBlogCard from './SkeletonCard';

const BlogSection = () => {
  const dispatch = useDispatch();
  
  const section1 = useSelector((state) => state?.parent?.sections);
  const loading = useSelector((state) => state?.parent?.loading);
  const error = useSelector((state) => state?.parent?.error);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSections());
    };
    fetchData();
  }, [dispatch]);

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  // Only show a maximum of 3 blogs
  const visibleBlogs = section1 && section1.length > 0 ? section1.slice(0, 3) : [];

  return (
    <section className="relative bg-gradient-to-b from-[#ffffff] via-[#eef7f4] to-[#ffffff] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Distinct Style: Editorial Journal Ambient Light (No dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#1CB6E6]/14 rounded-full blur-[110px]" />
        <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-[#00B771]/14 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header matching upper sections */}
        <div className="text-center flex flex-col items-center justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-[#0e6b56] uppercase">
              Our Blog &amp; Health Insights
            </span>
            <span className="w-8 h-0.5 bg-[#00B771] rounded-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#112340] tracking-tight max-w-3xl leading-snug">
            Latest Articles &amp; Medical Insights
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
            Stay updated with expert advice, surgical breakthroughs, and digestive wellness tips from Dr. Manas Aggarwal.
          </p>
        </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 px-2">
          <SkeletonBlogCard />
          <SkeletonBlogCard />
          <SkeletonBlogCard />
        </div>
      ) : (
        <BlogList section={visibleBlogs} />
      )}
      {error && <p className="text-red-500 text-center">Error loading blogs.</p>}
      </div>
    </section>
  );
};

export default BlogSection;
