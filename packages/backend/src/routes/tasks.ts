import express, { Router } from 'express';
import { body, param } from 'express-validator';
import * as taskController from '../controllers/tasks';
import { validate } from '../middleware/validation';

const router: Router = express.Router();

// GET /api/tasks - Get all tasks
// This route is intentionally left incomplete for the interviewee to implement
// router.get('/', taskController.getAllTasks);

// POST /api/tasks - Create a new task
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
    validate,
  ],
  taskController.createTask
);

// GET /api/tasks/:id - Get a specific task
router.get(
  '/:id',
  [
    param('id').isInt().withMessage('Task ID must be an integer'),
    validate,
  ],
  taskController.getTaskById
);

// PUT /api/tasks/:id - Update a task
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Task ID must be an integer'),
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
    validate,
  ],
  taskController.updateTask
);

// DELETE /api/tasks/:id - Delete a task
router.delete(
  '/:id',
  [
    param('id').isInt().withMessage('Task ID must be an integer'),
    validate,
  ],
  taskController.deleteTask
);

// POST /api/tasks/:id/breakdown - Generate subtasks using AI
// This route is intentionally left incomplete for the interviewee to implement
// router.post(
//   '/:id/breakdown',
//   [
//     param('id').isInt().withMessage('Task ID must be an integer'),
//     validate,
//   ],
//   taskController.generateSubtasks
// );

export default router;