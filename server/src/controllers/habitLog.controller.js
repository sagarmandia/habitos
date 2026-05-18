import habitLogService from '../services/habitLog.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Mark a habit as complete (Create completion log)
 * @route   POST /api/habits/:habitId/logs
 * @access  Private
 */
export const completeHabit = asyncHandler(async (req, res) => {
  const { habitId } = req.params;
  const result = await habitLogService.logHabit(req.user._id, habitId, req.body);

  res.status(201).json({
    success: true,
    message: 'Habit marked as complete successfully',
    data: result,
  });
});

/**
 * @desc    Get completion logs history for a habit
 * @route   GET /api/habits/:habitId/logs
 * @access  Private
 */
export const listHistory = asyncHandler(async (req, res) => {
  const { habitId } = req.params;
  const logs = await habitLogService.getHabitHistory(req.user._id, habitId);

  res.status(200).json({
    success: true,
    message: 'Habit logs history retrieved successfully',
    count: logs.length,
    data: {
      logs,
    },
  });
});
