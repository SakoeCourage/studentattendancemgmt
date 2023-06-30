import React, { useEffect, useState } from 'react'
import FormInputText from '@/components/inputs/FormInputText'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import Button from '@/components/inputs/Button'
import axios from 'axios'
import Api from '@/js/api/Api'
import { Icon } from '@iconify/react'

const initialData = {
    program_id: null,
    course_id: null,
    level: null,
    semester: null
}

const levels = ['100', '200', '300', '400']
const semester = [1, 2]

function Courselistsection({ programsformDb, onNewEntry }) {
    const [currentData, setCurrentData] = useState(initialData)

    const [availableCourse, setAvailableCourse] = useState([

    ])
    function hasNoNullValues() {
        for (const key in currentData) {
            if (currentData[key] === null) {
                return false;
            }
        }
        return true;
    }

    const findCourseByProgramID = (pid) => (Boolean(programsformDb.length)) && programsformDb.find((program) => Number(program.id) === Number(pid))


    const handleOnProgramChange = (id) => {
        setCurrentData({ ...currentData, program_id: id, course_id: null })
        setAvailableCourse(findCourseByProgramID(id).programscourses)
    }

    const resetFrom = () => {
        setCurrentData(initialData)
    }
    const handleOnSubmit = () => {
        console.log(hasNoNullValues())
        if (hasNoNullValues()) {
            onNewEntry(currentData)
            resetFrom()
        }
    }
    return <div className=' mt-auto w-full p-2'>
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-2  '>
            <FormInputSelect value={currentData?.program_id} onChange={(e) => handleOnProgramChange(e.target.value)} options={Boolean(programsformDb.length) ? [...programsformDb.map(program => { return ({ name: program.program_name, value: program.id }) })] : []} label="Program" />
            <FormInputSelect value={currentData?.course_id} onChange={(e) => setCurrentData({ ...currentData, course_id: e.target.value })} options={Boolean(availableCourse.length) ? [...availableCourse.map(course => { return ({ name: course.course_name, value: course.id }) })] : []} label="Course" />
            <FormInputSelect value={currentData?.level} onChange={(e) => setCurrentData(cv => cv = { ...cv, level: e.target.value })} options={levels.length ? [...levels.map(p => { return ({ name: p, value: p }) })] : []} label='Level' />
            <FormInputSelect value={currentData?.semester} options={semester ? [...semester.map(p => { return ({ name: p, value: p }) })] : []} onChange={(e) => setCurrentData(cv => cv = { ...cv, semester: e.target.value })} label='semester' />

        </div>
        <Button neutral onClick={handleOnSubmit} className="w-full mt-2 !flex items-center gap-2">
            <Icon className=' inline mx-2 my-auto' icon="bi:plus-circle" />
           <span className=' inline-block my-auto '> Assign To Lecturer</span>
        </Button>
    </div>

}


function Lecturercourselist({ getProgramCourseAssignment,assignments }) {
    const [programsformDb, setProgramsFromDb] = useState([])
    const [coursesFromDB, setCoursesFromDB] = useState([])

    const [list, setList] = useState([])

    const findProgramBNameyID = (pid) => (Boolean(programsformDb.length)) && programsformDb.find((program) => Number(program.id) === Number(pid))?.program_name
    const findCourseNameByID = (cid) => (Boolean(coursesFromDB.length)) && coursesFromDB.find((course) => Number(course.id) === Number(cid))?.course_name

    const getavailablePrograms = Api.get('/programs/offered-courses')
    const getavailableCourses = Api.get('/courses/to-select')

    const fetchAllData = () => {
        axios.all([getavailablePrograms, getavailableCourses])
            .then(axios.spread((programs, courses) => {
                console.log(programs.data)
                setProgramsFromDb(programs.data)
                setCoursesFromDB(courses.data)
            })).catch(err => {
                console.log(err)
            })
    }

    function doesObjectExist(obj) {
        return list.some(item => {
            return (
                item.program_id === obj.program_id &&
                item.course_id === obj.course_id &&
                item.level === obj.level &&
                item.semester === obj.semester
            );
        });
    }

    const onNewEntry = (newentry) => {
        if (!doesObjectExist(newentry)) {
            setList([...list, { ...newentry }])
        }
    }

    const handleOnDelete = (index) => {
        setList(cv => cv.filter((l, i) => i !== index));
    }
    useEffect(() => {
        fetchAllData()
    }, [])

    useEffect(() => {
        getProgramCourseAssignment(list)
    }, [list])


    return (
        <div className=' min-h-[25rem] border-2 border-gray-400/40 rounded-md flex flex-col w-full'>
            <table>
                <thead className=' bg-secondary-200 '>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>#</th>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>Program</th>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>Course</th>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>Level</th>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>Semester</th>
                    <th className=' px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold'>Action</th>
                </thead>
                <tbody>
                    {
                        Boolean(assignments?.length) && list.map((list, i) => {
                            return (
                                <tr key={i}>
                                    <td className=' px-6 py-2  whitespace-nowrap'>{i + 1}</td>
                                    <td className=' px-6 py-2  whitespace-nowrap'>{findProgramBNameyID(list.program_id)}</td>
                                    <td className=' px-6 py-2  whitespace-nowrap'>{findCourseNameByID(list.course_id)}</td>
                                    <td className=' px-6 py-2  whitespace-nowrap'>{list.level}</td>
                                    <td className=' px-6 py-2  whitespace-nowrap'>{list.semester}</td>
                                    <td className=' px-6 py-2  whitespace-nowrap'><Icon onClick={() => handleOnDelete(i)} className=' text-red-400 cursor-pointer' icon="tabler:trash-filled" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Courselistsection onNewEntry={onNewEntry} programsformDb={programsformDb} />
        </div>
    )
}

export default Lecturercourselist