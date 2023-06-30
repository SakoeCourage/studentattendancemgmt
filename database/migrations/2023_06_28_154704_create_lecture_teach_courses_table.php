<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lecture_teach_courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('program_id')->default(0);
            $table->string('level')->nullable();
            $table->foreignId('course_id')->default(0);
            $table->foreignId('lecture_id');
            $table->smallInteger('semester')->default(1);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecture_teach_courses');
    }
};
