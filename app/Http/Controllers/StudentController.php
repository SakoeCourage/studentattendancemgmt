<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Courses;
use App\Models\Student;
use App\Models\Programs;
use Illuminate\Http\Request;
use App\Models\Studentattendance;
use Illuminate\Support\Facades\DB;
use App\Models\program_has_courses;
use Illuminate\Support\Facades\Hash;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Validation\ValidationException;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Student $student)
    {
        if ($request->has('program')) {
            $programId = Programs::where('program_name', $request->program)->first()->id;
            $request['program_name'] = $programId;
        }
        return [
            'students' => $student->with(['program'])->filter(request()->only('search', 'program_name'))->latest()
                ->paginate(10)->withQueryString()
                ->through(function ($currentStudent) {
                    return [
                        'id' => $currentStudent->id,
                        'created_at' => $currentStudent->created_at,
                        'student_id' => $currentStudent->student_id,
                        'first_name' => $currentStudent->first_name,
                        'last_name' => $currentStudent->last_name,
                        'level' => $currentStudent->current_level,
                        'program' => $currentStudent->program->program_name
                    ];
                }),
            'filters' => $request->only(['search', 'program']),
            'full_url' => trim($request->fullUrlWithQuery(request()->only('search', 'program')))
        ];
    }




    public function newAttendance(Request $request)
    {
        $attendance_list = $request->attendance_list;
        $current_session = $request->current_session[0];

        $program_id = Programs::where('program_name', $current_session['program_name'])->first()->id;
        $course = Courses::where('course_code', $current_session['course_code'])->first();
        $course_id = $course->id;
        $course_name = $course->course_name;

        $legible_Students = Student::with(['credentials'])->where([
            'programs_id' => $program_id,
            'current_level' => $current_session['level'],
            'current_semester' => $current_session['semester']
        ]) ->get();

        $absent_students = $legible_Students->whereNotIn('student_id', $attendance_list);

        $legible_Students->each(function ($student, $key) use ($attendance_list, $course_id, $program_id) {
            $presence = 0;
            if (in_array($student->student_id, $attendance_list)) {
                $presence = 1;
            } else {
                $presence = 0;
            }

            Studentattendance::create([
                'student_id' => $student->id,
                'presence' => $presence,
                'course_id' => $course_id,
                'program_id' => $program_id,
                'level' => $student->current_level,
                'semester' => $student->current_semester
            ]);
          

        });
        dispatch(new \App\Jobs\Absentnotifyjob($course_name,$absent_students,Carbon::now()->format('h:i A')));

        return response('ok', 200);
    }

    public function getLegibleStudents(Request $request)
    {
        $programId = Programs::where('program_name', $request->program_name)->first()->id;
        $valid_course_code = Courses::where('course_code', $request->course_code)->first();
        if ($valid_course_code) {
            $programHasCourse = program_has_courses::where(['program_id' => $programId, 'course_id' => $valid_course_code->id])->first();

            if ($programHasCourse) {
                $students = Student::where([
                    'current_level' => $request->level,
                    'programs_id' => $programId,
                    'current_semester' => $request->semester,
                ])->get(['id', 'first_name', 'last_name', 'student_id', 'fingerprint_template']);
            } else {
                throw ValidationException::withMessages([
                    'course_code' => 'Course ' . $request->course_code . ' not offered to Selected Program  '
                ]);
            }

        } else {
            throw ValidationException::withMessages([
                'course_code' => 'Course not Found ' . $request->course_code
            ]);
        }


        return $students;

    }

    /**
     * Show Legible students with their print template
     * 
     */

    public function studentswithtemplate()
    {
        return Student::get(['id', 'student_id', 'first_name', 'last_name', 'fingerprint_template']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {


        $request->validate([
            'title' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'contact' => ['required'],
            'gender' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'fingerprint_template' => ['required'],
            'program' => ['required']
        ]);

        DB::transaction(function () use ($request) {
            $student_id = IdGenerator::generate(['table' => 'students', 'field' => 'student_id', 'length' => 10, 'prefix' => '0' . date('ymd')]);
            $new_student = User::create([
                'name' => $request->last_name . $request->first_name,
                'email' => $request->email,
                'title' => $request->title,
                'user_type' => 2,
                'password' => Hash::make($request->first_name . $request->last_name)
            ]);

            Student::create([
                'user_id' => $new_student->id,
                'gender' => $request->gender,
                'contact' => $request->contact,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'fingerprint_template' => $request->fingerprint_template,
                'programs_id' => Programs::where('program_name', $request->program)->firstOrFail()->id,
                'current_level' => $request->level ?? 100,
                'student_id' => $student_id,
            ]);
        });

        return response('done', 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return $student->with(['credentials', 'program'])->where('id', $student->id)->get()
            ->map(function ($cv) {
                return [
                    'id' => $cv->id,
                    'first_name' => $cv->first_name,
                    'last_name' => $cv->last_name,
                    'student_id' => $cv->student_id,
                    'gender' => $cv->gender,
                    'contact' => $cv->contact,
                    'program' => $cv->program->program_name,
                    'current_level' => $cv->current_level,
                    'email' => $cv->credentials->email,
                    'current_semester' => $cv->current_semester
                ];
            })->first()
        ;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {

        $request->validate([
            'email' => ['required', 'email', 'unique:users,email,' . $student->id],
            'contact' => ['required'],
            'gender' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'program' => ['required'],
            'current_level' => ['required'],
            'current_semester' => ['required'],
        ]);


        DB::transaction(function () use ($request, $student) {
            $student->update([
                'gender' => $request->gender,
                'contact' => $request->contact,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'programs_id' => Programs::where('program_name', $request->program)->firstOrFail()->id,
                'current_level' => $request->current_level,
                'current_semester' => $request->current_semester,
            ]);

            $student->credentials->update([
                'email' => $request->email
            ]);

        });

        return response('done');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        return $student->credentials->delete();
    }
}