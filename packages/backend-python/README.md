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

6. (Optional) Seed the database with example tasks:
   ```
   python seed.py
   ```

## Running the Server

To run the Flask development server:

```
flask run --port=3001
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

Your task is to implement these endpoints as part of the assessment. Here are some guidelines:

### 1. Implementing GET /api/tasks
- Retrieve all tasks from the database
- Return them as a JSON response
- Consider implementing sorting and filtering options

### 2. Implementing POST /api/tasks/<id>/breakdown
- Use the OpenAI API to generate subtasks for a given task
- Update the database with the generated subtasks
- Return the updated task with its subtasks as a JSON response

Remember to handle potential errors and edge cases in your implementations.

## Testing Your Implementation

After implementing the endpoints, you can test them using tools like curl, Postman, or by running the frontend application and interacting with the UI.

If you've seeded the database with example tasks, you can use these to verify your GET /api/tasks implementation.

Good luck with your implementation!