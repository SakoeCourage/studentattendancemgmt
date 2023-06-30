<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Programs;

class ProgramsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {
    
        $programs = ['Bsc Information Technology', 'Bsc Computer Science', 'Bsc Business Administration'];


        foreach ($programs as $program) {
            Programs::create([
                'program_name' => $program
            ]);
        }

    }
}