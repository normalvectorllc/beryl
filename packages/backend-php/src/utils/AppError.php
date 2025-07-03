<?php
declare(strict_types=1);

namespace Beryl\Utils;

class AppError extends \Exception
{
    private int $statusCode;

    public function __construct(string $message, int $statusCode = 500)
    {
        parent::__construct($message);
        $this->statusCode = $statusCode;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}