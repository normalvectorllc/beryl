import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, Subtask } from '../types';
import { api } from '../services/api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>) => Promise<Task>;
  updateTask: (id: number, taskData: Partial<Task>) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  generateSubtasks: (taskId: number) => Promise<Subtask[]>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // This function is intentionally left incomplete for the interviewee to implement
      // The interviewee should fetch tasks from the API and update the state
      setTasks([]);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>): Promise<Task> => {
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

  const updateTask = async (id: number, taskData: Partial<Task>): Promise<Task> => {
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

  const generateSubtasks = async (taskId: number): Promise<Subtask[]> => {
    setLoading(true);
    setError(null);
    try {
      // This function is intentionally left incomplete for the interviewee to implement
      // The interviewee should call the API to generate subtasks and update the state
      throw new Error('Not implemented');
    } catch (err) {
      setError(`Failed to generate subtasks for task ${taskId}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    generateSubtasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};