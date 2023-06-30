<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;
use App\Mail\Absentnotifymail;


class Absentnotifyjob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $course_name,
        public Collection $absent_students,
        public string $time
    ) {

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->absent_students->each(function ($student, $index) {
            Mail::to($student->credentials->email)
                ->send(new Absentnotifymail($student->credentials->title, $student->first_name, $student->last_name, $this->course_name, $this->time));
        });
    }
}