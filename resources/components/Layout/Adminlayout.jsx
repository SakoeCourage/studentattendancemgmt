import React, { useState, useEffect, useRef } from 'react'
import { SidebarContext } from './context/SidebarContext'
import Sidebar from './Adminpartials/Sidebar/Sidebar'
import Header from './Adminpartials/Header'
import { Outlet } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Adminpartials/Dashboard'
import Studentspage from './Adminpartials/Students'
import Programpage from './Adminpartials/Programs'
import Coursepage from './Adminpartials/Courses'
import Lecturerpage from './Adminpartials/Lecturers'

export function Adminlayout() {
  const [showSidebar, setShowsidebar] = useState(true)
  const [scrollWidth, setScrollwidth] = useState(null)
  const sidebarElement = useRef(null)


  useEffect(() => {
    setScrollwidth(sidebarElement.current.scrollWidth)
    if (showSidebar) {
      sidebarElement.current.style.width = `${scrollWidth ?? 320}px`
    } else {
      sidebarElement.current.style.width = `0px`
    }
  }, [showSidebar])


  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-100">
      <SidebarContext.Provider value={{ setShowsidebar }}>
        <span ref={sidebarElement} className='hidden transition-[width] duration-300 w-max md:block  ' >
          <Sidebar />
        </span>
        <span className=' grow h-full overflow-x-hidden flex flex-col' id='documentPage'>
          <nav className='sticky top-0 shadow-sm z-10 bg-white basis-16 '><Header /></nav>
          <nav className='w-full h-full bg-white  z-10 relative   mx-auto overflow-x-hidden  grow ' id='outlet'>
            <Routes>
              <Route exact={true} path='/dashboard' element={<Dashboard />} />
              <Route  path='/student/*' element={<Studentspage />} />
              <Route  path='/programs/*' element={<Programpage />} />
              <Route  path='/courses/*' element={<Coursepage />} />
              <Route  path='/lecturer/*' element={<Lecturerpage />} />
            </Routes >
          </nav>
        </span>
      </SidebarContext.Provider>
    </div>
  )
}

export default Adminlayout