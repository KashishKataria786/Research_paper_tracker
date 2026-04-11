import Paper from '../models/paper.model.js';
import mongoose from 'mongoose';

/**
 * Controller to handle analytics calculations for research papers.
 */
export const getPapersAnalytics = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(String(req.user));

        // 1. Summary Stats
        const stats = await Paper.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    totalPapers: { $sum: 1 },
                    avgCitations: { $avg: "$citationCount" },
                    fullyReadCount: {
                        $sum: { $cond: [{ $eq: ["$readingStage", "Fully Read"] }, 1, 0] }
                    }
                }
            }
        ]);

        const summary = stats.length > 0 ? {
            totalPapers: stats[0].totalPapers,
            avgCitations: Math.round(stats[0].avgCitations || 0),
            completionRate: Math.round((stats[0].fullyReadCount / stats[0].totalPapers) * 100) || 0
        } : { totalPapers: 0, avgCitations: 0, completionRate: 0 };

        // 2. Funnel Data (Reading Stages)
        const funnelData = await Paper.aggregate([
            { $match: { userId } },
            { $group: { _id: "$readingStage", count: { $sum: 1 } } },
            { $project: { name: "$_id", value: "$count", _id: 0 } }
        ]);

        // 3. Average Citations by Domain
        const avgCitationsByDomain = await Paper.aggregate([
            { $match: { userId } },
            { $group: { _id: "$domain", avgCitations: { $avg: "$citationCount" } } },
            { $project: { domain: "$_id", avg: { $round: ["$avgCitations", 1] }, _id: 0 } }
        ]);

        // 4. Scatter Plot Data (Citation vs Impact)
        const scatterData = await Paper.find({ userId }, { title: 1, citationCount: 1, impactScore: 1, _id: 0 });

        // 5. Stacked Bar Data (Domain + Stage)
        const distributionData = await Paper.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { domain: "$domain", stage: "$readingStage" },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.domain",
                    stages: {
                        $push: {
                            stage: "$_id.stage",
                            count: "$count"
                        }
                    }
                }
            },
            { $project: { domain: "$_id", stages: 1, _id: 0 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                summary,
                funnelData,
                avgCitationsByDomain,
                scatterData,
                distributionData
            }
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};
