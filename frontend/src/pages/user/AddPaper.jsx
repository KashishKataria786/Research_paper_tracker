import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { toastMessage } from '../../utils/toastMessage';
import { useNavigate } from 'react-router-dom';
import { domains, stages, impactScores } from '../../utils/utils';
import { FiFileText } from 'react-icons/fi';
import { addPaper as addPaperApi } from '../../api/paperapi';

const AddPaper = ({ isModal = false, onSuccess }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        domain: 'Computer Science',
        readingStage: 'Abstract Read',
        citationCount: 0,
        impactScore: 'Unknown',
        dateAdded: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'citationCount' ? parseInt(value) || 0 : value
        }));
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSend = new FormData();
            
            // Append text fields
            Object.keys(formData).forEach(key => {
                dataToSend.append(key, formData[key]);
            });
            
            // Append file
            if (pdfFile) {
                dataToSend.append('pdf', pdfFile);
            }

            const data = await addPaperApi(dataToSend);
            toastMessage(data.message, data.success);

            if (data.success) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Error:', err);
            toastMessage(err.message || 'Connect to backend server first', false);
        } finally {
            setLoading(false);
        }
    };

    const formContent = (
        <form onSubmit={handleSubmit} className={`${isModal ? 'p-2' : 'p-8'} space-y-6`}>
            <div className={`grid grid-cols-1 gap-6 ${isModal ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                {/* Title - Span 2 */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Paper Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        placeholder="Enter the full title of the paper"
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Author</label>
                    <input
                        type="text"
                        name="author"
                        required
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                        placeholder="Author Name"
                    />
                </div>

                {/* Date Added */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Date Added</label>
                    <input
                        type="date"
                        name="dateAdded"
                        required
                        value={formData.dateAdded}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                    />
                </div>

                {/* Domain */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Research Domain</label>
                    <select
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none appearance-none bg-white"
                    >
                        {domains.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                {/* Impact Score */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Impact Score</label>
                    <select
                        name="impactScore"
                        value={formData.impactScore}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none appearance-none bg-white"
                    >
                        {impactScores.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Reading Stage */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reading Stage</label>
                    <select
                        name="readingStage"
                        value={formData.readingStage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none appearance-none bg-white"
                    >
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Citation Count */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Citation Count</label>
                    <input
                        type="number"
                        name="citationCount"
                        value={formData.citationCount}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                    />
                </div>

                {/* PDF Upload - Span 2 */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Research Paper (PDF)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiFileText className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="file"
                            name="pdf"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Max size 10MB. Only PDF files are supported.</p>
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition duration-200 ${
                        loading 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl'
                    }`}
                >
                    {loading ? 'Adding Paper...' : 'Add Research Paper'}
                </button>
            </div>
        </form>
    );

    if (isModal) {
        return formContent;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                            <h2 className="text-3xl font-extrabold text-white">Add New Research Paper</h2>
                            <p className="mt-2 text-blue-100">Track your reading progress and citations</p>
                        </div>
                        {formContent}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AddPaper;
