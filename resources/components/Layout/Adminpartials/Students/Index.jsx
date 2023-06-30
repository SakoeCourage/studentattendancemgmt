import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AllStudents from './AllStudents'
import Broadcast from './Broadcast'
function Index() {

    return (
        <div className=' h-full w-full container mx-auto p-5'>
            <Routes>
                <Route path='/all' element={<AllStudents  />} />
                <Route path='/broadcast' element={<Broadcast />} />
            </Routes>
        </div>
    )
}

export default Index