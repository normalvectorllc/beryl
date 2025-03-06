import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container min-w-full px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600">
          Task Management System
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-primary-600">
            Home
          </Link>
          <Link to="/tasks" className="text-gray-700 hover:text-primary-600">
            Tasks
          </Link>
          <Link to="/tasks/new" className="btn btn-primary">
            New Task
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;