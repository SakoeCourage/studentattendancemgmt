import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import Button from '@/components/inputs/Button'
import { NavLink } from 'react-router-dom'
import FormInputDate from '@/components/inputs/FormInputDate'
import FormInputText from '@/components/inputs/FormInputText'
import Studentreportview from './Studentreportview'
import Api from '@/js/api/Api'
import Loadingwheel from '@/components/Loaders/Loadingwheel'
import { motion, AnimatePresence } from 'framer-motion'
function Index() {
  const [isLoading,setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
      student_id: '',
      start_date: null,
      end_date: null,
  })
  const [reportData, setReportData] = useState(null)

  const [errors, setErrors]= useState({})



  const handleOnGnerate = () =>{
    setIsLoading(true)
     setErrors({})
     Api.post('/report/new-student',formData)
     .then(res=>{
      setReportData(res.data)
      setIsLoading(false)
     })
     .catch(err=>{
      if(err?.response?.status === 422){
        setErrors(err?.response?.data?.errors)
      }
      console.log(err)
      setIsLoading(false)
     })
  }
  return (
    <div className=' min-h-screen  flex items-center relative'>
      {isLoading && <Loadingwheel/>}

      <AnimatePresence>
     {reportData && <Studentreportview onClose={()=>setReportData(null)} reportData ={reportData}/>}
      </AnimatePresence>
      <NavLink to='/admin/report'>
        <Button neutral className="absolute top-14 left-10 flex items-center gap-2 ">
          <Icon fontSize={20} className=' inline-block mr-2 my-auto' icon="ion:arrow-back-circle-outline" />
          <span className="inline-block">
            Back
          </span>
        </Button>
      </NavLink>
      <nav className='flex flex-col max-w-2xl w-full mx-auto'>
        <nav className=' text-center font-medium text-gray-500 text-xl mb-5 uppercase'>
          STUDENT ATTENDANCE REPORT GENERATOR
        </nav>
        <FormInputText error={errors?.student_id} helperText={errors?.student_id} onChange={(e)=>setFormData({...formData,student_id:e.target.value})} className="!mb-5" label="Sudent ID" placeholder="Sudent ID" />
        <nav className="flex flex-col w-full  gap-5">
          <nav className="w-full flex gap-1 flex-col"><FormInputDate className="w-full" error={errors?.start_date} helperText={errors?.start_date} onChange={(e)=>setFormData({...formData,start_date:e.target.value})} label="Start Date" />
            {errors?.start_date && <span className=' ml-4 text-xs text-red-500'>{errors?.start_date}</span>}
          </nav>
          <nav className="w-full flex gap-1 flex-col">
          <FormInputDate className="w-full" error={errors?.end_date} helperText={errors?.student_id} onChange={(e)=>setFormData({...formData,end_date:e.target.value})} minDate={formData?.start_date ?? null} label="End Date" />
          {errors?.end_date && <span className=' ml-4 text-xs text-red-500'>{errors?.end_date}</span>}
          </nav>
        </nav>
        <Button onClick={()=>handleOnGnerate()} info className="W-full mt-4">
          Generate
        </Button>
      </nav>
    </div>
  )
}

export default Index