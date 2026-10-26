import React, { useEffect, useMemo } from 'react';
import BlogCard from './BlogCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BreadCrumbs from '../../Component/BreadCums';
import blogHeroBg from '../../assets/blog-hero-bg.jpg';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getSections } from '../../redux/Slice/Parent.slice';
import SkeletonBlogCard from './SkeletonCard';
import BookNowSection from '../../Component/BookingSection';
import FaqSection from '../Home/FaqSection';

const BlogPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const section1 = useSelector((state) => state?.parent?.sections);
  const loading = useSelector((state) => state?.parent?.loading);

  const breadcrumbItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Blog' },
    ],
    []
  );

  // Initialize AOS smoothly with lightweight settings
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      easing: 'ease-out',
    });
    window.scrollTo(0, 0);
    document.title = 'Our Blogs - Dr. Manas Aggarwal';
  }, []);

  // Fetch sections
  useEffect(() => {
    dispatch(getSections());
  }, [dispatch]);

  // Refresh AOS when data arrives so positions are cleanly calculated
  useEffect(() => {
    if (section1?.length) {
      AOS.refresh();
    }
  }, [section1]);

  useEffect(() => {
    if (location.pathname === '/blog') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // If we already have sections in Redux, render them immediately without janky skeleton flash
  const hasCachedSections = Boolean(section1 && section1.length > 0);
  const showSkeleton = loading && !hasCachedSections;

  return (
    <section>
      <BreadCrumbs headText={'Our Blog'} items={breadcrumbItems} image={blogHeroBg} />
      <Helmet>
        <title>Our Blogs - Dr. Manas Aggarwal</title>
        <meta
          name="description"
          content="Explore insightful blogs by Dr. Manas Aggarwal, a leading gastroenterology surgeon in Lucknow, covering health tips, patient care, and medical insights."
        />
        <meta
          name="keywords"
          content="Blogs, Dr. Manas Aggarwal, Gastroenterology, Health Tips, Surgeon, Lucknow, Medical Insights"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {showSkeleton
            ? // Show skeleton cards only on cold initial load
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlogCard key={index} />
              ))
            : section1?.map((post, index) => (
                <BlogCard
                  key={post?._id || index}
                  {...post}
                  priority={index < 3}
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 80}
                />
              ))}
        </div>
      </div>

      {/* Booking CTA Section */}
      <BookNowSection />

      {/* Frequently Asked Questions Section */}
      <FaqSection />
    </section>
  );
};

export default BlogPage;
