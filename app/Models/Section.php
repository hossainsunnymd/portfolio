<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = [
        'key',
        'name',
        'heading',
        'subheading',
        'enabled',
        'position',
        'config',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'position' => 'integer',
            'config' => 'array',
        ];
    }
}
