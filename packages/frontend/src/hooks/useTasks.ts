import { useState } from 'react';
import { api } from '../services/api';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../types';

/**
 * Custom hook for task-related functionality
 * This hook is intentionally left incomplete for the interviewee to implement
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Fetch all tasks
   * This function is intentionally left incomplete for the interviewee to implement
   */
  const fetchTasks = async (): Promise<Task[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // The interviewee should implement this function to:
      // 1. Call the API endpoint to fetch all tasks
      // 2. Update the tasks state with the fetched tasks
      // 3. Return the fetched tasks
      
      // Placeholder implementation
      throw new Error('Not implemented');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Create a new task
   * @param taskData - Task data to create
   * @returns Created task
   */
  const createTask = async (taskData: CreateTaskDTO): Promise<Task> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post<Task>('/tasks', taskData);
      setTasks(prevTasks => [...prevTasks, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Get a task by ID
   * @param id - Task ID
   * @returns Task or null if not found
   */
  const getTaskById = (id: number): Task | undefined => {
    return tasks.find(task => task.id === id);
  };
  
  /**
   * Update a task
   * @param id - Task ID
   * @param taskData - Task data to update
   * @returns Updated task
   */
  const updateTask = async (id: number, taskData: UpdateTaskDTO): Promise<Task> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put<Task>(`/tasks/${id}`, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, ...response.data } : task
        )
      );
      return response.data;
    } catch (err) {
      setError(`Failed to update task ${id}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Delete a task
   * @param id - Task ID
   */
  const deleteTask = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError(`Failed to delete task ${id}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
  };
};