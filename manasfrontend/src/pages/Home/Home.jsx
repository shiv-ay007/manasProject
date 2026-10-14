import React, { useEffect } from 'react';
import HomeSlider from './Slider';
import HomeAbout from './HomeAbout';
import BlogSection from '../Blog/Blog';
import WhyChooseUs from './WhyWeChoose';
import ClinicStats from '../Stat/DoctorStat';
import BookNowSection from '../../Component/BookingSection';
import ServiceCard from '../Services/ServiceCard';
import CaseShowcase from './CaseShowcase';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GoogleReviewsWidget from '../../Component/GoolgeWidetBuget';
import PatientJourney from './PatientJourney';
import PatientReviews from './PatientReviews';
import FaqSection from './FaqSection';

const Home = () => {
  const location = useLocation();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Dr. Manas Aggarwal - Best Gastroenterology Surgeon &amp; Liver Specialist in Lucknow</title>
        <meta name="description" content="Dr. Manas Aggarwal is an ethical and experienced GI surgeon with over 19+ years of expertise, focusing on holistic treatment and modern techniques for gastrointestinal disorders." />
        <meta name="keywords" content="Gastroenterology, Liver Specialist, GI Surgeon, Lucknow, Dr. Manas Aggarwal, Healthcare, GI Surgery, Pancreatic Disorders" />
        <meta name="author" content="Dr. Manas Aggarwal" />

        {/* Open Graph Metadata (For Facebook & LinkedIn) */}
        <meta property="og:title" content="Dr. Manas Aggarwal - Best Gastroenterology Surgeon &amp; Liver Specialist in Lucknow" />
        <meta property="og:description" content="Expert in treating pancreatic disorders and other GI issues. Book your consultation today." />
        <meta property="og:image" content="URL_to_your_image" />
        <meta property="og:url" content="https://drmanasaggarwal.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card (For better sharing on Twitter) */}
        <meta name="twitter:title" content="Dr. Manas Aggarwal - Best Gastroenterology Surgeon &amp; Liver Specialist in Lucknow" />
        <meta name="twitter:description" content="Dr. Manas Aggarwal specializes in treating gastrointestinal disorders with modern techniques and holistic care." />
        <meta name="twitter:image" content="URL_to_your_image" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Contact Information */}
        <meta property="contact:email" content="aggarwal.manas@gmail.com" />
        <meta property="contact:phone" content="+91-8318208837" />
        <meta property="contact:location" content="Chandan Hospital, Faizabad Rd, Gomti Nagar, Lucknow" />

        {/* Structured Data for SEO (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Dr. Manas Aggarwal",
            "url": "https://yourwebsite.com",
            "image": "URL_to_your_image",
            "description": "Best Gastroenterology Surgeon & Liver Specialist in Lucknow with 19+ years of experience.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chandan Hospital, Faizabad Rd",
              "addressLocality": "Gomti Nagar",
              "addressRegion": "Lucknow",
              "postalCode": "226010",
              "addressCountry": "IN"
            },
            "telephone": "+91-8318208837",
            "sameAs": [
              "https://www.facebook.com/drmanasaggarwal",
              "https://www.instagram.com/drmanasaggarwal",
              "https://www.youtube.com/@DrManasAggarwal"
            ]
          })}
        </script>
      </Helmet>
      <HomeSlider />
      <HomeAbout />
      <ClinicStats />
      <ServiceCard />
      <WhyChooseUs />
      <PatientJourney />
      <CaseShowcase />
      <PatientReviews />
      <FaqSection />
      <BlogSection />
      <BookNowSection />
    </div>
  );
};

export default Home;
