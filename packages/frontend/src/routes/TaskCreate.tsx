import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

type CreateTaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>;

const TaskCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createTask, loading, error } = useTaskContext();
  
  const [formData, setFormData] = useState<CreateTaskFormData>({
    title: '',
    description: null,
    status: 'pending',
    priority: 'medium',
    dueDate: null,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle empty strings for nullable fields
    if (name === 'description' || name === 'dueDate') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const task = await createTask(formData);
      navigate(`/tasks/${task.id}`);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create New Task</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <label htmlFor="title" className="label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            className="input h-32"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="status" className="label">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priority" className="label">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="label">Due Date (Optional)</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate || ''}
              onChange={handleInputChange}
              className="input"
            />
          </div>
        </div>
        
        {error && (
          <div className="text-red-600">
            {error}
          </div>
        )}
        
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreate;