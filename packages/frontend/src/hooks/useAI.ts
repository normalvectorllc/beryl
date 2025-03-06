import { useState } from 'react';
import { api } from '../services/api';
import { Subtask } from '../types';

/**
 * Custom hook for AI-related functionality
 * This hook is intentionally left incomplete for the interviewee to implement
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Generate subtasks for a task using AI
   * This function is intentionally left incomplete for the interviewee to implement
   * 
   * @param taskId - Task ID to generate subtasks for
   * @returns Array of generated subtasks
   */
  const generateSubtasks = async (taskId: number): Promise<Subtask[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // The interviewee should implement this function to:
      // 1. Call the API endpoint to generate subtasks
      // 2. Handle the response and return the generated subtasks
      
      // Placeholder implementation
      throw new Error('Not implemented');
    } catch (err) {
      setError('Failed to generate subtasks');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    error,
    generateSubtasks,
  };
};