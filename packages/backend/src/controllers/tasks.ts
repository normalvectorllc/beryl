import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/taskService';
import * as aiService from '../services/aiService';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task';
import { AppError } from '../middleware/errorHandler';

/**
 * Get all tasks
 * This controller is intentionally left incomplete for the interviewee to implement
 */
export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This function is intentionally left incomplete for the interviewee to implement
    throw new AppError('Not implemented', 501);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a task by ID
 */
export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const task = await taskService.getTaskById(taskId);
    
    // Get subtasks for the task
    const subtasks = await taskService.getSubtasks(taskId);
    
    res.status(200).json({
      ...task,
      subtasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new task
 */
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskData: CreateTaskDTO = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    };
    
    const task = await taskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 */
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id, 10);
    const taskData: UpdateTaskDTO = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    };
    
    // Remove undefined properties
    Object.keys(taskData).forEach(key => {
      if (taskData[key as keyof UpdateTaskDTO] === undefined) {
        delete taskData[key as keyof UpdateTaskDTO];
      }
    });
    
    const task = await taskService.updateTask(taskId, taskData);
    
    // Get subtasks for the task
    const subtasks = await taskService.getSubtasks(taskId);
    
    res.status(200).json({
      ...task,
      subtasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskId = parseInt(req.params.id, 10);
    await taskService.deleteTask(taskId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/**
 * Generate subtasks for a task using AI
 * This controller is intentionally left incomplete for the interviewee to implement
 */
export const generateSubtasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This function is intentionally left incomplete for the interviewee to implement
    throw new AppError('Not implemented', 501);
  } catch (error) {
    next(error);
  }
};