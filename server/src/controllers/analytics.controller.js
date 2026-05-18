import analyticsService from '../services/analytics.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Get dashboard metrics and historical log activity feeds
 * @route   GET /api/analytics
 * @access  Private
 */
export const getStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats(req.user._id);

  res.status(200).json({
    success: true,
    message: 'Dashboard stats retrieved successfully',
    data: stats,
  });
});
