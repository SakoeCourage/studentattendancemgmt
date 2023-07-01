import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Icon } from '@iconify/react'
import { Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
function Studentreportview({ reportData, onClose }) {
    const { attendance_data, student_data, end_date, start_date, presence_count, absence_count } = reportData

    const toPrint = useRef()

    const [showToolBar, setShowToolBar] = useState(false)
    const handlePrint = useReactToPrint({
        content: () => toPrint.current,
        documentTitle: `Attendance Report - ${student_data?.student_id}`,
        onAfterPrint: () => onClose()
    })


    return (
        <motion.div className='fixed  inset-0 isolate  bg-gray-100 z-[40]'
            initial={{ opacity: 0, translateY: '100vh' }}
            animate={{
                opacity: 1,
                translateY: '0',
                transition: {
                    type: 'spring',
                    mass: 0.1,
                    damping: 8
                }
            }}
            exit={{ opacity: 0, translateY: '100vh', transition: { duration: 0.2 } }}
        >
            <div className='fixed z-[60] bottom-10 right-10 bg-transparent flex flex-col gap-5 '>
                <Tooltip placement='left' title="Print as Document">
                    <Icon fontSize={30} onClick={handlePrint} className=' text-red-600 cursor-pointer' icon="fluent:print-32-filled" />
                </Tooltip>
                <Tooltip placement='left' title="Close View">
                    <Icon fontSize={30} onClick={() => onClose()} className=' text-red-600 cursor-pointer' icon="zondicons:close-solid" />
                </Tooltip>

            </div>
            <div className=' select-none fixed min-h-screen bg-gray-100 inset-0 z-50 isolate overflow-scroll min-w-[100vw] font-mono '>
                <div ref={toPrint} className=' h-max w-[1211px] mx-auto pt-10 px-5 '>
                    <h3 className=' text-gray-800 text-4xl w-full text-center'>
                        STUDENT ATTENDANCE REPORT
                    </h3>
                    <nav className='text-center py-2 border-b-2 border-black'>
                        <nav className=' '>
                            <span className='text-gray-500 mr-2'>Student Full Name:</span>
                            <span className="uppercase"> {`${student_data?.last_name} ${student_data?.first_name}`}</span>
                        </nav>
                        <nav className=' '>
                            <span className='text-gray-500 mr-2'>Student ID:</span>
                            <span className="uppercase">{student_data?.student_id}</span>
                        </nav>
                        <nav className='text-gray-500'>
                            <span className=' mr-1'>
                                Report from
                            </span>
                            <span>
                                {`${start_date} to ${end_date}`}
                            </span>
                        </nav>
                    </nav>
                    <table className="report-table w-full">
                        <thead>
                            <tr className="uppercase text-left">
                                <th>
                                    RECORD DATE
                                </th>
                                <th>
                                    PROGRAM
                                </th>
                                COURSE CODE
                                <th>
                                    COURSE NAME
                                </th>
                                <th>
                                    LEVEL
                                </th>
                                <th>
                                    SEMESTER
                                </th>
                                <th>
                                    PRESENCE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Boolean(attendance_data?.length) && attendance_data.map((dt, i) => {
                                return (
                                    <tr key={i} className='py-2'>
                                        <td>{dt.created_at}</td>
                                        <td>{dt.program_name}</td>
                                        <td>{dt.course_code}</td>
                                        <td>{dt.course_name}</td>
                                        <td className=' min-w-[5rem]'>{dt.level}</td>
                                        <td>{dt.semester}</td>
                                        <td>{String(Boolean(dt.presence))}</td>
                                    </ tr >
                                )
                            })}
                        </tbody>
                        <tfoot className='!mt-4'>
                            <tr className=' bg-gray-700 text-white py-2'>
                                <td colSpan={2} className=' px-5 whitespace-nowrap'>Summary</td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <span>Presence Count: {presence_count}</span>
                                </td>
                                <td className=' flex flex-col'>
                                    <span>Absence Count: {absence_count}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <nav>

                    </nav>
                </div>
            </div>
        </motion.div>
    )
}

export default Studentreportview