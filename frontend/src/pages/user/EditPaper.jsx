import React, { useState } from 'react';
import { FiSave, FiX, FiActivity, FiBookOpen, FiAward } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { updatePaper } from '../../api/paperapi';
import { stages, impactScores } from '../../utils/utils';
import {toastMessage  }from '../../utils/toastMessage'
const EditPaper = ({ paper, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        readingStage: paper.readingStage || stages[0],
        impactScore: paper.impactScore || 'Unknown',
        citationCount: paper.citationCount || 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updatePaper(paper._id, formData);
            if (response.success) {
                toastMessage(response.message,response.success)
                onSuccess();
            }
        } catch (err) {
            toastMessage(err.message || 'Failed to update paper', false)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
                <h3 className="text-slate-900 dark:text-white font-bold truncate">{paper.title}</h3>
                <p className="text-slate-500 text-xs mt-1">Editing metrics for research paper</p>
            </div>

            {/* Reading Stage Selection */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FiBookOpen className="text-blue-500" />
                    <label className="text-sm font-bold uppercase tracking-wider">Reading Stage</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {stages.map((stage) => (
                        <button
                            key={stage}
                            type="button"
                            onClick={() => setFormData({ ...formData, readingStage: stage })}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                                formData.readingStage === stage
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400'
                            }`}
                        >
                            {stage}
                        </button>
                    ))}
                </div>
            </div>

            {/* Impact Score Selection */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FiAward className="text-amber-500" />
                    <label className="text-sm font-bold uppercase tracking-wider">Impact Score</label>
                </div>
                <div className="flex flex-wrap gap-2">
                    {impactScores.map((score) => (
                        <button
                            key={score}
                            type="button"
                            onClick={() => setFormData({ ...formData, impactScore: score })}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                                formData.impactScore === score
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400'
                            }`}
                        >
                            {score}
                        </button>
                    ))}
                </div>
            </div>

            {/* Citation Count Input */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FiActivity className="text-emerald-500" />
                    <label className="text-sm font-bold uppercase tracking-wider">Citation Count</label>
                </div>
                <input
                    type="number"
                    min="0"
                    value={formData.citationCount}
                    onChange={(e) => setFormData({ ...formData, citationCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="Enter current citation count..."
                />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                >
                    <FiSave />
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditPaper;
