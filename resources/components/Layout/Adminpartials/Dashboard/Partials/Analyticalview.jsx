import React from 'react'
import { formatnumber } from '@/js/api/Util'
import { Icon } from '@iconify/react'

function Analyticcard({ count, title, className, inscription, IconClass }) {
    return <div className={`${className} aspect-[5/3] rounded-3xl p-4 shadow-sm flex flex-col gap-2 items-center relative`}>
        <Icon fontSize={20} className={`absolute top-5 right-5  ${IconClass}`} icon="solar:arrow-right-up-outline" />
        <nav className=' font-semibold text-4xl text-center p-3'>
            {formatnumber(Number(count))}
        </nav>
        <nav className=' font-bold text-center text-gray-600 '>
            {title}
        </nav>
        <nav className=' text-sm text-gray-400 text-center'>
            {`${inscription}`}
        </nav>
    </div>
}


function Analyticalview({dashboardData}) {
    return (
        <div className=' flex flex-col gap-5 text-gray-700 container mx-auto px-5 lg:!p-10 lg:px-20'>
            <nav className=' flex items-center justify-start font-bold text-3xl'>
                Analytical Overview
            </nav>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5' >
                <Analyticcard IconClass={' text-orange-400'} count={formatnumber(dashboardData?.analyticalData?.studentCount) ?? ''} title='Students' inscription={'All Registered Students'} className=' bg-orange-100/70 ' />
                <Analyticcard IconClass={' text-green-400'} count={formatnumber(dashboardData?.analyticalData?.lecturesCount) ?? ''} inscription={'All Registered Lecturers'} className=' bg-green-100/70 ' />
                <Analyticcard IconClass={' text-blue-400'} count={formatnumber(dashboardData?.analyticalData?.programsCount) ?? ''} title='Programs' inscription={'All Programs offered'} className=' bg-blue-100/70 ' />
                <Analyticcard IconClass={' text-zinc-400'} count={formatnumber(dashboardData?.analyticalData?.courseCount) ?? ''} title='Course'inscription={'All Registered Courses'} className=' bg-zinc-100/70 ' />
            </div>

        </div>
    )
}

export default Analyticalview