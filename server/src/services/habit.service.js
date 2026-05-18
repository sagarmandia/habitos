import Habit from '../models/habit.model.js';
import ApiError from '../utils/ApiError.js';

/**
 * Service to manage business logic for Habits.
 */
const createHabit = async (userId, habitData) => {
  const habit = await Habit.create({
    ...habitData,
    userId,
  });
  return habit;
};

const getHabits = async (userId, queryFilters = {}) => {
  const filter = { userId };

  // Parse filters
  if (queryFilters.isArchived !== undefined) {
    filter.isArchived = queryFilters.isArchived === 'true';
  } else {
    // Default to active habits only
    filter.isArchived = false;
  }

  if (queryFilters.category) {
    filter.category = queryFilters.category.toLowerCase();
  }

  const habits = await Habit.find(filter).sort({ createdAt: -1 });
  return habits;
};

const getHabitById = async (userId, habitId) => {
  const habit = await Habit.findById(habitId);

  // Ownership verification: throw 404 to avoid resource leakage
  if (!habit || habit.userId.toString() !== userId.toString()) {
    throw new ApiError(404, 'Habit not found');
  }

  return habit;
};

const updateHabit = async (userId, habitId, updateData) => {
  // Check existence and ownership first
  await getHabitById(userId, habitId);

  const updatedHabit = await Habit.findByIdAndUpdate(
    habitId,
    updateData,
    {
      new: true, // Return modified document
      runValidators: true, // Run schema validation
    }
  );

  return updatedHabit;
};

const deleteHabit = async (userId, habitId) => {
  // Check existence and ownership first
  await getHabitById(userId, habitId);

  await Habit.findByIdAndDelete(habitId);
  return { success: true };
};

export default {
  createHabit,
  getHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
};
