import express from 'express';
import { create, list, get, update, remove } from '../controllers/habit.controller.js';
import { completeHabit, listHistory } from '../controllers/habitLog.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { createHabitSchema, updateHabitSchema } from '../validators/habit.validator.js';
import { createLogSchema } from '../validators/habitLog.validator.js';

const router = express.Router();

// Apply auth protection globally to all habit CRUD endpoints
router.use(protect);

router.route('/')
  .post(validate(createHabitSchema), create)
  .get(list);

router.route('/:id')
  .get(get)
  .put(validate(updateHabitSchema), update)
  .delete(remove);

// Nested endpoints for habit completion logging and history
router.route('/:habitId/logs')
  .post(validate(createLogSchema), completeHabit)
  .get(listHistory);

export default router;

