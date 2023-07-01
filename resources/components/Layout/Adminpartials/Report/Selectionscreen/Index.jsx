import React from 'react'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

function Index() {
  return (
    <div className=' container mx-auto p-5'>
      <fieldset className=' border border-info-200 rounded-md grid grid-cols-1 gap-5 md:grid-cols-3 p-10 '>
        <legend className=' p-5 py-2 bg-info-100/50 rounded-lg text-info-800'>Available Reporting Options</legend>
        <NavLink to='studentsreport' className='flex custom_box_shadow report-list-card p-3 gap-3 rounded-md cursor-pointer bg-green-50 text-green-500'>
          <input type="radio" disabled name="" id="" className='w-full max-w-[1rem] aspect-square accent-green-500' />
          <nav className='flex flex-col w-full'>
            <nav className='flex items-center gap-2'>
              <nav className=' font-bold aspect-square p-1 w-8 text-center rounded-md bg-green-600 text-white'>S</nav>
              <nav>Student Attendance Report</nav>
              <button className='ml-auto px-2 py-1 bg-white rounded-full icon-goto '>
                <Icon fontSize={20} icon="solar:round-arrow-right-up-outline" />
              </button>
            </nav>
            <nav className=' text-sm text-gray-400 py-5 '>
              Get a student attendance report on given dates ranges
            </nav>

            <nav className='mt-auto text-gray-400 text-sm flex items-center gap-2 '>
              <Icon icon="bx:calendar" />
              <nav>{new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date())}</nav>
              <nav className=' ml-auto text-green-500 flex items-center'>
                <Icon fontSize={25} fontWeight={100} icon="arcticons:studentid" />
              </nav>
            </nav>
          </nav>
        </NavLink>

        <NavLink className='flex custom_box_shadow report-list-card p-3 gap-3 rounded-md cursor-pointer bg-pink-50 text-pink-500 relative'>
          <div className="flex items-center absolute inset-0 justify-center bg-black/20">
            <button className=' bg-white shadow-sm text-gray-500 px-5 py-2 rounded-lg'>
              Option not available
            </button>
          </div>
          <input type="radio" disabled name="" id="" className='w-full max-w-[1rem] aspect-square accent-pink-500' />
          <nav className='flex flex-col w-full'>
            <nav className='flex items-center gap-2'>
              <nav className=' font-bold aspect-square p-1 w-8 text-center rounded-md bg-pink-600 text-white'>P</nav>
              <nav>Program Attendance Report</nav>
              <button className='ml-auto px-2 py-1 bg-white rounded-full icon-goto '>
                <Icon fontSize={20} icon="solar:round-arrow-right-up-outline" />
              </button>
            </nav>
            <nav className=' text-sm text-gray-400 py-5 '>
              Get a attendance number of student on a given program's course
            </nav>

            <nav className='mt-auto text-gray-400 text-sm flex items-center gap-2 '>
              <Icon icon="bx:calendar" />
              <nav>{new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date())}</nav>
              <nav className=' ml-auto text-pink-500 flex items-center'>
                <Icon fontSize={25} fontWeight={100} icon="arcticons:studentid" />
              </nav>
            </nav>
          </nav>
        </NavLink>
      </fieldset>

    </div>
  )
}

export default Index