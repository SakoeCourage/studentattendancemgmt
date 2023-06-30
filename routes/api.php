<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::post('/student/new', [App\Http\Controllers\StudentController::class, 'create']);
Route::get('/students-with-template', [App\Http\Controllers\StudentController::class, 'studentswithtemplate']);

Route::get('/dashboard/data',[App\Http\Controllers\DashboardController::class,'index']);

Route::group(['prefix' => 'student'], function () {
    Route::get('/all', [App\Http\Controllers\StudentController::class, 'index']);
    Route::get('/view-student/{student}', [App\Http\Controllers\StudentController::class, 'show']);
    Route::get('/legible-student', [App\Http\Controllers\StudentController::class, 'getLegibleStudents']);
    Route::post('/update-student/{student}', [App\Http\Controllers\StudentController::class, 'update']);
    Route::post('/delete-student/{student}', [App\Http\Controllers\StudentController::class, 'destroy']);
    Route::post('/new-attendance', [App\Http\Controllers\StudentController::class, 'newAttendance']);
    
});

Route::group(['prefix'=>'programs'],function(){
    Route::get('/to-select', [App\Http\Controllers\ProgramsController::class, 'programstoselect']);
    Route::get('/all',[App\Http\Controllers\ProgramsController::class, 'index']);
    Route::post('/new',[App\Http\Controllers\ProgramsController::class, 'create']);
    Route::get('/offered-courses',[App\Http\Controllers\ProgramsController::class, 'getProgramscourses']);
});

Route::group(['prefix'=>'courses'],function(){
    Route::post('/new', [App\Http\Controllers\CoursesController::class, 'create']);
    Route::get('/all', [App\Http\Controllers\CoursesController::class, 'index']);
    Route::get('/to-select', [App\Http\Controllers\CoursesController::class, 'toselect']);
    Route::get('/in-program', [App\Http\Controllers\CoursesController::class, 'getCoursesOfferedInProgram']);
});
Route::group(['prefix'=>'lecturer'],function(){
    Route::post('/new', [App\Http\Controllers\LecturerController::class, 'create']);
    Route::get('/all', [App\Http\Controllers\LecturerController::class, 'index']);
  
});