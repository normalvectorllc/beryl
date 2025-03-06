import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from '../components/tasks/TaskItem';

const TaskList: React.FC = () => {
  const { tasks, loading, error } = useTaskContext();
  
  // This component is intentionally left incomplete for the interviewee to implement
  // The interviewee should:
  // 1. Implement the fetchTasks functionality in the TaskContext
  // 2. Display the tasks in a list
  // 3. Add filtering and sorting capabilities
  // 4. Implement the UI for displaying subtasks
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          Create New Task
        </Link>
      </div>
      
      {/* Task filtering and sorting controls would go here */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="status-filter" className="label">Status</label>
            <select id="status-filter" className="input">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="priority-filter" className="label">Priority</label>
            <select id="priority-filter" className="input">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="sort-by" className="label">Sort By</label>
            <select id="sort-by" className="input">
              <option value="createdAt">Created Date</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Task list */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button className="btn btn-outline mt-4" onClick={() => {}}>
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No tasks found. Create your first task!</p>
            <Link to="/tasks/new" className="btn btn-primary mt-4">
              Create Task
            </Link>
          </div>
        ) : (
          <div>
            {/* This section is intentionally left incomplete for the interviewee to implement */}
            <p className="text-center py-8 bg-white rounded-lg shadow-sm">
              Task list implementation is incomplete. The interviewee should implement this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;