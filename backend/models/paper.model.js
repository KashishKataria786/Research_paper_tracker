import mongoose from 'mongoose'

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Paper title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'First author name is required'],
        trim: true
    },
    domain: {
        type: String,
        required: [true, 'Research domain is required'],
        enum: ['Computer Science', 'Biology', 'Physics', 'Chemistry', 'Mathematics', 'Social Sciences']
    },
    readingStage: {
        type: String,
        required: [true, 'Reading stage is required'],
        enum: ['Abstract Read', 'Introduction Done', 'Methodology Done', 'Results Analyzed', 'Fully Read', 'Notes Completed']
    },
    citationCount: {
        type: Number,
        default: 0
    },
    impactScore: {
        type: String,
        required: [true, 'Impact score is required'],
        enum: ['High Impact', 'Medium Impact', 'Low Impact', 'Unknown']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    pdfUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export default mongoose.model('Paper', paperSchema)



