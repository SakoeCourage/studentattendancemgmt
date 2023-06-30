
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@/components/appLogin/login'
import Layout from './Layout'
import { SnackbarProvider } from 'notistack'
import { useAuth } from './auth/Authcontext'
import Loadingspinner from '@/components/Loaders/Loadingspinner'
import Authroutes from './auth/Authroutes'

function App() {

  const { getUser, checkingforuser, user } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    console.log(checkingforuser)
  }, [checkingforuser])


  useEffect(() => {
    console.log(user)
  }, [user])
  return (
    <div className=' bg-white w-screen h-screen'>
      {checkingforuser === 'fullfiled' ?
        <SnackbarProvider maxSnack={1}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<Authroutes />}>
            <Route path='/*' element={<Layout />} />
            </Route>
          </Routes>
        </SnackbarProvider> :
        <div className=' flex items-center justify-center w-full h-screen'>
          <Loadingspinner />
        </div>

      }
    </div>
  )
}

export default App