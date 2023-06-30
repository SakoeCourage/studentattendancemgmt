<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use App\Models\Courses;
use App\Models\Student;
use App\Models\Lecturer;
use App\Models\Programs;
use Illuminate\Http\Request;
use App\Models\Studentattendance;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'line_chart' => $this->generateLinechart(),
            'analyticalData' => $this->generateAnalyticalData()
        ];
    }

    /**
     * Show the form for creating a new resource.
     */

    public function generateLinechart()
    {
        $begining_of_week = Carbon::now()->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
        $end_of_week = Carbon::now()->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
        $today = Carbon::now();
        $days = collect();
        $startOfWeek = $today->startOfWeek(Carbon::SUNDAY);
        for ($date = $startOfWeek; $date->lte($end_of_week); $date->addDay()) {
            $days->push($date->format('D'));
        }
        $attendance = Studentattendance::whereDate('created_at', '>=', $begining_of_week)
            ->where('presence', 1)
            ->selectRaw('DATE_FORMAT(created_at,"%a") as day,presence')
            ->get();



        $newattendance = $days->mapWithKeys(function ($day, $index) use ($attendance) {
            return [
                $day => $attendance->where('day', $day)->count()
            ];
        });

        return [
            [

                'name' => 'Student Attendance',
                'type' => 'area',
                'data' => $newattendance->flatten()
            ]
        ];

    }



    public function generateAnalyticalData()
    {
        $studentCount = Student::all()->count();
        $lecturersCount = Lecturer::all()->count();
        $programssCount = Programs::all()->count();
        $coursesCount = Courses::all()->count();

            return[
                'studentCount' => $studentCount,
                'lecturesCount' => $lecturersCount,
                'programsCount' => $programssCount,
                'courseCount' => $coursesCount,
            ];


    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}