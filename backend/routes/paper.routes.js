import { addPaper, getAllPapers, updatePaper, deletePaper } from '../controllers/paper.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import express from 'express'

const router = express.Router();

// All routes are protected
router.use(authMiddleware);
router.post('/add', upload.single('pdf'), addPaper);
router.get('/all', getAllPapers);
router.put('/:id', updatePaper);
router.delete('/:id', deletePaper);

export default router;
