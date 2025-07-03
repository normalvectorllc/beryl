<?php
declare(strict_types=1);

namespace Beryl\Database;

use Illuminate\Database\Capsule\Manager as Capsule;

class Database
{
    private static ?Capsule $capsule = null;

    public static function init(): void
    {
        if (self::$capsule !== null) {
            return;
        }

        self::$capsule = new Capsule;

        self::$capsule->addConnection([
            'driver' => 'sqlite',
            'database' => __DIR__ . '/../../' . $_ENV['DB_DATABASE'],
            'prefix' => '',
        ]);

        self::$capsule->setAsGlobal();
        self::$capsule->bootEloquent();
    }

    public static function getConnection(): \Illuminate\Database\Connection
    {
        if (self::$capsule === null) {
            self::init();
        }

        return self::$capsule->getConnection();
    }
}