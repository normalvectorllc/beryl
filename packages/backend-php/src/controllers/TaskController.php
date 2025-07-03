<?php
declare(strict_types=1);

namespace Beryl\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Beryl\Services\TaskService;
use Beryl\Services\AIService;
use Beryl\Utils\AppError;
use Beryl\Utils\Logger;

class TaskController
{
    private TaskService $taskService;
    private AIService $aiService;

    public function __construct()
    {
        $this->taskService = new TaskService();
        $this->aiService = new AIService();
    }

    public function getAllTasks(Request $request, Response $response): Response
    {
        try {
            // TODO: Implement this method for the interviewee
            throw new AppError('Not implemented', 501);
        } catch (AppError $e) {
            Logger::error('Failed to get all tasks', ['error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }

    public function getTaskById(Request $request, Response $response, array $args): Response
    {
        try {
            $id = (int) $args['id'];
            $task = $this->taskService->getTaskById($id);
            
            $response->getBody()->write(json_encode($task->toArray()));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (AppError $e) {
            Logger::error('Failed to get task', ['id' => $args['id'], 'error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }

    public function createTask(Request $request, Response $response): Response
    {
        try {
            $data = $request->getParsedBody();
            
            // Validation would happen here in a real implementation
            
            $task = $this->taskService->createTask($data);
            Logger::info('Task created', ['id' => $task->id]);
            
            $response->getBody()->write(json_encode($task->toArray()));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(201);
        } catch (\Exception $e) {
            Logger::error('Failed to create task', ['error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => 'Failed to create task']));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(500);
        }
    }

    public function updateTask(Request $request, Response $response, array $args): Response
    {
        try {
            $id = (int) $args['id'];
            $data = $request->getParsedBody();
            
            $task = $this->taskService->updateTask($id, $data);
            Logger::info('Task updated', ['id' => $task->id]);
            
            $response->getBody()->write(json_encode($task->toArray()));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (AppError $e) {
            Logger::error('Failed to update task', ['id' => $args['id'], 'error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }

    public function deleteTask(Request $request, Response $response, array $args): Response
    {
        try {
            $id = (int) $args['id'];
            $this->taskService->deleteTask($id);
            Logger::info('Task deleted', ['id' => $id]);
            
            return $response->withStatus(204);
        } catch (AppError $e) {
            Logger::error('Failed to delete task', ['id' => $args['id'], 'error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }

    public function getSubtasks(Request $request, Response $response, array $args): Response
    {
        try {
            $taskId = (int) $args['id'];
            $subtasks = $this->taskService->getSubtasks($taskId);
            
            $response->getBody()->write(json_encode($subtasks));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (AppError $e) {
            Logger::error('Failed to get subtasks', ['taskId' => $args['id'], 'error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }

    public function generateSubtasks(Request $request, Response $response, array $args): Response
    {
        try {
            // TODO: Implement this method for the interviewee
            throw new AppError('Not implemented', 501);
        } catch (AppError $e) {
            Logger::error('Failed to generate subtasks', ['taskId' => $args['id'], 'error' => $e->getMessage()]);
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($e->getStatusCode());
        }
    }
}