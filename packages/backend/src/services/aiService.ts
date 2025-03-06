import { Task, CreateSubtaskDTO } from '../models/task';
import { AppError } from '../middleware/errorHandler';

/**
 * Generate subtasks for a task using OpenAI
 * This function is intentionally left incomplete for the interviewee to implement
 * 
 * @param task - Task to generate subtasks for
 * @returns Array of subtask data
 */
export const generateSubtasks = async (task: Task): Promise<CreateSubtaskDTO[]> => {
  // This function is intentionally left incomplete for the interviewee to implement
  
  // The interviewee should:
  // 1. Set up OpenAI API client
  // 2. Create a prompt that describes the task and asks for subtasks
  // 3. Call the OpenAI API to generate subtasks
  // 4. Parse the response and return an array of subtask data
  
  throw new AppError('Not implemented', 501);
};