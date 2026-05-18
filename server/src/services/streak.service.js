import HabitLog from '../models/habitLog.model.js';
import Habit from '../models/habit.model.js';
import { getUTCDateString, diffInDays, isSameDay, isYesterday } from '../utils/date.js';

/**
 * Service to dynamically calculate and update habit streaks based on logs history.
 */
const calculateStreak = async (habitId) => {
  // Query all logs for the habit, sorted by completedAt descending
  const logs = await HabitLog.find({ habitId }).sort({ completedAt: -1 });

  if (logs.length === 0) {
    await Habit.findByIdAndUpdate(habitId, { streak: 0 });
    return 0;
  }

  // Extract and group logs by UTC YYYY-MM-DD string to ignore multiple entries per day
  const uniqueDates = [];
  const dateMap = new Set();

  for (const log of logs) {
    const dateStr = getUTCDateString(log.completedAt);
    if (!dateMap.has(dateStr)) {
      dateMap.add(dateStr);
      uniqueDates.push(new Date(log.completedAt));
    }
  }

  // Check the most recent log
  const today = new Date();
  const mostRecent = uniqueDates[0];

  // If the most recent log is older than yesterday, the streak is broken
  if (!isSameDay(mostRecent, today) && !isYesterday(mostRecent, today)) {
    await Habit.findByIdAndUpdate(habitId, { streak: 0 });
    return 0;
  }

  // Calculate current streak
  let currentStreak = 1;

  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const current = uniqueDates[i];
    const next = uniqueDates[i + 1];
    const diff = diffInDays(current, next);

    if (diff === 1) {
      currentStreak++;
    } else if (diff > 1) {
      break; // Streak broken historically
    }
  }

  // Cache/Save calculated streak count onto Habit document
  await Habit.findByIdAndUpdate(habitId, { streak: currentStreak });

  return currentStreak;
};

export default {
  calculateStreak,
};
