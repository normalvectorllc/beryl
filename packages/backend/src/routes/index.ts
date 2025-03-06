import express, { Router, Request, Response } from 'express';
import taskRoutes from './tasks';

const router: Router = express.Router();

// Task routes
router.use('/tasks', taskRoutes);

// Health check route
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

export default router;