# PHP Backend for Beryl Task Management System

This is the PHP implementation of the Beryl task management system backend, providing the same API as the Node.js version with the same missing features for interview candidates to complete.

## Prerequisites

- PHP 8.0 or higher
- Composer
- SQLite support (usually included with PHP)

## Installation

1. Install dependencies:
```bash
composer install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your OpenAI API key if needed
```

3. Run migrations:
```bash
composer run migrate
```

4. Seed the database (optional):
```bash
composer run seed
```

5. Start the development server:
```bash
composer run start
```

The server will be available at `http://localhost:3001`

## API Endpoints

### Implemented Endpoints

- `GET /api/health` - Health check
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `GET /api/tasks/{id}/subtasks` - Get subtasks for a task

### Missing Endpoints (To Be Implemented by Interviewee)

- `GET /api/tasks` - Get all tasks ⚠️ **NOT IMPLEMENTED**
- `POST /api/tasks/{id}/breakdown` - Generate subtasks using AI ⚠️ **NOT IMPLEMENTED**

## Project Structure

```
backend-php/
├── composer.json           # PHP dependencies and scripts
├── public/
│   └── index.php          # Application entry point
├── src/
│   ├── controllers/       # Request handlers
│   ├── database/          # Database setup and migrations
│   ├── middleware/        # Slim middleware
│   ├── models/           # Eloquent models
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic layer
│   └── utils/            # Utility classes
└── data/                 # SQLite database file location
```

## Technology Stack

- **Framework**: Slim Framework 4 with PSR-7
- **Database**: SQLite with Eloquent ORM
- **Dependency Injection**: PHP-DI
- **Logging**: Monolog
- **Validation**: Respect/Validation
- **Environment**: dotenv

## Interview Tasks

The following features are intentionally incomplete and need to be implemented:

### 1. Get All Tasks Endpoint
- File: `src/routes/tasks.php` (line commented out)
- Controller: `src/controllers/TaskController.php::getAllTasks()` (throws 501)
- Service: `src/services/TaskService.php::getAllTasks()` (throws 501)

### 2. AI Task Breakdown
- File: `src/routes/tasks.php` (line commented out)
- Controller: `src/controllers/TaskController.php::generateSubtasks()` (throws 501)
- Service: `src/services/AIService.php::generateSubtasks()` (throws 501)

## Development Commands

```bash
# Install dependencies
composer install

# Start development server
composer run start

# Run database migrations
composer run migrate

# Seed database with sample data
composer run seed
```

## Environment Variables

- `DB_DATABASE`: Path to SQLite database file (default: `data/tasks.db`)
- `OPENAI_API_KEY`: OpenAI API key for task breakdown feature
- `LOG_LEVEL`: Logging level (debug, info, warning, error)