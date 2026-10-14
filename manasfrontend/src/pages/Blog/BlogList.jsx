import React, { useEffect } from 'react';
import BlogCard from './BlogCard';
import blogimage from '../../assets/blog.jpg';
import image1 from '../../assets/blog1.jpeg';
import image2 from '../../assets/blof2.jpeg';
import AOS from 'aos'; // Import AOS

const BlogList = ({section}) => {
  const blogData = [
    {
      title: 'COVID-19 and Mental Health',
      category: 'Depression • Mental Health',
      date: 'October 14th, 2024',
      description: 'Exploring the psychological impact of the COVID-19 pandemic on mental health.',
      imgSrc: blogimage,
    },
    {
      title: 'Coping with Mental Illness in the Family',
      category: 'Mindfulness • Young People',
      date: 'October 12th, 2024',
      description: 'Strategies for supporting family members struggling with mental health issues.',
      imgSrc: image1,
    },
    {
      title: 'How Pets Can Help with Depression',
      category: 'Prevention Resources • Trauma',
      date: 'October 10th, 2024',
      description: 'The benefits of pet ownership on mental health and emotional well-being.',
      imgSrc: image2
    },
    // More blog data can be added here
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
  };

 
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 px-2">
      {section.map((post, index) => (
        <BlogCard
          key={index}
          {...post}
          data-aos="fade-up" // Add AOS attribute for animation
        />
      ))}
    </div>
  );
};

export default BlogList;
