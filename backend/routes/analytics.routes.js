import express from "express";
import { getPapersAnalytics } from "../controllers/analytics.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All analytics routes are protected
router.get("/", authMiddleware, getPapersAnalytics);

export default router;
