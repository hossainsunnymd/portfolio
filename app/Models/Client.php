<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'logo_path',
        'url',
        'enabled',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'position' => 'integer',
        ];
    }
}
