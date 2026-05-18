import habitService from '../services/habit.service.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Create a new habit
 * @route   POST /api/habits
 * @access  Private
 */
export const create = asyncHandler(async (req, res) => {
  const habit = await habitService.createHabit(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: 'Habit created successfully',
    data: {
      habit,
    },
  });
});

/**
 * @desc    Get all active habits for authenticated user
 * @route   GET /api/habits
 * @access  Private
 */
export const list = asyncHandler(async (req, res) => {
  const habits = await habitService.getHabits(req.user._id, req.query);

  res.status(200).json({
    success: true,
    message: 'Habits retrieved successfully',
    count: habits.length,
    data: {
      habits,
    },
  });
});

/**
 * @desc    Get single habit details
 * @route   GET /api/habits/:id
 * @access  Private
 */
export const get = asyncHandler(async (req, res) => {
  const habit = await habitService.getHabitById(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Habit retrieved successfully',
    data: {
      habit,
    },
  });
});

/**
 * @desc    Update a habit
 * @route   PUT /api/habits/:id
 * @access  Private
 */
export const update = asyncHandler(async (req, res) => {
  const habit = await habitService.updateHabit(req.user._id, req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Habit updated successfully',
    data: {
      habit,
    },
  });
});

/**
 * @desc    Delete a habit
 * @route   DELETE /api/habits/:id
 * @access  Private
 */
export const remove = asyncHandler(async (req, res) => {
  await habitService.deleteHabit(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Habit deleted successfully',
    data: null,
  });
});
