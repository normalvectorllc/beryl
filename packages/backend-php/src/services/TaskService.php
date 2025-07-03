<?php
declare(strict_types=1);

namespace Beryl\Services;

use Beryl\Models\Task;
use Beryl\Models\Subtask;
use Beryl\Utils\AppError;

class TaskService
{
    public function getAllTasks(): array
    {
        // TODO: Implement this method for the interviewee
        throw new AppError('Not implemented', 501);
    }

    public function getTaskById(int $id): Task
    {
        $task = Task::find($id);
        
        if (!$task) {
            throw new AppError('Task not found', 404);
        }

        return $task;
    }

    public function createTask(array $data): Task
    {
        $task = Task::create($data);
        return $task->fresh();
    }

    public function updateTask(int $id, array $data): Task
    {
        $task = $this->getTaskById($id);
        $task->update($data);
        
        return $task->fresh();
    }

    public function deleteTask(int $id): void
    {
        $task = $this->getTaskById($id);
        $task->delete();
    }

    public function getSubtasks(int $taskId): array
    {
        $task = $this->getTaskById($taskId);
        return $task->subtasks->toArray();
    }

    public function createSubtask(int $taskId, array $data): Subtask
    {
        $task = $this->getTaskById($taskId);
        
        $data['taskId'] = $taskId;
        $subtask = Subtask::create($data);
        
        return $subtask->fresh();
    }
}