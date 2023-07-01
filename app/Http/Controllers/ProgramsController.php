<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Programs;
use App\Models\program_has_courses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ProgramHasCoursesController;

class ProgramsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Programs $programs, Request $request)
    {

        return [
            'programs' => $programs->filter(request()->only('search'))->latest()
                ->paginate(10)->withQueryString()
                ->through(function ($currentprogram) {
                    return [
                        'id' => $currentprogram->id,
                        'created_at' => $currentprogram->created_at,
                        'program_name' => $currentprogram->program_name
                    ];
                }),
            'filters' => $request->only(['search']),
            'full_url' => trim($request->fullUrlWithQuery(request()->only('search')))
        ];
        ;
    }

    public function programstoselect()
    {
        return Programs::get('program_name');
    }

    public function getIDFromCourseName(string $coursename)
    {
        return Courses::where('course_name', $coursename)->get()->pluck('id')->first();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'program_name' => ['required', 'string','unique:programs,program_name'],
            'program_courses' => ['required', 'array', 'min:1']
        ]);


        DB::transaction(function () use ($request) {
            $newprogram = Programs::create([
                'program_name' => $request->program_name
            ]);

            foreach ( $request->program_courses as $key => $course) {
                program_has_courses::create([
                    'program_id' => $newprogram->id,
                    'course_id' => $this->getIDFromCourseName($course)
                ]);
            }
        });

        return response('ok');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    
    public function getProgramscourses(Programs $program)
    {
        return $program->with(['programscourses'])->get();
    }

    /**
     * Display the specified resource.
     */
    public function show(Programs $programs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programs $programs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Programs $programs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programs $programs)
    {
        //
    }
}