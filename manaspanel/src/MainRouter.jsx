import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layout/MainLayout';
import Dashboard from './Pages/Dashboard';
import WebsiteContent from './Pages/WebsiteContent';
import TextEditor from './Pages/TextEditor';
import Inquiry from './Pages/Inquiry';
import InquiryDetail from './Pages/InquiryDetail';
import BlogAdd from './Pages/BlogAdd';
import BlogView from './Pages/BlogView';
import BlogDetail from './Pages/BlogDetail';
import LoginForm from './Pages/LoginForm';

const MainRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.dynamic);

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />}
      />

      {/* Protected Routes wrapped inside MainLayout using Outlet */}
      <Route
        element={
          isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/website-content" element={<WebsiteContent />} />
        <Route path="/text-editor" element={<TextEditor />} />
        <Route path="/blog/add" element={<BlogAdd />} />
        <Route path="/blog/list" element={<BlogView />} />
        <Route path="/blog/detail" element={<BlogDetail />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/inquiry/detail" element={<InquiryDetail />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default MainRouter;
