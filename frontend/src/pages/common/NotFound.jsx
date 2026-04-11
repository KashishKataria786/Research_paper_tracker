import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
                {/* Animated 404 Text */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h1 className="text-[180px] md:text-[240px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-indigo-800 dark:from-blue-400 dark:to-indigo-600 select-none">
                        404
                    </h1>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                            <FiAlertCircle size={32} />
                            <span className="text-2xl font-bold tracking-tight uppercase">Archive Entry Missing</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">
                        This paper hasn't been published yet.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                        The resource you are looking for seems to have been lost in the digital archives or moved to a different publication.
                    </p>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link 
                        to="/dashboard"
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-500/10"
                    >
                        <FiHome size={20} />
                        Return Dashboard
                    </Link>
                    <Link 
                        to="/dashboard/papers"
                        className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                        <FiSearch size={20} />
                        Search Library
                    </Link>
                </motion.div>
            </div>

            {/* Footer Attribution */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 text-xs font-semibold text-slate-400 tracking-[0.2em] uppercase"
            >
                Research Library Archive System v2.0
            </motion.div>
        </div>
    );
};

export default NotFound;
