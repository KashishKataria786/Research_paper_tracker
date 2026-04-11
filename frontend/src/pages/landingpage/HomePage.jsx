import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiSearch, 
  FiZap, 
  FiShield, 
  FiLayers, 
  FiCheckCircle, 
  FiCpu 
} from 'react-icons/fi';

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-52 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse duration-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 animate-in fade-in slide-in-from-top-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
            Now with AI-Powered Summarization
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
            Elevate Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">Research</span> <br />
            Journey Effortlessly
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The all-in-one platform for modern academics. Track, organize, and analyze your research papers with intelligence and precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/25 flex items-center gap-2 group"
            >
              Get Started Free <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features" 
              className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-800"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
             <p className="text-sm font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-8">Trusted by researchers from</p>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-2xl font-black text-slate-400">RESEARCH.IO</span>
                <span className="text-2xl font-black text-slate-400">ACADEMIA</span>
                <span className="text-2xl font-black text-slate-400">SCIENCE.CO</span>
                <span className="text-2xl font-black text-slate-400">GLOBAL.ED</span>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Master Your Bibliography</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Powerful tools designed specifically for the rigorous demands of modern academic research.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiZap className="text-blue-600" />}
              title="Instant Import"
              description="Import papers via DOI, URL, or PDF. Our AI automatically extracts metadata for you."
            />
            <FeatureCard 
              icon={<FiSearch className="text-indigo-600" />}
              title="Semantic Search"
              description="Find what you need across thousands of papers with high-precision thematic search."
            />
            <FeatureCard 
              icon={<FiLayers className="text-emerald-600" />}
              title="Smart Collections"
              description="Automatically organize papers into relevant projects and topics using intelligent tagging."
            />
            <FeatureCard 
              icon={<FiShield className="text-amber-600" />}
              title="Secure Collaboration"
              description="Share your library with team members while keeping your annotations private."
            />
            <FeatureCard 
              icon={<FiCpu className="text-purple-600" />}
              title="Insight Analytics"
              description="Visualize your citation trends and research areas with interactive dashboards."
            />
            <FeatureCard 
              icon={<FiCheckCircle className="text-rose-600" />}
              title="Reading Progress"
              description="Track your reading status and set goals for your literature reviews."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Supercharge Your Research?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Join over 50,000+ researchers who have already optimized their academic workflow.</p>
          <Link 
            to="/add-paper" 
            className="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 shadow-2xl flex items-center gap-2 mx-auto w-fit"
          >
            Start Tracking Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">
    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export default HomePage;
