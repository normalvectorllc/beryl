import React, { useState } from 'react';

interface AIBreakdownButtonProps {
  taskId: number;
}

const AIBreakdownButton: React.FC<AIBreakdownButtonProps> = ({ taskId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateSubtasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: This function is intentionally left incomplete for the interviewee to implement
      console.log(`Generate subtasks for task ${taskId}`);
      
      // Placeholder for the actual implementation
      throw new Error('Not implemented');
    } catch (err) {
      setError('Failed to generate subtasks. This feature is not implemented yet.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-xs">
      <button
        onClick={handleGenerateSubtasks}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-md text-white font-medium ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-secondary-600 hover:bg-secondary-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Generate Subtasks with AI'
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        <p>
          AI will analyze your task and break it down into smaller, actionable subtasks.
        </p>
      </div>
    </div>
  );
};

export default AIBreakdownButton;