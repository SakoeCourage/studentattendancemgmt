<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studentattendance extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function program(){
        return $this->belongsTo(Programs::class, 'program_id','id');
    }
    public function course(){
        return $this->belongsTo(Courses::class, 'course_id','id');
    }
}
