import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Programcoursereport from './Programcoursereport'
import Studentattendancereport from './Studentattendancereport'
import Selectionscreen from './Selectionscreen'
function index() {
  return (
    <div>
        <Routes>
            <Route path='*' element={<Selectionscreen/>} />
            <Route path='/studentsreport' element={<Studentattendancereport/>} />
            <Route path='/coursereport' element={<Programcoursereport/>} />
        </Routes>
    </div>
  )
}

export default index