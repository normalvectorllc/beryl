<?php
declare(strict_types=1);

use Beryl\Controllers\TaskController;
use Beryl\Database\Database;

// Initialize database
Database::init();

$controller = new TaskController();

// Task routes
// TODO: Implement GET /api/tasks endpoint for the interviewee
// $app->get('/api/tasks', [$controller, 'getAllTasks']);

$app->post('/api/tasks', [$controller, 'createTask']);
$app->get('/api/tasks/{id}', [$controller, 'getTaskById']);
$app->put('/api/tasks/{id}', [$controller, 'updateTask']);
$app->delete('/api/tasks/{id}', [$controller, 'deleteTask']);

// Subtask routes
$app->get('/api/tasks/{id}/subtasks', [$controller, 'getSubtasks']);

// TODO: Implement POST /api/tasks/:id/breakdown endpoint for the interviewee
// $app->post('/api/tasks/{id}/breakdown', [$controller, 'generateSubtasks']);