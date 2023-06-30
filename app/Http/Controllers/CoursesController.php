<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use Illuminate\Http\Request;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Courses $courses, Request $request)
    {
        return [
            'courses' => $courses->filter(request()->only('search'))->latest()
                ->paginate(10)->withQueryString()
                ->through(function ($currentCourse) {
                    return [
                        'id' => $currentCourse->id,
                        'created_at' => $currentCourse->created_at,
                        'course_name' => $currentCourse->course_name,
                        'course_code' => $currentCourse->course_code
                    ];
                }),
            'filters' => $request->only(['search']),
            'full_url' => trim($request->fullUrlWithQuery(request()->only('search')))
        ];
    }

    public function toselect()
    {
        return Courses::get(['id', 'course_name', 'course_code']);
    }


    public function getCoursesOfferedInProgram(Courses $course){
            return $course->with(['courseprograms'])->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $data = $request->validate([
            'course_code' => ['required', 'string', 'max:255', 'unique:courses,course_code'],
            'course_name' => ['required', 'string', 'max:255', 'unique:courses,course_name']
        ]);
        Courses::create($data);
        return response('created', 200);
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
    public function show(Courses $courses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Courses $courses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Courses $courses)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courses $courses)
    {
        //
    }
}