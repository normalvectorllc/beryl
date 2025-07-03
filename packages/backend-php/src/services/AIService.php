<?php
declare(strict_types=1);

namespace Beryl\Services;

use Beryl\Utils\AppError;

class AIService
{
    public function generateSubtasks(int $taskId, string $title, string $description): array
    {
        // TODO: Implement OpenAI integration for the interviewee
        throw new AppError('Not implemented', 501);
    }
}