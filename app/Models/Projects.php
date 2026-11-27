<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Projects extends Model
{
    protected $fillable = [
        'project_category_id',
        'title',
        'slug',
        'client',
        'role',
        'summary',
        'body',
        'cover_path',
        'gallery',
        'tech',
        'highlights',
        'live_url',
        'repo_url',
        'completed_at',
        'status',
        'is_featured',
        'position',
        'views',
    ];

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'tech' => 'array',
            'highlights' => 'array',
            'completed_at' => 'date',
            'is_featured' => 'boolean',
            'position' => 'integer',
            'views' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProjectCategory::class, 'project_category_id');
    }
}
