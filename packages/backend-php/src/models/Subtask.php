<?php
declare(strict_types=1);

namespace Beryl\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subtask extends Model
{
    protected $fillable = [
        'taskId',
        'title',
        'description',
        'status'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d\TH:i:s.u\Z',
        'updated_at' => 'datetime:Y-m-d\TH:i:s.u\Z'
    ];

    protected $attributes = [
        'status' => 'pending'
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'taskId');
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