<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\Studentattendance;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReportController extends Controller
{

    public function generateSudentAttendanceReport(Request $request)
    {

        $request->validate([
            'student_id' => ['required', 'string'],
            'start_date' => ['required', 'string'],
            'end_date' => ['required', 'string'],
        ]);

        $student = Student::where('student_id', $request->student_id);

        $startdate = date('Y-m-d', strtotime($request->start_date));

        $enddate = date('Y-m-d', strtotime($request->end_date));
        if (!$student->first()) {
            throw ValidationException::withMessages([
                'student_id' => "NO student found by id " . $request->student_id
            ]);
        }

        if ($startdate > $enddate) {
            throw ValidationException::withMessages([
                'start_date' => "Invalid date range"
            ]);
        }

        $studentData = $student->first();
        $studentAttendanceData = DB::table('studentattendances')->where('student_id', $student->first()->id)
            ->whereDate('studentattendances.created_at', '<=', $enddate)
            ->whereDate('studentattendances.created_at', '>=', $startdate)
            ->join('programs', 'studentattendances.program_id', '=', 'programs.id')
            ->join('courses', 'studentattendances.course_id', '=', 'courses.id')
            ->selectRaw(
                "DATE_FORMAT(DATE(studentattendances.created_at),'%m/%d/%Y') as created_at,
            programs.program_name,
            courses.course_code,
            courses.course_name,
            studentattendances.presence,
            studentattendances.level,
            studentattendances.semester
        "
            )->get();

        return [
            'student_data' => $studentData,
            'attendance_data' => $studentAttendanceData,
            'start_date' => date( "m/d/Y",strtotime($startdate)),
            'end_date' =>  date( "m/d/Y",strtotime($enddate)),
            'presence_count' => $student->firstorFail()->presencecount(),
            'absence_count' => $student->firstOrFail()->absencecount()
        ];

    }
}