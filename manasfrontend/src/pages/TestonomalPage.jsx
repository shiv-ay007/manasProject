import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import image from '../assets/testo.png';
import BreadCrumbs from '../Component/BreadCums';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const testimonials = [
  {
    id: 1,
    name: "A P Singh",
    feedback: "He is very soft spoken, easily approachable.",
    date: "August 2024",
  },
  {
    id: 2,
    name: "August Tripathi",
    feedback: "He listens to your concerns and explains things clearly, never rushing you.",
    date: "August 2024",
  },
  {
    id: 3,
    name: "Reena Reena",
    feedback: "He deals with his patients very friendly.",
    date: "August 2024",
  },
  {
    id: 4,
    name: "Ashok Yadav",
    feedback: "Dr. Manas Aggarwal is one of the best surgeons. He is very humble, caring, and responsible.",
    date: "July 2024",
  },
  {
    id: 5,
    name: "Alok Dwivedi",
    feedback: "Dr. Agarwal did my hernia operation and it was very successful.",
    date: "July 2024",
  },
  // Additional testimonials
  {
    id: 6,
    name: "Mohit Tiwari",
    feedback: "Thank you for your wonderful care. You have a beautiful combination of professionalism and caring.",
    date: "June 2024",
  },
  {
    id: 7,
    name: "Pushpa Singh",
    feedback: "Dr. Manas has provided exceptional care and showed great professionalism.",
    date: "June 2024",
  },
  {
    id: 8,
    name: "Chhavi Dham",
    feedback: "Dr. Manas is very helpful, caring, and always willing to attend to his patients.",
    date: "May 2024",
  },
  {
    id: 9,
    name: "Jahnavi Srisvastva",
    feedback: "Dr. Manas is very helpful and showed great professionalism.",
    date: "May 2024",
  },
];

const TestimonialPage = () => {

  const location=useLocation()
  useEffect(() => {
    AOS.init();
  }, []);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Testimonials' },
  ];

  useEffect(() => {
    if (location.pathname === '/testonomial') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white min-h-screen pb-10">
      <BreadCrumbs headText={"What Our Clients Say"} items={breadcrumbItems} />
      <Helmet>
  <title>Testimonials - Dr. Manas Aggarwal</title>
  <meta name="description" content="Read testimonials from patients and colleagues about Dr. Manas Aggarwal, a leading gastroenterology surgeon in Lucknow." />
  <meta name="keywords" content="Testimonials, Dr. Manas Aggarwal, Gastroenterology, Surgeon, Lucknow, Patient Reviews" />
</Helmet>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* <h1 className="text-center text-3xl font-bold mb-6">What Our Clients Say</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-[3rem]">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              data-aos="fade-up" // AOS attribute for animation
              data-aos-duration="800" // Animation duration
              className="bg-white rounded-lg shadow-2xl p-6 flex flex-col cursor-pointer relative transition-transform transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <img
                  src={image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-4 border-[#4A6F8F] shadow-lg"
                />
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm italic">{testimonial.date}</p>
                </div>
              </div>
              <p className="text-gray-800 text-center italic mt-4">{testimonial.feedback}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4A6F8F] transition-transform transform scale-x-0 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialPage;
