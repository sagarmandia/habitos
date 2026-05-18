import Joi from 'joi';

const categories = ['mindfulness', 'growth', 'health', 'fitness', 'finance', 'other'];
const frequencies = ['daily', 'weekly', 'monthly'];

/**
 * Joi Validation Schemas for Habit operations.
 */
export const createHabitSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 2 characters long',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required',
    }),

  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 500 characters',
    }),

  category: Joi.string()
    .lowercase()
    .valid(...categories)
    .required()
    .messages({
      'string.base': 'Category must be a string',
      'any.only': `Category must be one of: ${categories.join(', ')}`,
      'any.required': 'Category is required',
    }),

  frequency: Joi.string()
    .lowercase()
    .valid(...frequencies)
    .required()
    .messages({
      'string.base': 'Frequency must be a string',
      'any.only': `Frequency must be one of: ${frequencies.join(', ')}`,
      'any.required': 'Frequency is required',
    }),

  targetCount: Joi.number()
    .integer()
    .min(1)
    .optional()
    .default(1)
    .messages({
      'number.base': 'Target count must be a number',
      'number.min': 'Target count must be at least 1',
    }),
});

export const updateHabitSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least 2 characters long',
      'string.max': 'Title cannot exceed 100 characters',
    }),

  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 500 characters',
    }),

  category: Joi.string()
    .lowercase()
    .valid(...categories)
    .optional()
    .messages({
      'string.base': 'Category must be a string',
      'any.only': `Category must be one of: ${categories.join(', ')}`,
    }),

  frequency: Joi.string()
    .lowercase()
    .valid(...frequencies)
    .optional()
    .messages({
      'string.base': 'Frequency must be a string',
      'any.only': `Frequency must be one of: ${frequencies.join(', ')}`,
    }),

  targetCount: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      'number.base': 'Target count must be a number',
      'number.min': 'Target count must be at least 1',
    }),

  isArchived: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'isArchived must be a boolean',
    }),
});
