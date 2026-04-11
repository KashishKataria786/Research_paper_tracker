import Paper from '../models/paper.model.js';

export const addPaper = async (req, res) => {
    try {
        const { title, author, domain, readingStage, citationCount, impactScore, dateAdded } = req.body;
        const userId = req.user; // Set by authMiddleware
        
        // Handle PDF file if uploaded
        let pdfUrl = '';
        if (req.file) {
            pdfUrl = `/uploads/${req.file.filename}`;
        }

        if (!title || !author || !domain || !readingStage || !impactScore) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const paper = await Paper.create({
            title,
            author,
            domain,
            readingStage,
            citationCount,
            impactScore,
            userId,
            dateAdded: dateAdded || Date.now(),
            pdfUrl
        });

        res.status(201).json({
            success: true,
            message: 'Paper added successfully',
            data: paper
        });
    } catch (error) {
        console.error('Error adding paper:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};

export const updatePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        let paper = await Paper.findOne({ _id: id, userId });

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found or unauthorized'
            });
        }

        paper = await Paper.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Paper updated successfully',
            data: paper
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};

export const deletePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        const paper = await Paper.findOne({ _id: id, userId });

        if (!paper) {
            return res.status(404).json({
                success: false,
                message: 'Paper not found or unauthorized'
            });
        }

        await Paper.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Paper deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};

export const getAllPapers = async (req, res) => {
    try {
        const userId = req.user;
        const papers = await Paper.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: papers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};
