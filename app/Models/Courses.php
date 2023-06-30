<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('course_code', 'Like', '%' . $search . '%');
        });
    }

    public function courseprograms(){
        return $this->belongsToMany(Programs::class, 'program_has_courses', 'course_id', 'program_id');
    }
}
