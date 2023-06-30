import React, { useState } from 'react'
import FormInputText from '@/components/inputs/FormInputText'
import FormInputSelect from '@/components/inputs/FormInputSelect'
import Button from '@/components/inputs/Button'
import { Icon } from '@iconify/react'
import Api from '@/js/api/Api'
import Loadingwheel from '@/components/Loaders/Loadingwheel'
import { enqueueSnackbar, useSnackbar } from 'notistack'


function Newcourse() {
    const [errors, setErrors] = useState({

    })
    const [isLoading, setIsLoading] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [formData, setFormData] = useState({
        course_name: '',
        course_code: ''
    })

    const resetForms = () => {
        setFormData({
            course_code: '',
            course_name: ''
        })
    }

    const handleOnSubmit = () => {
        setIsLoading(true)
        Api.post('/courses/new', { ...formData })
            .then(res => {
                setIsLoading(false)
                enqueueSnackbar('New Course Added', { variant: 'success' })
                resetForms()
            })
            .catch(err => {
                if (err?.response?.status === 422) {
                    setErrors(err?.response?.data?.errors)
                }
                setIsLoading(false)
                console.log(err.response)
            })

    }


    return (
        <div className=' '>
            <nav className=' flex items-center gap-5 max-w-5xl mx-auto text-2xl text-gray-500'>
                <Icon icon="bi:plus-circle" />
                <h5>New Course</h5>
            </nav>
            {isLoading && <Loadingwheel />}

            <section className=' max-w-5xl w-full mx-auto flex  flex-col gap-5 mt-20'>
                <main className=' max-w-3xl'>
                    <nav className="flex flex-col gap-5">
                        <FormInputText value={formData.course_code} helperText={errors?.course_code} error={errors?.course_code} onChange={(e) => setFormData({ ...formData, course_code: e.target.value })} className="w-full" label='Course Code' />
                        <FormInputText value={formData.course_name} helperText={errors?.course_name} error={errors?.course_name} onChange={(e) => setFormData({ ...formData, course_name: e.target.value })} className="w-full" label='Course Name' />
                    </nav>
                </main>
                <nav className="flex flex-col md:flex-row gap-5 w-full max-w-3xl">
                    <Button className="flex-grow" neutral text="Cancel" />
                    <Button className="flex-grow" text="Save" onClick={handleOnSubmit} />
                </nav>
            </section>

        </div>
    )
}

export default Newcourse