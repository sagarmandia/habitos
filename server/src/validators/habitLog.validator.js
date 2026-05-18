import Joi from 'joi';

/**
 * Joi Validation Schema for Habit completion logs.
 */
export const createLogSchema = Joi.object({
  completedAt: Joi.date()
    .max('now') // Enforce that completion cannot be set in the future
    .optional()
    .messages({
      'date.base': 'completedAt must be a valid date',
      'date.max': 'completedAt cannot be in the future',
    }),

  notes: Joi.string()
    .max(200)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 200 characters',
    }),
});
