import { AppError } from '@/middleware/errorHandler';
import { Task, CreateSubtaskDTO } from '../models/task';

/**
 * Generate subtasks for a task using OpenAI
 * 
 * @param task - Task to generate subtasks for
 * @returns Array of subtask data
 */
export const generateSubtasks = async (task: Task): Promise<CreateSubtaskDTO[]> => {
  // TODO: This function is intentionally left incomplete for the interviewee to implement
  
  throw new AppError('Not implemented', 501);
};