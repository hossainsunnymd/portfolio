<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name',
        'role',
        'company',
        'location',
        'avatar_path',
        'quote',
        'rating',
        'source_url',
        'is_featured',
        'enabled',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_featured' => 'boolean',
            'enabled' => 'boolean',
            'position' => 'integer',
        ];
    }
}
