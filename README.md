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

### Project Structure
- Turborepo for monorepo management
- TypeScript for frontend
- Python for backend
- Vitest for frontend unit and integration tests

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

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

## Available Scripts

- `npm run dev:all` - Start both backend and frontend development servers
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend-python` - Start only the Python backend server
- `npm run build` - Build the frontend

## Project Structure

```
task-management-system/
├── packages/
│   ├── backend-python/       # Backend Flask application
│   │   ├── app.py            # Main application file
│   │   ├── database.py       # Database setup
│   │   ├── models.py         # Data models
│   │   ├── routes.py         # API routes
│   │   └── requirements.txt  # Python dependencies
│   │
│   └── frontend/             # React frontend application
│       ├── src/              # TypeScript source files
│       │   ├── components/   # React components
│       │   ├── context/      # React context providers
│       │   ├── routes/       # Route components
│       │   ├── services/     # API services
│       │   ├── styles/       # CSS styles
│       │   └── types/        # TypeScript type definitions
│       └── tsconfig.json     # TypeScript configuration
│
├── turbo.json                # Turborepo configuration
└── package.json              # Root package.json for workspaces
```

## API Documentation

### Endpoints

#### Tasks

- `GET /api/tasks` - Get all tasks (To be implemented by candidate)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/tasks/:id/breakdown` - Generate subtasks using AI (To be implemented by candidate)

## Interview Tasks

This repository is designed for a technical interview. The interviewee is expected to implement the following features:

### 1. Backend: Write the endpoint to return all created tasks

Implement the GET /api/tasks endpoint in the backend:
- The endpoint should return all tasks from the database
- Include proper error handling and response formatting
- Optional: Add sorting and filtering capabilities

Files to modify:
- `packages/backend-python/routes.py`

### 2. AI Integration: Add subtask generation functionality to backend

Implement the OpenAI service in the backend:
- Create the POST /api/tasks/:id/breakdown endpoint
- Handle the API response and error states

Files to modify:
- `packages/backend-python/routes.py`

### 3. Frontend Enhancement: Update task list to show subtasks per each task

Modify the task list component to display subtasks:
- Implement collapsible/expandable subtask lists
- Add status tracking for subtasks
- Ensure proper styling and responsiveness

Files to modify:
- `packages/frontend/src/components/tasks/TaskItem.tsx`
- `packages/frontend/src/components/tasks/SubtaskList.tsx`

Note: The frontend implementation for fetching tasks and generating subtasks is already complete. Candidates should focus on the backend implementation and frontend enhancements.