import React from 'react';
import { Subtask } from '../../types';

interface SubtaskListProps {
  subtasks: Subtask[];
  taskId: number;
}

const SubtaskList: React.FC<SubtaskListProps> = ({ subtasks }) => {
  
  const handleStatusChange = async (subtaskId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      // TODO: This function is intentionally left incomplete for the interviewee to implement
      console.log(`Update subtask ${subtaskId} to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update subtask status:', error);
    }
  };
  
  return (
    <div className="space-y-2">
      {subtasks.map(subtask => (
        <div 
          key={subtask.id} 
          className="bg-gray-50 p-3 rounded-md border border-gray-200"
        >
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium">{subtask.title}</h3>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  subtask.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : subtask.status === 'in-progress' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {subtask.status}
                </span>
              </div>
              
              {subtask.description && (
                <p className="mt-1 text-sm text-gray-600">
                  {subtask.description}
                </p>
              )}
            </div>
            
            <div className="ml-4">
              <select
                value={subtask.status}
                onChange={(e) => handleStatusChange(subtask.id, e.target.value as 'pending' | 'in-progress' | 'completed')}
                className="text-sm border border-gray-300 rounded-md p-1"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubtaskList;