import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';
import AIBreakdownButton from '../components/tasks/AIBreakdownButton';
import SubtaskList from '../components/tasks/SubtaskList';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  
  useEffect(() => {
    if (id && tasks.length > 0) {
      const taskId = parseInt(id, 10);
      const foundTask = tasks.find(t => t.id === taskId);
      
      if (foundTask) {
        setTask(foundTask);
        setFormData({
          title: foundTask.title,
          description: foundTask.description || '',
          status: foundTask.status,
          priority: foundTask.priority,
          dueDate: foundTask.dueDate || '',
        });
      } else {
        navigate('/tasks', { replace: true });
      }
    }
  }, [id, tasks, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !task) return;
    
    try {
      await updateTask(parseInt(id, 10), {
        ...formData,
        status: formData.status as Task['status'],
        priority: formData.priority as Task['priority'],
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  
  const handleDelete = async () => {
    if (!id || !task) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(parseInt(id, 10));
        navigate('/tasks', { replace: true });
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };
  
  if (!task) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading task...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/tasks" className="text-gray-500 hover:text-gray-700">
            &larr; Back to Tasks
          </Link>
          <h1 className="text-3xl font-bold">{isEditing ? 'Edit Task' : task.title}</h1>
        </div>
        <div className="flex space-x-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-outline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
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
              value={formData.description}
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
                value={formData.dueDate}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex justify-between">
            <div className="space-y-4 flex-1">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Description</h2>
                <p className="mt-2 text-gray-600">
                  {task.description || 'No description provided.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Status</h3>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : task.status === 'in-progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Priority</h3>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Due Date</h3>
                  <p className="mt-1 text-gray-600">
                    {task.dueDate 
                      ? new Date(task.dueDate).toLocaleDateString() 
                      : 'No due date'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Created</h3>
                <p className="mt-1 text-gray-600">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="ml-8 flex flex-col items-end">
              <AIBreakdownButton taskId={task.id} />
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Subtasks</h2>
            {task.subtasks && task.subtasks.length > 0 ? (
              <SubtaskList subtasks={task.subtasks} taskId={task.id} />
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No subtasks yet.</p>
                <p className="text-gray-500 mt-2">
                  Use the AI Breakdown button to automatically generate subtasks.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;