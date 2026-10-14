import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthProvider } from './Component/AuthContext'; // Adjust the path as needed
import Home from './Pages/Home';
import WebsiteContent from './Pages/WebsiteContent';
import TextEditor from './Pages/TextEditor';
import Inquiry from './Pages/Inquiry';
import InquiryDetail from './Pages/InquiryDetail';
import BlogAdd from './Pages/BlogAdd';
import BlogView from './Pages/BlogView';
import LoginForm from './Pages/LoginForm';

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.dynamic);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/website-content" element={isAuthenticated ? <WebsiteContent /> : <Navigate to="/login" />} />
      <Route path="/text-editor" element={isAuthenticated ? <TextEditor /> : <Navigate to="/login" />} />
      <Route path="/blog/add" element={isAuthenticated ? <BlogAdd /> : <Navigate to="/login" />} />
      <Route path="/blog/list" element={isAuthenticated ? <BlogView /> : <Navigate to="/login" />} />
      <Route path="/inquiry" element={isAuthenticated ? <Inquiry /> : <Navigate to="/login" />} />
      <Route path="/inquiry/detail" element={isAuthenticated ? <InquiryDetail /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider> {/* Only routing logic here */}
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
