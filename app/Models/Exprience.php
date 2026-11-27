<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exprience extends Model
{
    protected $table = 'experiences';

    protected $fillable = [
        'kind',
        'role',
        'organization',
        'location',
        'url',
        'summary',
        'achievements',
        'start_date',
        'end_date',
        'is_current',
        'enabled',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'achievements' => 'array',
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'enabled' => 'boolean',
            'position' => 'integer',
        ];
    }
}
