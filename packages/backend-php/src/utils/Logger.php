<?php
declare(strict_types=1);

namespace Beryl\Utils;

use Monolog\Logger as MonologLogger;
use Monolog\Handler\StreamHandler;
use Monolog\Level;

class Logger
{
    private static ?MonologLogger $instance = null;

    public static function getInstance(): MonologLogger
    {
        if (self::$instance === null) {
            self::$instance = new MonologLogger('beryl');
            
            $logLevel = $_ENV['LOG_LEVEL'] ?? 'debug';
            $level = match ($logLevel) {
                'error' => Level::Error,
                'warning' => Level::Warning,
                'info' => Level::Info,
                default => Level::Debug,
            };
            
            self::$instance->pushHandler(new StreamHandler('php://stdout', $level));
        }

        return self::$instance;
    }

    public static function info(string $message, array $context = []): void
    {
        self::getInstance()->info($message, $context);
    }

    public static function error(string $message, array $context = []): void
    {
        self::getInstance()->error($message, $context);
    }

    public static function warning(string $message, array $context = []): void
    {
        self::getInstance()->warning($message, $context);
    }

    public static function debug(string $message, array $context = []): void
    {
        self::getInstance()->debug($message, $context);
    }
}