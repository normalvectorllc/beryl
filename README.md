# Beryl: A Task Management System with AI-Powered Task Breakdown

A task management system, but oh no it's incomplete! 

The goal for this application it to allow users to create high-level tasks and use OpenAI's GPT API to automatically break them down into actionable subtasks.

## Technologies Used

### Backend Options
**Node.js Backend:**
- Node.js with Express
- TypeScript
- RESTful API architecture
- SQLite for database
- Proper error handling and data validation

**PHP Backend:**
- PHP 8.0+ with Slim Framework
- Eloquent ORM
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
- TypeScript for type safety
- Vitest for unit and integration tests

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- PHP 8.0+ and Composer (if using PHP backend)

### Installation

1. Clone the repository
```
git clone git@github.com:normalvectorllc/beryl.git
cd beryl
```

2. Install dependencies
```
npm install
```

3. Start the development servers

**With Node.js Backend (default):**
```
npm run dev
```

**With PHP Backend:**
```
npm run dev:php
```

This will start both the backend server and the frontend development server concurrently.

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Available Scripts

### General
- `npm run dev` - Start Node.js backend + frontend (default)
- `npm run dev:node` - Start Node.js backend + frontend (explicit)
- `npm run dev:php` - Start PHP backend + frontend
- `npm run build` - Build both backend and frontend

### Database Management
**Node.js Backend:**
- `npm run migrate` - Run migrations for Node.js backend
- `npm run seed` - Seed database with sample data

**PHP Backend:**
- `npm run migrate:php` - Run migrations for PHP backend
- `npm run seed:php` - Seed database with sample data

## Project Structure

```
task-management-system/
├── packages/
│   ├── backend/             # Node.js backend (Express + TypeScript)
│   │   ├── src/             # TypeScript source files
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── db/          # Database setup and migrations
│   │   │   ├── middleware/  # Express middleware
│   │   │   ├── models/      # Data models
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   └── utils/       # Utility functions
│   │   └── tsconfig.json    # TypeScript configuration
│   │
│   ├── backend-php/         # PHP backend (Slim + Eloquent)
│   │   ├── src/             # PHP source files
│   │   │   ├── controllers/ # Request handlers
│   │   │   ├── database/    # Database setup and migrations
│   │   │   ├── middleware/  # Slim middleware
│   │   │   ├── models/      # Eloquent models
│   │   │   ├── routes/      # API routes
│   │   │   ├── services/    # Business logic
│   │   │   └── utils/       # Utility classes
│   │   ├── public/          # Web server entry point
│   │   └── composer.json    # PHP dependencies
│   │
│   └── frontend/            # React frontend application
│       ├── src/             # TypeScript source files
│       │   ├── components/  # React components
│       │   ├── context/     # React context providers
│       │   ├── hooks/       # Custom React hooks
│       │   ├── routes/      # Route components
│       │   ├── services/    # API services
│       │   ├── styles/      # CSS styles
│       │   └── types/       # TypeScript type definitions
│       └── tsconfig.json    # TypeScript configuration
│
├── turbo.json               # Turborepo configuration
└── package.json             # Root package.json for workspaces
```

## API Documentation

### Endpoints

#### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `POST /api/tasks/:id/breakdown` - Generate subtasks using AI

### Request/Response Examples

#### Create a Task

Request:
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Build a React application",
  "description": "Create a new React application with routing and state management",
  "priority": "high",
  "dueDate": "2023-12-31"
}
```

Response:
```
Status: 201 Created
Content-Type: application/json

{
  "id": 1,
  "title": "Build a React application",
  "description": "Create a new React application with routing and state management",
  "status": "pending",
  "priority": "high",
  "dueDate": "2023-12-31",
  "createdAt": "2023-06-01T12:00:00.000Z",
  "updatedAt": "2023-06-01T12:00:00.000Z"
}
```

## Interview Tasks

This repository is designed for a technical interview. The interviewee is expected to implement the following features:

### 1. Backend: Write the endpoint to return all created tasks

Implement the GET /api/tasks endpoint in the backend:
- The endpoint should return all tasks from the database
- Include proper error handling and response formatting
- Optional: Add sorting and filtering capabilities

Files to modify:
- `packages/backend/src/routes/tasks.ts`
- `packages/backend/src/controllers/tasks.ts`
- `packages/backend/src/services/taskService.ts`

### 2. Frontend: Build frontend to fetch tasks and feed them to an existing task list component

Implement API call to fetch tasks from the backend:
- Connect the API response to the existing task list component
- Handle loading and error states
- Implement refresh functionality

Files to modify:
- `packages/frontend/src/hooks/useTasks.js`
- `packages/frontend/src/context/TaskContext.tsx`
- `packages/frontend/src/routes/TaskList.tsx`

### 3. AI Integration: Add subtask generation functionality to frontend and backend

Implement the OpenAI service in the backend:
- Create the POST /api/tasks/:id/breakdown endpoint
- Add UI components for triggering task breakdown
- Handle the API response and error states

Files to modify:
- `packages/backend/src/services/aiService.ts`
- `packages/backend/src/routes/tasks.ts`
- `packages/backend/src/controllers/tasks.ts`
- `packages/frontend/src/components/tasks/AIBreakdownButton.tsx`
- `packages/frontend/src/hooks/useAI.ts`

### 4. Frontend Enhancement: Update task list to show subtasks per each task

Modify the task list component to display subtasks:
- Implement collapsible/expandable subtask lists
- Add status tracking for subtasks
- Ensure proper styling and responsiveness

Files to modify:
- `packages/frontend/src/components/tasks/TaskItem.tsx`
- `packages/frontend/src/components/tasks/SubtaskList.tsx`