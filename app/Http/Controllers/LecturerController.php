<?php

namespace App\Http\Controllers;

use App\Models\Lecturer;
use App\Models\lecture_teach_course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Lecturer $lecturer, Request $request)
    {
        return [
            'courses' => $lecturer->filter(request()->only('search'))->latest()
                ->paginate(10)->withQueryString()
                ->through(function ($currentLec) {
                    return [
                        'id' => $currentLec->id,
                        'created_at' => $currentLec->created_at,
                        'first_name' => $currentLec->first_name,
                        'last_name' => $currentLec->last_name
                    ];
                }),
            'filters' => $request->only(['search']),
            'full_url' => trim($request->fullUrlWithQuery(request()->only('search')))
        ];
    }




    public function checkIfAssignmentexist(array $params)
    {
        return lecture_teach_course::where([
            'program_id' => $params['program_id'],
            'course_id' => $params['course_id'],
            'semester' => $params['semester'],
            'level' => $params['level']
        ])->first();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'first_name' => ['required'],
            'last_name' => ['required'],
            'assignments' => ['required', 'array', 'min:1']
        ]);

        DB::transaction(function () use ($request) {
            $newLecturer = Lecturer::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name
            ]);


            foreach ($request->assignments as $key => $assignment) {
                if ($this->checkIfAssignmentexist($assignment)) {
                    throw ValidationException::withMessages([
                        'assignments' => "Assignment at postion " . $key + 1 . " Already assigned to a lecturer"
                    ]);
                } else {
                    lecture_teach_course::create([
                        'program_id' => $assignment['program_id'],
                        'course_id' => $assignment['course_id'],
                        'lecture_id' => $newLecturer->id,
                        'semester' => $assignment['semester'],
                        'level' => $assignment['level']
                    ]);
                };

            }
        });
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
    public function show(Lecturer $lecturer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lecturer $lecturer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lecturer $lecturer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lecturer $lecturer)
    {
        //
    }
}