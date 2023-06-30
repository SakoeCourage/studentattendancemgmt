import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Allprograms from './Allprograms'
import Newprogram from './Newprogram'
function Index() {
    return (
        <div className=' h-full w-full container mx-auto p-5'>
           <Routes>
           <Route path='/all' element={<Allprograms />} />
            <Route path='/new' element={<Newprogram />} />
           </Routes>

        </div>
    )
}

export default Index