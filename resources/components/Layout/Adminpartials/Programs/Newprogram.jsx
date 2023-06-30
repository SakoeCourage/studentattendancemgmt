import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import FormInputMultiSelect from '@/components/inputs/FormInputMultiSelect'
import FormInputText from '@/components/inputs/FormInputText'
import Api from '@/js/api/Api'
import Button from '@/components/inputs/Button'
import Loadingwheel from '@/components/Loaders/Loadingwheel'
import {  useSnackbar } from 'notistack'


function Newprogram() {
  const [allCoursesList, setAllCoursesList] = useState([])
  const [errors, setErrors] = useState({})
  const [programCourses, setProgramCourse] = useState([])
  const [programName, setProgramName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const getAllCourseList = () => {
    Api.get('/courses/to-select')
      .then(res => {
        setAllCoursesList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllCourseList();
  }, [])


  const handleOnSubmit = () => {
    setIsLoading(true)
    Api.post('/programs/new', {
      program_name: programName,
      program_courses: programCourses
    })
      .then(res => {
        console.log(res)
        setIsLoading(false)
        enqueueSnackbar('New Program Added',{variant:'success'})
      })
      .catch(err => {
        console.log(err)
        if (err?.response?.status === 422) {
          setErrors(err?.response?.data?.errors)
        }
        setIsLoading(false)
      })

  }

  return (
    <div>
      {isLoading && <Loadingwheel />}
      <nav className=' flex items-center gap-5 max-w-5xl mx-auto text-2xl text-gray-500'>
        <Icon icon="bi:plus-circle" />
        <h5>New Program</h5>
      </nav>
      <nav className="max-w-4xl mx-auto flex flex-col gap-5 w-full mt-10">
        <FormInputText error={errors?.program_name} helperText={errors?.program_name} value={programName} onChange={(e) => setProgramName(e.target.value)} className="max-w-4xl" label="Name of Program" />

        <nav className=' bg-orange-100/50 p-5 rounded-md shadow flex gap-5 items-center text-orange-900'>
          <Icon className=' w-5 h-5' icon="clarity:note-line" />
          <p>
            Include courses that students who are eligible to offer these program can take
          </p>
        </nav>
        <FormInputMultiSelect error={errors?.program_courses} helperText={errors?.program_courses} label="Eligible Courses" options={Boolean(allCoursesList.length > 0) ? [...allCoursesList.map(course => { return ({ name: course?.course_name }) })] : []} selectedData={(v) => setProgramCourse(v)} />
      </nav>
      <nav className="flex flex-col md:flex-row gap-5 w-full max-w-4xl mx-auto mt-10">
        <Button className="flex-grow" neutral text="Cancel" />
        <Button className="flex-grow" text="Save" onClick={handleOnSubmit} />
      </nav>
    </div>
  )
}

export default Newprogram