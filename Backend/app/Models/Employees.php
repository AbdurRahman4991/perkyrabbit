<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employees extends Model
{
    use HasFactory;
    protected $fillable = [
        'department_id',
        'name',
        'email',
        'phone',
        'address',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsToMany(Departments::class);
    }

    // public function department(): BelongsTo
    // {
    //     return $this->belongsTo(Departments::class);
    // }
}
