import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; // 🔥 Imported Toast
import { logoutManas } from '../redux/slices/dynamicSlice';

const Header = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Custom Beautiful Toast with Buttons
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-sm w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 overflow-hidden border border-slate-100`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <FaExclamationTriangle className="text-lg" />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-slate-900">
                Confirm Logout
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Are you sure you want to logout from your account?
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-slate-100 bg-slate-50">
          <div className="flex-1 flex divide-x divide-slate-100">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-bl-2xl p-3 flex items-center justify-center text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                // Actual Logout Logic
                dispatch(logoutManas());
                localStorage.removeItem('user');
                navigate('/login');
                toast.success('Logged out successfully!', {
                   style: { background: '#1e293b', color: '#fff' }
                });
              }}
              className="w-full border border-transparent rounded-none rounded-br-2xl p-3 flex items-center justify-center text-sm font-bold text-red-600 hover:bg-red-50 focus:outline-none transition-colors"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    ), {
      position: 'top-center',
      duration: 5000, // 5 seconds tak dikhega
    });
  };

  return (
    <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-30">
      
      {/* 🔥 Toaster for this specific header component */}
      <Toaster position="top-center" />

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
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-semibold shadow-sm transition duration-200 text-sm md:text-base cursor-pointer"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;