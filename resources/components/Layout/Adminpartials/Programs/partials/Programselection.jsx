import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import Emptydata from '@/components/formcomponents/Emptydata'




function Courselistpane({ cl, isSelected, onSelect }) {


    return <ul className=' flex flex-col '>
        {Boolean(cl?.length) && cl.map((c, i) => {
            return <li onClick={() => onSelect(c?.course_name)} className={`cursor-pointer relative p-2 px-5 pr-8 ${i % 2 == 0 ? ' bg-gray-100' : 'bg-gray-50'} `}>
                <span>{c?.course_name}</span>
                {isSelected(c?.course_name) && <Icon className=" absolute right-2 top-4 text-green-800" icon="gg:check-o" />}
            </li>
        })}
    </ul>

}
function Selectedcourselistpane({ cl, onSelect }) {
    return <ul className=' flex flex-col '>
        {Boolean(cl?.length) && cl.map((c, i) => {
            return <li onClick={() => onSelect(c)} className={`cursor-pointer relative p-2 px-5 pr-8 ${i % 2 == 0 ? ' bg-gray-100' : 'bg-gray-50'} `}>
                <span>{c}</span>
                <Icon className=" absolute right-2 top-4 text-red-800" icon="ion:trash-sharp" />
            </li>
        })}
    </ul>

}



function Programselection({ availableCourses, selectedData, selectedCourses, setSelectedCourses }) {

    const [allCoursesList, setAllCoursesList] = useState([])


    const handleOnSelect = (cn) => {
        if (!selectedCourses.includes(cn)) {
            setSelectedCourses([...selectedCourses, cn])
        }
    }

    const handleOnDelete = (cn) => {
        let newdata = selectedCourses.filter(cv => cv !== cn)
        setSelectedCourses(newdata)
    }
    useEffect(() => {
        setAllCoursesList(availableCourses)
    }, [availableCourses])



    const isSelected = useCallback((course_name) => selectedCourses.includes(course_name), [selectedCourses])

    return (
        <div className=' h-[25rem] border-2 border-gray-400/40 rounded-md flex  w-full overflow-hidden'>
            <div className=' basis-[50%] border-r overflow-y-scroll '>
                <nav className=' sticky top-0 z-20 bg-white px-5 py-2 font-semibold w-full'>Avalable Courses List</nav>
                <Courselistpane isSelected={(cv) => isSelected(cv)} onSelect={(v) => handleOnSelect(v)} selectedCourses={selectedCourses} cl={allCoursesList} />
                {Boolean(allCoursesList.length)
                    ? <Courselistpane isSelected={(cv) => isSelected(cv)} onSelect={(v) => handleOnSelect(v)} selectedCourses={selectedCourses} cl={allCoursesList} />
                    :
                    <nav className=' w-full h-full flex items-center justify-center'>
                        <Emptydata caption={'List unavailable'} />
                    </nav>
                }
            </div>
            <div className=' basis-[50%] border-r overflow-y-scroll '>
                <nav className=' sticky top-0 z-20 bg-white px-5 py-2 font-semibold w-full'>Selected Courses List</nav>
                {Boolean(selectedCourses.length)
                    ? <Selectedcourselistpane
                        onSelect={(v) => handleOnDelete(v)}
                        cl={selectedCourses} /> :
                    <nav className=' w-full h-full flex items-center justify-center'>
                        <Emptydata caption={'No course selected'} />
                    </nav>
                }

            </div>
        </div>
    )
}

export default Programselection