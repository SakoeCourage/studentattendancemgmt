import React, { useEffect, useState } from 'react'
import FormInputText from '@/components/inputs/FormInputText'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import Api from '@/js/api/Api'
import Button from '@/components/inputs/Button'
import Loadingspinner from '@/components/Loaders/Loadingspinner'
import Loadingwheel from '@/components/Loaders/Loadingwheel'
const gender = ['male', 'female']
const levels = ['100', '200', '300', '400']
const semester = [1, 2]

function Viewstudent({ student, availablePrograms, onClose, getData }) {
  const [formData, setFormData] = useState({

  })
  const [isLoading, setIsLoading] = useState(false)



  const getCurrentStudent = () => {
    setIsLoading(true)
    if (student?.id) {
      Api.get(`/student/view-student/${String(student.id)}`)
        .then(res => {
          setFormData(res.data)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }


  const handleAfterSucess = () => {
    setIsLoading(false)
    onClose()
    getData()
  }

  const handleStudentUpdate = () => {
    setIsLoading(true)
    if (student?.id) {
      Api.post(`/student/update-student/${String(student.id)}`, formData)
        .then(res => {
          handleAfterSucess()
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }


  const handleStudentDelete = () => {
    if (student?.id) {
      setIsLoading(true)
      Api.post(`/student/delete-student/${String(student.id)}`)
        .then(res => {
          // console.log(res)
          handleAfterSucess()
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    getCurrentStudent();
  }, [])


  return (
    <>
      {
        isLoading ? <Loadingwheel /> :
          <div className=' flex flex-col gap-5 w-full p-5 !pb-10'>
            <FormInputText value={formData?.student_id} onChange={(e) => setFormData(cv => cv = { ...cv, student_id: e.target.value })} label='Student ID' />
            <FormInputText value={formData?.last_name} onChange={(e) => setFormData(cv => cv = { ...cv, last_name: e.target.value })} label='Last Name' />
            <FormInputText value={formData?.first_name} onChange={(e) => setFormData(cv => cv = { ...cv, first_name: e.target.value })} label='First Name' />
            <FormInputSelect value={formData?.gender} onChange={(e) => setFormData(cv => cv = { ...cv, gender: e.target.value })} options={gender.map(gender => { return ({ name: gender, value: gender }) })} label='Gender' />
            <FormInputText value={formData?.contact} onChange={(e) => setFormData(cv => cv = { ...cv, contact: e.target.value })} label='Contact' />
            <FormInputSelect options={availablePrograms ? [...availablePrograms.map(p => { return ({ name: p.program_name, value: p.program_name }) })] : []} value={formData?.program} onChange={(e) => setFormData(cv => cv = { ...cv, program: e.target.value })} label='Program' />
            <FormInputSelect value={formData?.current_semester} options={semester ? [...semester.map(p => { return ({ name: p, value: p }) })] : []} onChange={(e) => setFormData(cv => cv = { ...cv, current_semester: e.target.value })} label='semester' />
            <FormInputSelect value={formData?.current_level} onChange={(e) => setFormData(cv => cv = { ...cv, current_level: e.target.value })} options={levels.length ? [...levels.map(p => { return ({ name: p, value: p }) })] : []} label='Level' />
            <FormInputText value={formData?.email} onChange={(e) => setFormData(cv => cv = { ...cv, email: e.target.value })} label='Email' />
            <nav className=' flex items-center gap-3 flex-col md:flex-row w-full '>
              <Button onClick={() => handleStudentDelete()} className="w-full md:w-auto flex-grow " danger text="Delete Record" />
              <Button onClick={() => handleStudentUpdate()} className="w-full md:w-auto flex-grow " info text="Update Record" />
            </nav>
          </div>
      }
    </>
  )
}

export default Viewstudent