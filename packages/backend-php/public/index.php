<?php
declare(strict_types=1);

use DI\Container;
use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;
use Beryl\Middleware\CorsMiddleware;
use Beryl\Middleware\ValidationErrorMiddleware;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$container = new Container();
AppFactory::setContainer($container);

$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->add(new CorsMiddleware());
$app->add(new ValidationErrorMiddleware());

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

require __DIR__ . '/../src/routes/health.php';
require __DIR__ . '/../src/routes/tasks.php';

$app->run();