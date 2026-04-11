import React, { useState } from 'react';
import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';
import { deletePaper as deletePaperApi } from '../../api/paperapi';
import { toastMessage } from '../../utils/toastMessage';

/**
 * DeletePaper Component
 * Provides a specialized confirmation UI for research paper deletion.
 * @param {Object} paper - The paper object to be deleted
 * @param {Function} onSuccess - Callback after successful deletion
 * @param {Function} onCancel - Callback to close the modal without deleting
 */
const DeletePaper = ({ paper, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!paper?._id) return;
        
        setLoading(true);
        try {
            const data = await deletePaperApi(paper._id);
            toastMessage(data.message, data.success);
            if (data.success) {
                onSuccess(paper._id);
            }
        } catch (err) {
            console.error('Error deleting paper:', err);
            toastMessage(err.message || 'Failed to delete paper', false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-full">
                    <FiAlertTriangle size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-900">Are you sure?</h3>
                    <p className="text-sm text-red-700">This action is irreversible and will permanently remove this paper from your library.</p>
                </div>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Paper to be deleted:</p>
                <h4 className="text-xl font-bold text-slate-900">{paper?.title}</h4>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <span>{paper?.author}</span>
                    <span className="text-slate-300">•</span>
                    <span>{paper?.domain}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    No, Cancel
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-[1.5] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-200 active:scale-[0.98] transition-all disabled:bg-red-400 group"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <FiTrash2 className="group-hover:rotate-12 transition-transform" />
                    )}
                    {loading ? 'Deleting...' : 'Yes, Delete Paper'}
                </button>
            </div>
        </div>
    );
};

export default DeletePaper;