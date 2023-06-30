import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Allcourses from './Allcourses'
import Newcourse from './Newcourse'
function Index() {
  return (
    <div className=' container mx-auto p-5'>
            <Routes>
                <Route path='/all' element={<Allcourses/>}/>
                <Route path='/new' element={<Newcourse />}/>
            </Routes>
    </div>
  )
}

export default Index