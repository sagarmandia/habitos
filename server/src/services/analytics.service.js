import Habit from '../models/habit.model.js';
import HabitLog from '../models/habitLog.model.js';
import { getStartOfDay, getEndOfDay } from '../utils/date.js';

/**
 * Service to aggregate dashboard metrics and analytics.
 */
const getDashboardStats = async (userId) => {
  const today = new Date();
  const startOfToday = getStartOfDay(today);
  const endOfToday = getEndOfDay(today);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 6); // Include today (7 days total)
  const startOfSevenDaysAgo = getStartOfDay(sevenDaysAgo);

  // Execute highly optimized concurrent database index hits
  const [
    activeHabits,
    completedTodayCount,
    last7DaysLogsCount,
    recentLogs
  ] = await Promise.all([
    // 1. Fetch active habits list to calculate counts and streaks
    Habit.find({ userId, isArchived: false }),

    // 2. Fetch log count for today
    HabitLog.countDocuments({
      userId,
      completedAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    }),

    // 3. Fetch completion count for last 7 days
    HabitLog.countDocuments({
      userId,
      completedAt: {
        $gte: startOfSevenDaysAgo,
      },
    }),

    // 4. Fetch last 5 logs populated with Habit details
    HabitLog.find({ userId })
      .populate('habitId', 'title category')
      .sort({ completedAt: -1 })
      .limit(5)
  ]);

  // Calculate Streak Metrics
  const activeHabitsCount = activeHabits.length;
  let highestStreak = 0;
  let totalStreaks = 0;

  for (const habit of activeHabits) {
    if (habit.streak > highestStreak) {
      highestStreak = habit.streak;
    }
    totalStreaks += habit.streak;
  }

  // Calculate 7-Day Completion Rate Percentage
  let completionRate = 0;
  if (activeHabitsCount > 0) {
    const maxExpectedCompletions = activeHabitsCount * 7;
    completionRate = Math.min(
      100,
      Math.round((last7DaysLogsCount / maxExpectedCompletions) * 100)
    );
  }

  // Format Recent Activities Feed
  const recentActivity = recentLogs.map((log) => ({
    _id: log._id,
    completedAt: log.completedAt,
    notes: log.notes,
    habit: log.habitId
      ? {
          _id: log.habitId._id,
          title: log.habitId.title,
          category: log.habitId.category,
        }
      : null,
  }));

  return {
    metrics: {
      totalHabits: activeHabitsCount,
      completedToday: completedTodayCount,
      highestStreak,
      totalStreaks,
      completionRate,
    },
    recentActivity,
  };
};

export default {
  getDashboardStats,
};
