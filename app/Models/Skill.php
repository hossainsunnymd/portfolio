<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'level',
        'icon',
        'note',
        'is_featured',
        'enabled',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'level' => 'integer',
            'is_featured' => 'boolean',
            'enabled' => 'boolean',
            'position' => 'integer',
        ];
    }
}
