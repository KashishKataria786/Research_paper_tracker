import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiGrid, 
  FiFileText, 
  FiPieChart, 
  FiSettings, 
  FiCalendar, 
  FiBookmark,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard', end: true },
    { name: 'My Library', icon: <FiFileText />, path: '/dashboard/papers' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 sm:top-20 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-40 ${
        isOpen ? 'w-64 translate-x-0' : 'w-20 md:translate-x-0 -translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full py-6">
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-500'
                }`
              }
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={toggleSidebar}
            className="flex items-center gap-4 w-full px-3 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            <span className="text-xl shrink-0">
              {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </span>
            <span className={`font-medium transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              Collapse
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
