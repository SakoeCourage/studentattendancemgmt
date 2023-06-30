<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programs extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('program_name', 'Like', '%' . $search . '%');
        });
    }

    public function programscourses()
    {
        return $this->belongsToMany(Courses::class, 'program_has_courses', 'program_id', 'course_id');
    }
}
