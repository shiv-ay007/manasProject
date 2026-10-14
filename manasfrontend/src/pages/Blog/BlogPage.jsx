import React, { useEffect } from 'react';
import BlogCard from './BlogCard';

import blogimage from '../../assets/blog.jpg';
import blogimage2 from '../../assets/blog1.jpeg';
import blogimage3 from '../../assets/blof2.jpeg';

import AOS from 'aos'; // Import AOS
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
  const error = useSelector((state) => state?.parent?.error);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  console.log("blog page")

  useEffect(() => {
    dispatch(getSections());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname === '/blog') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <section>
      <BreadCrumbs headText={"Our Blog"} items={breadcrumbItems} image={blogHeroBg} />
      <Helmet>
        <title>Our Blogs - Dr. Manas Aggarwal</title>
        <meta name="description" content="Explore insightful blogs by Dr. Manas Aggarwal, a leading gastroenterology surgeon in Lucknow, covering health tips, patient care, and medical insights." />
        <meta name="keywords" content="Blogs, Dr. Manas Aggarwal, Gastroenterology, Health Tips, Surgeon, Lucknow, Medical Insights" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {loading ? (
            // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlogCard key={index} />
            ))
          ) : (
            section1?.map((post, index) => (
              <BlogCard
                key={index}
                {...post}
                data-aos="fade-up" // Add AOS attribute for animation
              />
            ))
          )}
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
