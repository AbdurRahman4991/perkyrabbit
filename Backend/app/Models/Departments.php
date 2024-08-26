<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',       
    ];

    public function emplye(): HasMany
    {
        return $this->hasMany(Employees::class);
    }
}
