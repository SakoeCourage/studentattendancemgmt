import React, { useEffect, useState } from 'react'
import Analyticalview from './Partials/Analyticalview'
import LineChart from './Partials/Linechart'
import Api from '@/js/api/Api'
import Loadingspinner from '@/components/Loaders/Loadingspinner'

function Index() {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getDashboardData = () => {
    setIsLoading(true)
    Api.get('/dashboard/data')
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })

  }

  useEffect(() => {
    getDashboardData();
  }, [])

  return (
    <div className=' container mx-auto  pb-10'>
      {isLoading ?

        <div className="flex items-center justify-center min-h-screen">
          <Loadingspinner />
        </div> :

        <>
          <Analyticalview dashboardData={data} />
          <div className=' px-10'>
            <LineChart dashboardData={data} />
          </div></>
      }


    </div>
  )
}

export default Index