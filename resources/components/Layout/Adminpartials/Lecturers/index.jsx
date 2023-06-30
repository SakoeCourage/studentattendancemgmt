import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Alllecturers from './Alllecturers'
import NewLecturer from './NewLecturer'
function Index() {

    return (
        <div className=' h-full w-full container mx-auto p-5'>
            <Routes>
                <Route path='/all' element={<Alllecturers  />} />
                <Route path='/new' element={<NewLecturer />} />
            </Routes>
        </div>
    )
}

export default Index