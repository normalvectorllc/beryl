import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            All Tasks
          </NavLink>
        </nav>
        
        <h2 className="text-lg font-semibold mt-6 mb-4">Filters</h2>
        <div className="space-y-2">
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-1">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Pending</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>In Progress</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Completed</span>
              </label>
            </div>
          </div>
          
          <div className="px-4 py-2">
            <h3 className="text-sm font-medium mb-2">Priority</h3>
            <div className="space-y-1">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>High</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Medium</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Low</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;