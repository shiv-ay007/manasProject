import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSignOutAlt } from 'react-icons/fa';
import { logoutManas } from '../redux/slices/dynamicSlice';
import { confirmAction, showToast } from '../helper/sweetAlert';

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isConfirmed = await confirmAction({
      title: 'Confirm Logout',
      text: 'Are you sure you want to logout from your admin session?',
      icon: 'warning',
      confirmButtonText: 'Yes, Logout',
      confirmButtonColor: '#e11d48',
    });

    if (isConfirmed) {
      dispatch(logoutManas());
      localStorage.removeItem('user');
      showToast({
        icon: 'success',
        title: 'Logged out successfully!',
      });
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm px-3 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-30 gap-2">
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        {/* Hamburger Toggle Button (Works on Desktop, Tablet & Mobile) */}
        <button
          onClick={onToggleSidebar}
          className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition duration-200 cursor-pointer shadow-sm shrink-0"
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu className="text-xl sm:text-2xl" />
        </button>

        {/* Doctor Welcome Greeting */}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-extrabold text-slate-800 tracking-tight truncate">
            <span className="hidden sm:inline">Welcome </span>
            <span>Dr. Manas Aggarwal</span>
          </h1>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 sm:gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-semibold shadow-sm transition duration-200 text-xs sm:text-sm cursor-pointer"
          title="Logout"
        >
          <FaSignOutAlt className="text-xs sm:text-sm" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;