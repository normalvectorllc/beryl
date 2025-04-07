# Python Backend for Task Management System

This is the Python/Flask backend for the Task Management System.

## Setup Instructions

1. Ensure you have Python 3.7+ installed on your system.

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     .\venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up the database:
   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```

## Running the Server

To run the Flask development server:

```
flask run
```

The server will start on `http://localhost:3001`.

## API Endpoints

- `POST /api/tasks`: Create a new task
- `GET /api/tasks/<id>`: Get a specific task
- `PUT /api/tasks/<id>`: Update a specific task
- `DELETE /api/tasks/<id>`: Delete a specific task
- `GET /api/tasks`: Get all tasks (To be implemented by candidate)
- `POST /api/tasks/<id>/breakdown`: Generate subtasks using AI (To be implemented by candidate)

## Notes for Candidates

This backend has intentional gaps for assessment purposes. Specifically:

1. The `GET /api/tasks` endpoint for fetching all tasks is not implemented.
2. The `POST /api/tasks/<id>/breakdown` endpoint for AI-powered task breakdown is not implemented.

Your task is to implement these endpoints as part of the assessment.