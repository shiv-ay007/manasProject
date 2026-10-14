import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Core Pages
import Home from '../pages/Home/Home';
import DoctorAbout from '../pages/About/AboutDoctor';
import ContactForm from '../pages/Contact/ContactForm';
import Cases from '../pages/Cases/Cases';
import BlogPage from '../pages/Blog/BlogPage';
import BlogDetail from '../pages/Blog/BlogDetail';

// Treatment Routes
import { treatmentRoutes } from './treatmentRoutes';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Home />} />

      {/* About Route */}
      <Route
        path="/about-dr-manas-aggarwal"
        element={
          <div className="pt-[68px] lg:pt-[76px]">
            <DoctorAbout />
          </div>
        }
      />

      {/* Contact Route */}
      <Route
        path="/contact"
        element={
          <div className="pt-[68px] lg:pt-[76px]">
            <ContactForm />
          </div>
        }
      />

      {/* Treatment Routes */}
      {treatmentRoutes}

      {/* Cases / Clinical Showcase */}
      <Route
        path="/cases"
        element={
          <div className="pt-[68px] lg:pt-[76px]">
            <Cases />
          </div>
        }
      />

      {/* Blog Routes */}
      <Route
        path="/blog"
        element={
          <div className="pt-[68px] lg:pt-[76px]">
            <BlogPage />
          </div>
        }
      />
      <Route
        path="/blog/:title"
        element={
          <div className="pt-[68px] lg:pt-[76px]">
            <BlogDetail />
          </div>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
