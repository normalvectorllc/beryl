import dbConnection from '../db';
import { Task, CreateTaskDTO, UpdateTaskDTO, Subtask, CreateSubtaskDTO } from '../models/task';
import { AppError } from '../middleware/errorHandler';

/**
 * Get all tasks from the database
 * @returns Array of tasks
 */
export const getAllTasks = async (): Promise<Task[]> => {
  // TODO: This function is intentionally left incomplete for the interviewee to implement
  throw new AppError('Not implemented', 501);
};

/**
 * Get a task by ID
 * @param id - Task ID
 * @returns Task object
 */
export const getTaskById = async (id: number): Promise<Task> => {
  const db = await dbConnection.initialize();
  const task = await db.get('SELECT * FROM tasks WHERE id = ?', id) as Task | undefined;
  
  if (!task) {
    throw new AppError(`Task with ID ${id} not found`, 404);
  }
  
  return task;
};

/**
 * Create a new task
 * @param taskData - Task data
 * @returns Created task
 */
export const createTask = async (taskData: CreateTaskDTO): Promise<Task> => {
  const { title, description = null, status = 'pending', priority = 'medium', dueDate = null } = taskData;
  
  const now = new Date().toISOString();
  const db = await dbConnection.initialize();
  
  const result = await db.run(`
    INSERT INTO tasks (title, description, status, priority, dueDate, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, title, description, status, priority, dueDate, now, now);
  
  const taskId = result.lastID as number;
  return getTaskById(taskId);
};

/**
 * Update a task
 * @param id - Task ID
 * @param taskData - Task data to update
 * @returns Updated task
 */
export const updateTask = async (id: number, taskData: UpdateTaskDTO): Promise<Task> => {
  // Check if task exists
  await getTaskById(id);
  
  const updates: string[] = [];
  const values: any[] = [];
  
  // Build dynamic update query
  if (taskData.title !== undefined) {
    updates.push('title = ?');
    values.push(taskData.title);
  }
  
  if (taskData.description !== undefined) {
    updates.push('description = ?');
    values.push(taskData.description);
  }
  
  if (taskData.status !== undefined) {
    updates.push('status = ?');
    values.push(taskData.status);
  }
  
  if (taskData.priority !== undefined) {
    updates.push('priority = ?');
    values.push(taskData.priority);
  }
  
  if (taskData.dueDate !== undefined) {
    updates.push('dueDate = ?');
    values.push(taskData.dueDate);
  }
  
  updates.push('updatedAt = ?');
  values.push(new Date().toISOString());
  
  // Add task ID to values array
  values.push(id);
  
  const db = await dbConnection.initialize();
  await db.run(`
    UPDATE tasks
    SET ${updates.join(', ')}
    WHERE id = ?
  `, ...values);
  
  return getTaskById(id);
};

/**
 * Delete a task
 * @param id - Task ID
 */
export const deleteTask = async (id: number): Promise<void> => {
  // Check if task exists
  await getTaskById(id);
  
  const db = await dbConnection.initialize();
  await db.run('DELETE FROM tasks WHERE id = ?', id);
};

/**
 * Get subtasks for a task
 * @param taskId - Task ID
 * @returns Array of subtasks
 */
export const getSubtasks = async (taskId: number): Promise<Subtask[]> => {
  // Check if task exists
  await getTaskById(taskId);
  
  const db = await dbConnection.initialize();
  return db.all('SELECT * FROM subtasks WHERE taskId = ?', taskId) as Promise<Subtask[]>;
};

/**
 * Create a subtask
 * @param subtaskData - Subtask data
 * @returns Created subtask
 */
export const createSubtask = async (subtaskData: CreateSubtaskDTO): Promise<Subtask> => {
  const { taskId, title, description = null, status = 'pending' } = subtaskData;
  
  // Check if task exists
  await getTaskById(taskId);
  
  const now = new Date().toISOString();
  const db = await dbConnection.initialize();
  
  const result = await db.run(`
    INSERT INTO subtasks (taskId, title, description, status, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `, taskId, title, description, status, now, now);
  
  const subtaskId = result.lastID as number;
  
  return db.get('SELECT * FROM subtasks WHERE id = ?', subtaskId) as Promise<Subtask>;
};