<?php
declare(strict_types=1);

require __DIR__ . '/../../vendor/autoload.php';

use Beryl\Database\Database;
use Beryl\Models\Task;
use Beryl\Models\Subtask;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

Database::init();

echo "Seeding database...\n";

// Clear existing data
Subtask::query()->delete();
Task::query()->delete();

// Create sample tasks
$tasks = [
    [
        'title' => 'Complete project documentation',
        'description' => 'Write comprehensive documentation for the new feature including API endpoints, database schema, and user guide',
        'status' => 'in_progress',
        'priority' => 'high',
        'dueDate' => date('Y-m-d', strtotime('+7 days'))
    ],
    [
        'title' => 'Fix authentication bug',
        'description' => 'Users are experiencing intermittent login failures. Need to investigate and fix the root cause',
        'status' => 'pending',
        'priority' => 'high',
        'dueDate' => date('Y-m-d', strtotime('+2 days'))
    ],
    [
        'title' => 'Implement search functionality',
        'description' => 'Add full-text search capability to the application with filters and sorting options',
        'status' => 'pending',
        'priority' => 'medium',
        'dueDate' => date('Y-m-d', strtotime('+14 days'))
    ],
    [
        'title' => 'Update dependencies',
        'description' => 'Review and update all npm packages to their latest stable versions',
        'status' => 'completed',
        'priority' => 'low',
        'dueDate' => date('Y-m-d', strtotime('-1 days'))
    ],
    [
        'title' => 'Design new dashboard',
        'description' => 'Create mockups and wireframes for the new analytics dashboard',
        'status' => 'pending',
        'priority' => 'medium',
        'dueDate' => date('Y-m-d', strtotime('+21 days'))
    ]
];

foreach ($tasks as $taskData) {
    $task = Task::create($taskData);
    echo "Created task: {$task->title}\n";

    // Add some subtasks for the first two tasks
    if ($task->id <= 2) {
        $subtasks = [
            [
                'title' => 'Research best practices',
                'description' => 'Look into industry standards and best practices',
                'status' => 'completed'
            ],
            [
                'title' => 'Create initial draft',
                'description' => 'Write the first version',
                'status' => 'in_progress'
            ],
            [
                'title' => 'Review and refine',
                'description' => 'Get feedback and make improvements',
                'status' => 'pending'
            ]
        ];

        foreach ($subtasks as $subtaskData) {
            $subtaskData['taskId'] = $task->id;
            Subtask::create($subtaskData);
        }
        
        echo "  Added " . count($subtasks) . " subtasks\n";
    }
}

$totalTasks = Task::count();
$totalSubtasks = Subtask::count();

echo "\nSeeding completed!\n";
echo "Created {$totalTasks} tasks and {$totalSubtasks} subtasks\n";