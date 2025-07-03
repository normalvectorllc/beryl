<?php
declare(strict_types=1);

namespace Beryl\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'dueDate'
    ];

    protected $casts = [
        'dueDate' => 'date:Y-m-d',
        'created_at' => 'datetime:Y-m-d\TH:i:s.u\Z',
        'updated_at' => 'datetime:Y-m-d\TH:i:s.u\Z'
    ];

    protected $attributes = [
        'status' => 'pending',
        'priority' => 'medium'
    ];

    public function subtasks(): HasMany
    {
        return $this->hasMany(Subtask::class, 'taskId');
    }

    public function toArray(): array
    {
        $array = parent::toArray();
        
        // Format dates to match the Node.js backend
        if (isset($array['created_at'])) {
            $array['createdAt'] = $this->created_at->format('Y-m-d\TH:i:s.v\Z');
            unset($array['created_at']);
        }
        
        if (isset($array['updated_at'])) {
            $array['updatedAt'] = $this->updated_at->format('Y-m-d\TH:i:s.v\Z');
            unset($array['updated_at']);
        }
        
        return $array;
    }
}