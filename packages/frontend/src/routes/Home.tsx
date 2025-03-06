import React from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const Home: React.FC = () => {
  const { tasks, loading } = useTaskContext();
  
  // Count tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/tasks/new" className="btn btn-primary">
          Create New Task
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Task Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Tasks</span>
              <span className="font-semibold">{tasks.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">{pendingTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In Progress</span>
              <span className="font-semibold text-blue-600">{inProgressTasks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">{completedTasks}</span>
            </div>
          </div>
        </div>
        
        <div className="card bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Tasks</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : tasks.length > 0 ? (
            <ul className="space-y-2">
              {tasks.slice(0, 5).map(task => (
                <li key={task.id} className="border-b pb-2">
                  <Link to={`/tasks/${task.id}`} className="hover:text-primary-600">
                    {task.title}
                  </Link>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : task.status === 'in-progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks yet. Create your first task!</p>
          )}
        </div>
        
        <div className="card bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">AI Task Breakdown</h2>
          <p className="text-gray-600 mb-4">
            Use AI to automatically break down your high-level tasks into actionable subtasks.
          </p>
          <Link to="/tasks" className="btn btn-outline w-full">
            Try AI Breakdown
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;