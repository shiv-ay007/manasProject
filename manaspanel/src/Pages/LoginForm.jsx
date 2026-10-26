// src/Pages/LoginForm.jsx

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaHeartbeat, FaUserMd, FaLock, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../redux/slices/dynamicSlice';
import { showToast } from '../helper/sweetAlert';
import doctor from '../assets/Apron.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Force body/html to not scroll when this page is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyMargin = document.body.style.margin;
    const originalHtmlMargin = document.documentElement.style.margin;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.documentElement.style.margin = '0';
    document.body.style.width = '100%';
    document.documentElement.style.width = '100%';

    return () => {
      // restore on unmount so other pages can scroll normally
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.margin = originalBodyMargin;
      document.documentElement.style.margin = originalHtmlMargin;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await dispatch(handleLogin({ email, password }));
      if (response?.payload?.data) {
        showToast({
          icon: 'success',
          title: 'Welcome! Logged in successfully.',
          position: 'top-end',
          timer: 2500,
        });
        navigate('/');
      } else {
        const errMsg = response?.payload?.message || 'Invalid email or password';
        setError(errMsg);
        showToast({
          icon: 'error',
          title: errMsg,
          position: 'top-end',
          timer: 3500,
        });
      }
    } catch (err) {
      const errMsg = err.message || 'Something went wrong';
      setError(errMsg);
      showToast({
        icon: 'error',
        title: errMsg,
        position: 'top-end',
        timer: 3500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-[#0a1f24] overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f24] via-[#0d3835] to-[#071619]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-[140px] pointer-events-none"></div>

      {/* Center wrapper */}
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* Badge */}
          <div className="flex justify-center mb-12">
            <div className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm transition-all duration-300 hover:bg-white/15 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20 cursor-default">
              <FaHeartbeat className="text-emerald-400 transition-transform duration-300 group-hover:scale-125" />
              <span className="font-medium">Dr. Manas Aggarwal · Admin Portal</span>
            </div>
          </div>

          {/* Card */}
          <div className="relative rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] pt-12 pb-4 px-6 sm:px-8 transition-all duration-500 hover:border-emerald-400/30">

            {/* Avatar */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-400/40 to-teal-400/40 blur-md opacity-60 transition-all duration-500 group-hover:opacity-90"></div>
                <div className="relative rounded-full p-1 bg-gradient-to-tr from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/40">
                  <img
                    src={doctor}
                    alt="Dr. Manas Aggarwal"
                    className="h-20 w-20 sm:h-22 sm:w-22 rounded-full object-cover object-top bg-white transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-[3px] border-[#0a1f24] shadow-lg shadow-emerald-500/50">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Welcome <span className="text-emerald-400">Dr. Manas Aggarwal</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-300/80 mt-1">Sign in to continue to your dashboard</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-[11px] sm:text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs transition-all duration-300 group-focus-within:text-emerald-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="doctor@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-emerald-400/20 hover:border-white/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs transition-all duration-300 group-focus-within:text-emerald-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-emerald-400/20 hover:border-white/20 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-all duration-300 text-sm"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-gray-300 hover:text-white transition-colors duration-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-400/40 cursor-pointer"
                  />
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl font-semibold text-[#0a1f24] bg-gradient-to-r from-emerald-400 to-teal-400 shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                  loading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:from-emerald-300 hover:to-teal-300 hover:shadow-emerald-400/40 active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-3 pt-3 border-t border-white/10 text-center">
              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-2">
                <FaUserMd className="text-emerald-400/70" />
                Secure Healthcare Admin Access
              </p>
            </div>
          </div>

          <p className="mt-2.5 text-center text-[10px] text-gray-400">
            © {new Date().getFullYear()} Code Crafter Web Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;