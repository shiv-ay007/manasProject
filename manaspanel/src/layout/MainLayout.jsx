import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  // Default open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Dynamic Nested Content via Outlet */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>

        {/* Bottom Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
