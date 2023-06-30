import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import FormInputText from '@/components/inputs/FormInputText'
import Lecturercourselist from './Partials/Lecturercourselist'
import Button from '@/components/inputs/Button'
import Api from '@/js/api/Api'
import Loadingwheel from '@/components/Loaders/Loadingwheel'

const initialData = {
    first_name: '',
    last_name: '',
    assignments: []
}

function NewLecturer() {
    const [formData, setFormData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const reset = () => setFormData(initialData)

    const handleOnSubmit = () => {
        setIsLoading(true)
        setErrors({})
        Api.post('/lecturer/new',formData)
            .then(res => {
                setIsLoading(false)
                reset();
            })
            .catch(err => {
                console.log(err)
                if (err?.response?.status == 422) {
                    setErrors(err?.response?.data?.errors)
                }
                setIsLoading(false)
            })
            
    }
    return (
        <div className=' pb-10'>
            {isLoading && <Loadingwheel />}
            <nav className=' flex items-center gap-5 max-w-5xl mx-auto text-2xl text-gray-500'>
                <Icon icon="bi:plus-circle" />
                <h5>New Lecturer</h5>
            </nav>

            <nav className=' flex flex-col gap-7 mt-10 max-w-4xl mx-auto'>

                <FormInputText error={errors.first_name} helperText={errors.first_name} value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} label="First Name" />
                <FormInputText error={errors.last_name} helperText={errors.last_name} value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} label="Last Name" />
                <nav className=' bg-orange-100/50 p-5 rounded-md shadow flex gap-5 items-center text-orange-900'>
                    <Icon className=' w-5 h-5' icon="clarity:note-line" />
                    <p>
                        New programs and other criterias for new lecturer
                    </p>
                </nav>
                <nav className=' w-full`'>
                    <Lecturercourselist assignments={formData?.assignments} getProgramCourseAssignment={(v) => setFormData({ ...formData, assignments: v })} />
                    {errors?.assignments && <span className=' text-xs mx-4 text-red-600'>{errors?.assignments}</span>}
                </nav>
            </nav>

            <nav className="flex flex-col md:flex-row gap-5 w-full max-w-4xl mx-auto mt-10">
                <Button className="flex-grow" neutral text="Cancel" />
                <Button className="flex-grow" text="Save" onClick={()=>handleOnSubmit()} />
            </nav>
        </div>
    )
}

export default NewLecturer