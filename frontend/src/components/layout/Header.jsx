import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBookOpen, FiPlus, FiGrid, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
      <div className=" mx-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                <FiBookOpen className="text-xl" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResearchTracker
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            
            
            {user ? (
              <><Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Home
            </Link>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600 ${isDashboard ? 'text-blue-600' : 'text-slate-600 dark:text-slate-400'}`}
                >
                   Dashboard
                </Link>
                {/* <Link 
                  to="/add-paper" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FiPlus /> Add Paper
                </Link> */}
                <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600">
                            <FiUser />
                        </div>
                        {user.name.split(' ')[0]}
                    </span>
                    <button 
                        onClick={logout}
                        className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <FiLogOut className="text-xl" />
                    </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-all shadow-lg shadow-slate-200/50 dark:shadow-none"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button (Simplified for now) */}
          <div className="md:hidden">
            <button className="p-2 text-slate-600 dark:text-slate-400">
              <FiGrid className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
