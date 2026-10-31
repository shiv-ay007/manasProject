import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Core Pages: Home loaded directly for fastest initial rendering
import Home from '../pages/Home/Home';

// Lazy-loaded Sub-pages: Loaded on-demand only when user visits them
const DoctorAbout = lazy(() => import('../pages/About/AboutDoctor'));
const ContactForm = lazy(() => import('../pages/Contact/ContactForm'));
const Cases = lazy(() => import('../pages/Cases/Cases'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const BlogDetail = lazy(() => import('../pages/Blog/BlogDetail'));
const TreatmentDetail = lazy(() => import('../pages/Treatments/TreatmentDetail'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-9 h-9 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const MainRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
        <Route
          path="/treatment/:category/:slug"
          element={
            <div className="pt-[68px] lg:pt-[76px]">
              <TreatmentDetail />
            </div>
          }
        />
        <Route
          path="/treatment/:slug"
          element={
            <div className="pt-[68px] lg:pt-[76px]">
              <TreatmentDetail />
            </div>
          }
        />

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
    </Suspense>
  );
};

export default MainRoutes;
