<?php


use App\Models\Courses;
use Illuminate\Support\Facades\Route;

use Illuminate\Mail\Markdown;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/diedump',[\App\Http\Controllers\DashboardController::class, 'generateLinechart']);


Route::get('/{any}', function () {
    return view('index');
})->where("any", ".*");