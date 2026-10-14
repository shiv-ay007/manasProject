import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSignOutAlt } from 'react-icons/fa';
import { logoutManas } from '../redux/slices/dynamicSlice';

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirm = window.confirm('Are you sure you want to logout?');
    if (isConfirm) {
      dispatch(logoutManas());
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-30">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Hamburger Toggle Button (Works on Desktop & Mobile) */}
        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition duration-200 cursor-pointer shadow-sm"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>

        {/* Doctor Welcome Greeting */}
        <div>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome Dr. Manas Aggarwal
          </h1>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#EF4444] hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition duration-200 text-sm md:text-base cursor-pointer"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
