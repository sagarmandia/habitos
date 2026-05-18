import express from 'express';
import { getStats } from '../controllers/analytics.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth protection globally to all dashboard analytics routes
router.use(protect);

router.get('/', getStats);

export default router;
