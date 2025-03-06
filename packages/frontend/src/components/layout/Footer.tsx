import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-sm py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Task Management System
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary-600">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;