<?php

namespace Database\Seeders;

use App\Models\Courses;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'course_name' => 'Introduction to Psychology',
                'course_code' => 'PSY101',
            ],
            [
                'course_name' => 'Digital Marketing Strategies',
                'course_code' => 'MKT302',
            ],
            [
                'course_name' => 'Python Programming for Beginners',
                'course_code' => 'CMP110',
            ],
            [
                'course_name' => 'Financial Management Principles',
                'course_code' => 'FIN201',
            ],
            [
                'course_name' => 'Art History: From Ancient to Contemporary',
                'course_code' => 'ART302',
            ],
            [
                'course_name' => 'Environmental Sustainability and Conservation',
                'course_code' => 'ENV220',
            ],
            [
                'course_name' => 'Business Ethics and Corporate Governance',
                'course_code' => 'BUS310',
            ],
            [
                'course_name' => 'Introduction to Astrophysics and Cosmology',
                'course_code' => 'AST205',
            ],
            [
                'course_name' => 'International Relations and Diplomacy',
                'course_code' => 'POL320',
            ],
            [
                'course_name' => 'Introduction to Graphic Design Principles',
                'course_code' => 'GD101',
            ],
            [
                'course_name' => 'Microeconomic Analysis and Applications',
                'course_code' => 'ECO301',
            ],
            [
                'course_name' => 'Human Anatomy and Physiology Fundamentals',
                'course_code' => 'BIO210',
            ],
            [
                'course_name' => 'Introduction to Film Production',
                'course_code' => 'FLM101',
            ],
            [
                'course_name' => 'Principles of Marketing Management',
                'course_code' => 'MKT201',
            ],
            [
                'course_name' => 'Introduction to Data Science and Analytics',
                'course_code' => 'DSC101',
            ],
            // Add more courses here...

        ];

        foreach ($courses as $course) {
            Courses::create($course);
        }
    }
}
