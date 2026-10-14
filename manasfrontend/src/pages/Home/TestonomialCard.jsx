import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import image from '../../assets/testo.png';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick'; // Import react-slick

const testimonials = [
    { id: 1, name: "A P Singh", feedback: "Excellent doctor, highly skilled and very attentive.", date: "August 2024" },
    { id: 2, name: "August Tripathi", feedback: "Caring and professional, makes you feel comfortable.", date: "August 2024" },
    { id: 3, name: "Reena Reena", feedback: "He treats his patients with great kindness and respect.", date: "August 2024" },
    { id: 4, name: "Ashok Yadav", feedback: "A truly remarkable surgeon, dedicated to patient care.", date: "July 2024" },
    { id: 5, name: "Alok Dwivedi", feedback: "Highly recommended! Exceptional care and follow-up.", date: "July 2024" },
    { id: 6, name: "Mohit Tiwari", feedback: "Professional, caring, and thorough in all treatments.", date: "June 2024" },
    { id: 7, name: "Pushpa Singh", feedback: "Very approachable and listens to all concerns patiently.", date: "June 2024" },
    { id: 8, name: "Chhavi Dham", feedback: "Great experience! Knowledgeable and attentive staff.", date: "May 2024" },
    { id: 9, name: "Jahnavi Srisvastva", feedback: "An exceptional doctor who truly cares about his patients.", date: "May 2024" },
  ];

const TestimonialPage = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (location.pathname === '/testimonial') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Slick carousel settings
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through the items
    speed: 500, // Transition speed
    slidesToShow: 3, // Show 3 slides on large screens
    slidesToScroll: 1, // Scroll one slide at a time
    responsive: [
      {
        breakpoint: 1024, // Large screen breakpoint
        settings: {
          slidesToShow: 2, // Show 2 cards
        },
      },
      {
        breakpoint: 768, // Tablet screen breakpoint
        settings: {
          slidesToShow: 1, // Show 1 card
        },
      },
    ],
  };

  return (
    <div className="bg-gray-200 py-20">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className='flex flex-col items-start md:items-center md:justify-center gap-2 mb-8'>
          <h2 className=''>Our Testimonials</h2>
          <h1 className=''>What Our Patients Say</h1>
        </div>

        {/* Adding space between cards */}
        <Slider {...settings} className="space-x-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              data-aos="fade-up"
              data-aos-duration="800"
              className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-6 m-4"
              style={{ width: "95%", margin: "0 auto", minHeight: "350px" }} // Setting consistent height
            >
              <div className="flex items-center mb-4">
                <img
                  src={image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-700 shadow-md"
                />
                <div className="ml-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm italic">{testimonial.date}</p>
                </div>
              </div>
              <p className="text-gray-600 text-center italic">{testimonial.feedback}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialPage;
