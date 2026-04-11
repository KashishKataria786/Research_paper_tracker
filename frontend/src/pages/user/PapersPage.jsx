import { AnimatePresence, motion } from 'framer-motion';
import {useState, useEffect} from 'react'
import { FiSearch, FiFilter, FiUpload, FiExternalLink, FiTrash2, FiEdit2, FiCheck, FiX, FiFileText, FiLayers, FiBookOpen, FiActivity, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AnimatedModal from '../../components/common/AnimatedModal'
import { getAllPapers } from '../../api/paperapi';
import { domains, stages, impactScores } from '../../utils/utils';

import AddPaper from './AddPaper';
import DeletePaper from './DeletePaper';
import EditPaper from './EditPaper';

const PapersPage = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState(null);
  const [paperToEdit, setPaperToEdit] = useState(null);

  // Filter States
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedScores, setSelectedScores] = useState([]);
  const [dateRange, setDateRange] = useState('All time');

  const API_URL = 'http://localhost:5001';
  
  const fetchPapers = async () => {
    try {
      const data = await getAllPapers();
      if (data.success) {
        setPapers(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch papers');
      }
    } catch (err) {
      console.error('Error fetching papers:', err);
      toast.error(err.message || 'Connect to backend server first');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleAddSuccess = () => {
    fetchPapers();
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (paper) => {
    setPaperToDelete(paper);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = (id) => {
    setPapers(papers.filter(p => p._id !== id));
    setIsDeleteModalOpen(false);
    setPaperToDelete(null);
  };

  const handleEditClick = (paper) => {
    setPaperToEdit(paper);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    fetchPapers();
    setIsEditModalOpen(false);
    setPaperToEdit(null);
  };

  const toggleFilter = (category, value) => {
    const setters = {
      domains: setSelectedDomains,
      stages: setSelectedStages,
      scores: setSelectedScores
    };
    const setter = setters[category];
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const clearAllFilters = () => {
    setSelectedDomains([]);
    setSelectedStages([]);
    setSelectedScores([]);
    setDateRange('All time');
  };

  const matchesDate = (paperDate) => {
    if (dateRange === 'All time') return true;
    const paperTime = new Date(paperDate).getTime();
    const now = new Date().getTime();
    const diffDays = (now - paperTime) / (1000 * 60 * 60 * 24);
    
    if (dateRange === 'This Week') return diffDays <= 7;
    if (dateRange === 'This Month') return diffDays <= 30;
    if (dateRange === 'Last 3 Months') return diffDays <= 90;
    return true;
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = selectedDomains.length === 0 || selectedDomains.includes(paper.domain);
    const matchesStage = selectedStages.length === 0 || selectedStages.includes(paper.readingStage);
    const matchesScore = selectedScores.length === 0 || selectedScores.includes(paper.impactScore);

    return matchesSearch && matchesDomain && matchesStage && matchesScore && matchesDate(paper.dateAdded);
  });

  const FilterSection = ({ icon: IconComponent, title, options, selectedItems, type }) => (
    <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-1.5">
            <IconComponent className="text-blue-600" size={16} />
            <h3 className="font-bold text-[11px] uppercase tracking-wider">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {options.map(option => {
                const isSelected = selectedItems.includes(option);
                return (
                    <button
                        key={option}
                        onClick={() => toggleFilter(type, option)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                            isSelected 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    </div>
  );

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your library...</div>;

  return (
    <>
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Research Papers</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and organize your personal library.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          <FiUpload /> Add Paper
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, author, or keyword..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all relative ${
                showFilters 
                ? 'bg-slate-900 border-slate-900 text-white dark:bg-blue-600 dark:border-blue-600 shadow-lg' 
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <FiFilter /> Filters
            {(selectedDomains.length + selectedStages.length + selectedScores.length > 0 || dateRange !== 'All time') && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {selectedDomains.length + selectedStages.length + selectedScores.length + (dateRange !== 'All time' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
            {showFilters && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20"
                >
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <FilterSection 
                            icon={FiLayers}
                            title="Research Domains"
                            options={domains}
                            selectedItems={selectedDomains}
                            type="domains"
                        />
                        <FilterSection 
                            icon={FiBookOpen}
                            title="Reading Stages"
                            options={stages}
                            selectedItems={selectedStages}
                            type="stages"
                        />
                        <FilterSection 
                            icon={FiActivity}
                            title="Impact Scores"
                            options={impactScores}
                            selectedItems={selectedScores}
                            type="scores"
                        />
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-1.5">
                                <FiCalendar className="text-blue-600" size={16} />
                                <h3 className="font-bold text-[11px] uppercase tracking-wider">Date Added</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['All time', 'This Week', 'This Month', 'Last 3 Months'].map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setDateRange(option)}
                                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                                            dateRange === option 
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-4 flex justify-end">
                        <button
                            onClick={clearAllFilters}
                            className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors"
                        >
                            <FiX /> Reset All Filters
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Active Filter Chips */}
        {(selectedDomains.length > 0 || selectedStages.length > 0 || selectedScores.length > 0 || dateRange !== 'All time') && (
          <div className="px-4 pb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
            {selectedDomains.map(d => (
              <span key={d} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">
                {d} <FiX className="cursor-pointer" onClick={() => toggleFilter('domains', d)} />
              </span>
            ))}
            {selectedStages.map(s => (
              <span key={s} className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-md border border-indigo-100">
                {s} <FiX className="cursor-pointer" onClick={() => toggleFilter('stages', s)} />
              </span>
            ))}
            {selectedScores.map(sc => (
              <span key={sc} className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-md border border-emerald-100">
                {sc} <FiX className="cursor-pointer" onClick={() => toggleFilter('scores', sc)} />
              </span>
            ))}
            {dateRange !== 'All time' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-md border border-amber-100">
                {dateRange} <FiX className="cursor-pointer" onClick={() => setDateRange('All time')} />
              </span>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-xs text-slate-400 hover:text-slate-600 underline font-medium ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Authors</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPapers.length > 0 ? filteredPapers.map((paper) => (
                <tr key={paper._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{paper.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{new Date(paper.dateAdded).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{paper.author}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{paper.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      paper.readingStage === 'Fully Read' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      paper.readingStage === 'Abstract Read' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {paper.readingStage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        {paper.pdfUrl && (
                          <a 
                            href={`${API_URL}${paper.pdfUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                            title="View PDF"
                          >
                            <FiFileText />
                          </a>
                        )}
                        <button 
                          onClick={() => handleEditClick(paper)}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(paper)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No papers found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Add Paper Modal */}
    <AnimatedModal 
      isOpen={isAddModalOpen} 
      onClose={() => setIsAddModalOpen(false)} 
      title="Add New Research Paper"
      width="max-w-2xl"
    >
      <AddPaper isModal={true} onSuccess={handleAddSuccess} />
    </AnimatedModal>

    {/* Delete Confirmation Modal */}
    <AnimatedModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      title="Confirm Deletion"
      width="max-w-xl"
    >
      <DeletePaper 
        paper={paperToDelete} 
        onSuccess={handleDeleteSuccess} 
        onCancel={() => setIsDeleteModalOpen(false)} 
      />
    </AnimatedModal>

    {/* Edit Paper Modal */}
    <AnimatedModal
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      title="Edit Paper Metrics"
      width="max-w-xl"
    >
      <EditPaper 
        paper={paperToEdit} 
        onSuccess={handleEditSuccess} 
        onCancel={() => setIsEditModalOpen(false)} 
      />
    </AnimatedModal>
    </>
  );
};

export default PapersPage;
