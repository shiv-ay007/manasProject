import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdOutlineDescription,
  MdAdd,
  MdKeyboardArrowDown
} from 'react-icons/md';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { FaUserMd, FaBriefcaseMedical, FaPhoneVolume } from 'react-icons/fa';
import { HiOutlineXMark } from 'react-icons/hi2';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isBlogOpen, setIsBlogOpen] = useState(
    location.pathname.startsWith('/blog')
  );
  const [isCaseOpen, setIsCaseOpen] = useState(
    location.pathname.startsWith('/case')
  );

  useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      setIsBlogOpen(true);
    }
    if (location.pathname.startsWith('/case')) {
      setIsCaseOpen(true);
    }
  }, [location.pathname]);

  // Styles when expanded (w-64)
  const expandedListStyle =
    'flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#2B2F44] font-medium text-[0.95rem] transition-all duration-200 group w-full';
  const expandedActiveStyle =
    'flex items-center gap-3.5 py-3 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold text-[0.95rem] shadow-lg shadow-indigo-600/30 transition-all duration-200 w-full';

  // Styles when collapsed (w-20 icon-only mode)
  const collapsedListStyle =
    'flex items-center justify-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-[#2B2F44] transition-all duration-200 group w-full';
  const collapsedActiveStyle =
    'flex items-center justify-center p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 w-full';

  const handleBlogClick = () => {
    if (!isOpen) {
      // If closed, open sidebar and expand blog
      setIsOpen(true);
      setIsBlogOpen(true);
    } else {
      setIsBlogOpen(!isBlogOpen);
    }
  };

  const handleCaseClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsCaseOpen(true);
    } else {
      setIsCaseOpen(!isCaseOpen);
    }
  };

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile & Tablet Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full bg-[#1E1E2D] text-slate-200 border-r border-[#2C3146] shadow-2xl lg:shadow-none flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Top Header / Branding */}
        <div
          className={`flex items-center justify-between py-4 border-b border-[#2C3146] ${
            isOpen ? 'px-4' : 'justify-center px-2'
          }`}
        >
          {isOpen ? (
            <>
              <Link
                to="/dashboard"
                onClick={handleLinkClick}
                className="flex items-center gap-3 overflow-hidden"
              >
                <div className="bg-white/10 p-1 rounded-xl border border-slate-700/50 shadow-inner shrink-0">
                  <img
                    src={logo}
                    alt="Dr. Manas Logo"
                    className="w-10 h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="whitespace-nowrap">
                  <span className="block text-white font-bold text-base tracking-wide leading-tight">
                    Dr. Manas
                  </span>
                  <span className="block text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mt-0.5">
                    Admin Panel
                  </span>
                </div>
              </Link>

              {/* Mobile / Tablet Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden transition cursor-pointer"
                title="Close Sidebar"
                aria-label="Close Sidebar"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
            </>
          ) : (
            <Link
              to="/dashboard"
              title="Dr. Manas Dashboard"
              onClick={() => setIsOpen(true)}
              className="bg-white/10 p-1.5 rounded-xl border border-slate-700/50 hover:bg-white/20 transition"
            >
              <img
                src={logo}
                alt="Logo"
                className="w-9 h-auto object-cover rounded-lg"
              />
            </Link>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {isOpen && (
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Main Menu
            </p>
          )}

          {/* Dashboard */}
          <div>
            <NavLink
              to="/dashboard"
              title={!isOpen ? 'Dashboard' : ''}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isOpen
                  ? isActive
                    ? expandedActiveStyle
                    : expandedListStyle
                  : isActive
                  ? collapsedActiveStyle
                  : collapsedListStyle
              }
            >
              <MdOutlineDashboard className="text-2xl group-hover:scale-110 transition-transform shrink-0" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>
          </div>

          {/* Blog Section */}
          <div>
            <button
              onClick={handleBlogClick}
              title={!isOpen ? 'Blog' : ''}
              className={`${
                isOpen ? expandedListStyle : collapsedListStyle
              } justify-between cursor-pointer`}
            >
              <div className="flex items-center gap-3.5">
                <MdOutlineDescription className="text-2xl group-hover:scale-110 transition-transform shrink-0" />
                {isOpen && <span>Blog</span>}
              </div>
              {isOpen && (
                <MdKeyboardArrowDown
                  className={`text-xl transition-transform duration-200 ${
                    isBlogOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              )}
            </button>

            {/* Submenu (only visible when expanded) */}
            {isOpen && isBlogOpen && (
              <div className="pl-4 pr-1 mt-1 space-y-1 border-l-2 border-indigo-500/30 ml-4">
                <NavLink
                  to="/blog/add"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? expandedActiveStyle : expandedListStyle
                  }
                >
                  <MdAdd className="text-lg shrink-0" />
                  <span>Add Blog</span>
                </NavLink>

                <NavLink
                  to="/blog/list"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? expandedActiveStyle : expandedListStyle
                  }
                >
                  <MdOutlineDescription className="text-lg shrink-0" />
                  <span>View Blog</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Clinical Cases Section */}
          <div>
            <button
              onClick={handleCaseClick}
              title={!isOpen ? 'Clinical Cases' : ''}
              className={`${
                isOpen ? expandedListStyle : collapsedListStyle
              } justify-between cursor-pointer`}
            >
              <div className="flex items-center gap-3.5">
                <FaBriefcaseMedical className="text-2xl group-hover:scale-110 transition-transform shrink-0 text-emerald-400" />
                {isOpen && <span>Clinical Cases</span>}
              </div>
              {isOpen && (
                <MdKeyboardArrowDown
                  className={`text-xl transition-transform duration-200 ${
                    isCaseOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              )}
            </button>

            {/* Submenu (only visible when expanded) */}
            {isOpen && isCaseOpen && (
              <div className="pl-4 pr-1 mt-1 space-y-1 border-l-2 border-emerald-500/30 ml-4">
                <NavLink
                  to="/case/add"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? expandedActiveStyle : expandedListStyle
                  }
                >
                  <MdAdd className="text-lg shrink-0" />
                  <span>Add Case</span>
                </NavLink>

                <NavLink
                  to="/case/list"
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    isActive ? expandedActiveStyle : expandedListStyle
                  }
                >
                  <FaBriefcaseMedical className="text-base shrink-0" />
                  <span>View All Cases</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Callback Requests */}
          <div>
            <NavLink
              to="/appointments"
              title={!isOpen ? 'Callback Requests' : ''}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isOpen
                  ? isActive
                    ? expandedActiveStyle
                    : expandedListStyle
                  : isActive
                  ? collapsedActiveStyle
                  : collapsedListStyle
              }
            >
              <FaPhoneVolume className="text-xl group-hover:scale-110 transition-transform shrink-0 text-cyan-400" />
              {isOpen && <span>Callback Requests</span>}
            </NavLink>
          </div>

          {/* Enquiry */}
          <div>
            <NavLink
              to="/inquiry"
              title={!isOpen ? 'Enquiry' : ''}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isOpen
                  ? isActive
                    ? expandedActiveStyle
                    : expandedListStyle
                  : isActive
                  ? collapsedActiveStyle
                  : collapsedListStyle
              }
            >
              <GiMagnifyingGlass className="text-2xl group-hover:scale-110 transition-transform shrink-0" />
              {isOpen && <span>Enquiry</span>}
            </NavLink>
          </div>
        </div>

        {/* Bottom Profile Badge */}
        <div className="p-3 border-t border-[#2C3146]">
          {isOpen ? (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#282B3E] border border-slate-700/40">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shrink-0">
                <FaUserMd className="text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Dr. Manas</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center cursor-pointer"
              title="Dr. Manas (Online)"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                <FaUserMd className="text-lg" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
