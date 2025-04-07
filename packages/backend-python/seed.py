from app import create_app
from models import Task, db
from datetime import datetime, timedelta

def seed_tasks():
    app = create_app()
    with app.app_context():
        # Clear existing tasks
        db.session.query(Task).delete()

        # Create example tasks
        tasks = [
            Task(
                title="Implement user authentication",
                description="Add user registration and login functionality to the application",
                status="pending",
                priority="high",
                due_date=datetime.utcnow() + timedelta(days=7)
            ),
            Task(
                title="Design database schema",
                description="Create an efficient and scalable database schema for the project",
                status="in-progress",
                priority="medium",
                due_date=datetime.utcnow() + timedelta(days=3)
            ),
            Task(
                title="Write API documentation",
                description="Document all API endpoints, request/response formats, and authentication requirements",
                status="pending",
                priority="low",
                due_date=datetime.utcnow() + timedelta(days=14)
            )
        ]

        # Add tasks to the session and commit
        for task in tasks:
            db.session.add(task)
        
        db.session.commit()

        print("Example tasks have been added to the database.")

if __name__ == "__main__":
    seed_tasks()