import express, { Router, Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import * as taskController from '../controllers/tasks';
import { validate } from '../middleware/validation';

const router: Router = express.Router();

// Add debugging middleware for all requests to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[TASKS ROUTER] ${req.method} ${req.originalUrl}`);
  console.log('Request headers:', req.headers);
  next();
});

// GET /api/tasks - Get all tasks
router.get('/', (req: Request, res: Response) => {
  // Temporary implementation - will return an empty array
  console.log('GET /api/tasks route hit');
  res.status(200).json([]);
});

// POST /api/tasks - Create a new task
// Add specific debugging for this route
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('POST /api/tasks route hit');
  console.log('Request body:', req.body);
  next();
}, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
  validate,
], taskController.createTask);

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
// TODO: This route is intentionally left incomplete for the interviewee to implement

export default router;