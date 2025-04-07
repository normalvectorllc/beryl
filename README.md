# Beryl: A Task Management System with AI-Powered Task Breakdown

A task management system with intentional gaps for assessment purposes.

The goal of this application is to allow users to create high-level tasks and use OpenAI's GPT API to automatically break them down into actionable subtasks.

## Technologies Used

### Backend
- Python with Flask
- RESTful API architecture
- SQLite for database
- Proper error handling and data validation

### Frontend
- React with React Router
- TypeScript
- Context API for state management
- Tailwind CSS for styling
- Responsive design principles

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Python (v3.7 or higher)
- pip (latest version)

### Installation

1. Clone the repository
```
git clone git@github.com:normalvectorllc/beryl.git
cd beryl
```

2. Install dependencies
```
npm install
cd packages/backend-python
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
cd ../..
```

3. Start the development servers
```
npm run dev:all
```

This will start both the backend server and the frontend development server concurrently.

- Backend: http://127.0.0.1:3001
- Frontend: http://localhost:5173

## API Endpoints

- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks` - Get all tasks (To be implemented by candidate)
- `POST /api/tasks/:id/breakdown` - Generate subtasks using AI (To be implemented by candidate)

## Assessment Tasks

This repository is designed for a technical interview. The interviewee is expected to implement the following features:

### 1. Backend: Implement the endpoint to return all created tasks

Implement the GET /api/tasks endpoint in the backend:
- The endpoint should return all tasks from the database
- Include proper error handling and response formatting
- Optional: Add sorting and filtering capabilities

Files to modify:
- `packages/backend-python/routes.py`

### 2. Backend: Implement AI-powered task breakdown

Implement the POST /api/tasks/:id/breakdown endpoint:
- Use the OpenAI API to generate subtasks for a given task
- Update the database with the generated subtasks
- Return the updated task with its subtasks as a JSON response

Files to modify:
- `packages/backend-python/routes.py`

### 3. Frontend: Update task list to show subtasks for each task

Modify the task list component to display subtasks:
- Implement collapsible/expandable subtask lists
- Add status tracking for subtasks
- Ensure proper styling and responsiveness

Files to modify:
- `packages/frontend/src/components/tasks/TaskItem.tsx`
- `packages/frontend/src/components/tasks/SubtaskList.tsx`

Note: The frontend implementation for fetching tasks and generating subtasks is already complete. Candidates should focus on the backend implementation and frontend enhancements.

Good luck with your implementation!