import React from 'react'
import { Adminlayout, Lecturelayout, StudentLayout } from '@/components/Layout'
import { Navigate, Route, Routes } from 'react-router-dom'

function Layout() {
   
    return (
            <Routes>
                <Route path='/admin/*' element={<Adminlayout />} />
                <Route path='/admin' element={<Navigate to='/admin/dashboard' />} />
            </Routes>
    )
}

export default Layout