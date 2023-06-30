<x-mail::message title="Urgent Notice of Absence">
 #
 <x-mail::panel>
    <nav style="text-align: center;">Absence Notice</nav> <br>
</x-mail::panel>


<nav style="">
 Hello {{ $title }}. {{ $first_name }} {{ $last_name }}
<br> 

<nav style="margin-top: 1rem; font-size:14px; ">
We regret to inform you that you were found absent from the class <b>{{ $course_name }}</b> that concluded today {{ $time }}.
Attendance is a crucial aspect of your academic journey, and it is imperative that you actively participate in all scheduled classes. 
Your absence raises concerns regarding your progress in the course. 
<br>
<br>
We urge you to review your schedule and make every effort to attend all future classes promptly.
If there are any extenuating circumstances, please communicate with your instructor or the appropriate administrative office. 
Your attendance and engagement are vital for your academic success.
</nav>
</nav>

<br>

Best regards,<br>
{{ config('app.name') }}
</x-mail::message>