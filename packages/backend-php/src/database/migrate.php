<?php
declare(strict_types=1);

require __DIR__ . '/../../vendor/autoload.php';

use Beryl\Database\Database;
use Illuminate\Database\Schema\Blueprint;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

Database::init();
$schema = Database::getConnection()->getSchemaBuilder();

echo "Running migrations...\n";

// Drop tables if they exist
$schema->dropIfExists('subtasks');
$schema->dropIfExists('tasks');

// Create tasks table
$schema->create('tasks', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description')->nullable();
    $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
    $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
    $table->date('dueDate')->nullable();
    $table->timestamps();
});

echo "Created tasks table\n";

// Create subtasks table
$schema->create('subtasks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('taskId')->constrained('tasks')->onDelete('cascade');
    $table->string('title');
    $table->text('description')->nullable();
    $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending');
    $table->timestamps();
});

echo "Created subtasks table\n";
echo "Migrations completed successfully!\n";