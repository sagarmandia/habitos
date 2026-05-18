import HabitLog from '../models/habitLog.model.js';
import habitService from './habit.service.js';
import streakService from './streak.service.js';
import ApiError from '../utils/ApiError.js';
import { getStartOfDay, getEndOfDay } from '../utils/date.js';

/**
 * Service to manage completion logs for Habits.
 */
const logHabit = async (userId, habitId, logData = {}) => {
  // Enforce existence and ownership verification
  await habitService.getHabitById(userId, habitId);

  const completedAt = logData.completedAt ? new Date(logData.completedAt) : new Date();

  // Prevent duplicate logs for the same UTC calendar day
  const start = getStartOfDay(completedAt);
  const end = getEndOfDay(completedAt);

  const existingLog = await HabitLog.findOne({
    habitId,
    completedAt: {
      $gte: start,
      $lte: end,
    },
  });

  if (existingLog) {
    throw new ApiError(400, 'Habit has already been completed on this day');
  }

  // Create the HabitLog entry
  const log = await HabitLog.create({
    habitId,
    userId,
    completedAt,
    notes: logData.notes || '',
  });

  // Calculate and update the streak dynamically
  const streak = await streakService.calculateStreak(habitId);

  return {
    log,
    streak,
  };
};

const getHabitHistory = async (userId, habitId) => {
  // Enforce existence and ownership verification
  await habitService.getHabitById(userId, habitId);

  // Query logs sorted by completion date descending
  const logs = await HabitLog.find({ habitId }).sort({ completedAt: -1 });

  return logs;
};

export default {
  logHabit,
  getHabitHistory,
};
