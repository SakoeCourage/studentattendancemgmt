import React, { useEffect, useState } from 'react'
import Analyticalview from './Partials/Analyticalview'
import LineChart from './Partials/Linechart'
import Api from '@/js/api/Api'
function Index() {

  const [data,setData] = useState(null)


  const getDashboardData = () => {
    Api.get('/dashboard/data')
      .then(res => {
        console.log(res.data)
        
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
    getDashboardData();
  }, [])
  
  return (
    <div className=' container mx-auto  pb-10'>
      <Analyticalview dashboardData={data} />
      <div className=' px-10'>
        <LineChart dashboardData={data} />
      </div>
    </div>
  )
}

export default Index