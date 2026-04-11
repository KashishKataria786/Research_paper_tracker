import React, { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    ScatterChart, Scatter, ZAxis, 
    FunnelChart, Funnel, LabelList,
    Cell
} from 'recharts';
import { FiTrendingUp, FiBookOpen, FiAward, FiPieChart, FiActivity } from 'react-icons/fi';
import { getAnalytics } from '../../api/analyticsapi';
import {COLORS} from '../../utils/utils'
import StatCard from '../../components/ui/StatCard';
import ChartContainer from '../../components/ui/ChartContainer';
import LoadingSpinner from '../../components/common/LoadingSpinner'


const AnalyticsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await getAnalytics();
                if (response.success) {
                    setData(response.data);
                }
            } catch (err) {
                console.error('Analytics Fetch Error:', err);
                toastMessage('Failed to Fetch Analytics ', false);
                setError(err.message || 'Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (<LoadingSpinner/>);

    if (error) return (
        
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100 m-8">
                <FiActivity size={40} className="mx-auto mb-4" />
                <h2 className="text-xl font-bold">Analytics not available</h2>
                <p className="mt-2">{error}</p>
            </div>
        
    );

    if (!data || data.summary.totalPapers === 0) return (
        
            <div className="p-12 text-center text-slate-500 space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <FiPieChart size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Your Library is Hungry</h2>
                <p>Start adding research papers to see your reading analytics in real-time.</p>
            </div>
        
    );

    // Transform Distribution data for Stacked Bar
    const barData = data.distributionData.map(item => {
        const row = { domain: item.domain };
        item.stages.forEach(stage => {
            row[stage.stage] = stage.count;
        });
        return row;
    });

    const stages = [...new Set(data.distributionData.flatMap(item => item.stages.map(s => s.stage)))];

    return (
        
            <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Research Analytics</h1>
                        <p className="text-slate-600 mt-1">Holistic view of your research progress and citations.</p>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Library" 
                        value={data.summary.totalPapers} 
                        icon={FiBookOpen} 
                        color="bg-blue-600" 
                        label="Papers in repository"
                    />
                    <StatCard 
                        title="Completion Rate" 
                        value={`${data.summary.completionRate}%`} 
                        icon={FiTrendingUp} 
                        color="bg-emerald-600" 
                        label="Fully read papers"
                    />
                    <StatCard 
                        title="Avg Citations" 
                        value={data.summary.avgCitations} 
                        icon={FiAward} 
                        color="bg-amber-500" 
                        label="Per paper impact"
                    />
                    <StatCard 
                        title="Top Domain" 
                        value={data.avgCitationsByDomain[0]?.domain || 'N/A'} 
                        icon={FiPieChart} 
                        color="bg-indigo-600" 
                        label="By citation volume"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {/* Funnel Chart */}
                    <ChartContainer title="Reading Stage Funnel" subtitle="Distribution of papers across the reading pipeline">
                        <FunnelChart width={400} height={300}>
                            <Tooltip />
                            <Funnel
                                data={data.funnelData}
                                dataKey="value"
                            >
                                {data.funnelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <LabelList position="right" fill="#4B5563" stroke="none" dataKey="name" fontSize={12} />
                                <LabelList position="center" fill="#fff" stroke="none" dataKey="value" />
                            </Funnel>
                        </FunnelChart>
                    </ChartContainer>

                    {/* Stacked Bar Chart */}
                    <ChartContainer title="Domain vs Reading Stage" subtitle="Research progress distributed by domain">
                        <BarChart data={barData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="domain" stroke="#6B7280" fontSize={12} width={100} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                            />
                            <Legend iconType="circle" />
                            {stages.map((stage, index) => (
                                <Bar key={stage} dataKey={stage} stackId="a" fill={COLORS[index % COLORS.length]} radius={index === stages.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]} />
                            ))}
                        </BarChart>
                    </ChartContainer>

                    {/* Scatter Plot */}
                    <ChartContainer title="Citations vs Impact Score" subtitle="Relationship between external citations and subjective impact" className="xl:col-span-2">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis type="number" dataKey="citationCount" name="Citations" stroke="#6B7280" />
                            <YAxis type="category" dataKey="impactScore" name="Impact" stroke="#6B7280" />
                            <ZAxis type="number" range={[100, 500]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            <Scatter name="Research Papers" data={data.scatterData} fill="#3b82f6" shape="circle" />
                        </ScatterChart>
                    </ChartContainer>

                </div>
            </div>
    
    );
};


export default AnalyticsPage;
