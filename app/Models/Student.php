<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('student_id', 'Like', '%' . $search . '%')
            ;
        })->when($filters['program_name'] ?? false, function ($query, $program) {
            $query->where('programs_id', $program);
        });
    }

    public function credentials()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function program()
    {
        return $this->belongsTo(Programs::class, 'programs_id', 'id');
    }
    public function attendance()
    {
        return $this->hasMany(Studentattendance::class, 'student_id', 'id');
    }
    public function presencecount()
    {
        return $this->hasMany(Studentattendance::class, 'student_id', 'id')->where('presence',1)->get()->count();
    }
    public function absencecount()
    {
        return $this->hasMany(Studentattendance::class, 'student_id', 'id')->where('presence',0)->get()->count();
    }
}