
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@/components/appLogin/login'
import Layout from './Layout'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <div className=' bg-white w-screen h-screen'>
      <SnackbarProvider maxSnack={1}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Layout />} />
        </Routes>
      </SnackbarProvider>
    </div>
  )
}

export default App