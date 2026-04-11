import {ResponsiveContainer} from 'recharts'

const ChartContainer = ({ title, subtitle, children, className = "" }) => (
    <div className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col ${className}`}>
        <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);

export default ChartContainer