from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from models import Task, Subtask
from database import db

tasks = Blueprint('tasks', __name__)

@tasks.route('', methods=['POST', 'GET'])
@tasks.route('/', methods=['POST', 'GET'])
@cross_origin()
def handle_tasks():
    if request.method == 'POST':
        data = request.json
        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            status=data.get('status', 'pending'),
            priority=data.get('priority', 'medium'),
            due_date=data.get('due_date')
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"id": new_task.id, "title": new_task.title}), 201
    elif request.method == 'GET':
        # TODO: Candidate to implement get all tasks
        return jsonify({"error": "Not implemented"}), 501

@tasks.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@cross_origin()
def handle_task(id):
    task = Task.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "created_at": task.created_at.isoformat(),
            "updated_at": task.updated_at.isoformat()
        })
    elif request.method == 'PUT':
        data = request.json
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.status = data.get('status', task.status)
        task.priority = data.get('priority', task.priority)
        task.due_date = data.get('due_date', task.due_date)
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})

@tasks.route('/<int:id>/breakdown', methods=['POST'])
@cross_origin()
def generate_subtasks(id):
    # TODO: Candidate to implement AI breakdown of tasks
    return jsonify({"error": "Not implemented"}), 501