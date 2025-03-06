import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div className="flex-1">
          <Link to={`/tasks/${task.id}`} className="text-lg font-semibold text-primary-700 hover:text-primary-900">
            {task.title}
          </Link>
          
          <div className="mt-2 text-gray-600 line-clamp-2">
            {task.description || 'No description provided.'}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : task.status === 'in-progress' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status}
            </span>
            
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              task.priority === 'high' 
                ? 'bg-red-100 text-red-800' 
                : task.priority === 'medium' 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
            }`}>
              {task.priority} priority
            </span>
            
            {task.dueDate && (
              <span className="inline-block px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex flex-col items-end justify-between">
          <div className="text-sm text-gray-500">
            {task.subtasks && task.subtasks.length > 0 ? (
              <span>{task.subtasks.length} subtasks</span>
            ) : (
              <span>No subtasks</span>
            )}
          </div>
          
          <div className="text-xs text-gray-400 mt-auto">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;