import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main 
          className={`flex-1 transition-all duration-300 p-4 sm:p-6 lg:p-10 ${
            isSidebarOpen 
              ? 'md:ml-64' 
              : 'md:ml-20'
          }`}
        >
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <div className={`transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
      </div>
    </div>
  );
};

export default DashboardLayout;
