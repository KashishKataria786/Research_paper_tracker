const StatCard = ({ title, value, icon: IconComponent, color, label }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] -mr-8 -mt-8 rounded-full group-hover:scale-110 transition-transform`}></div>
        <div className="flex items-center gap-4">
            <div className={`p-3 ${color} bg-opacity-10 rounded-2xl text-blue-600`}>
                <IconComponent size={24} className="text-current" />
            </div>
            <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
            </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 font-medium">{label}</p>
    </div>
);

export default StatCard