import React, { useState, useEffect } from 'react'
import Studenttable from './partials/Studenttable'
import Api from '@/js/api/Api'
import SideModal from '@/components/modal/sideModal';
import Viewstudent from './partials/Viewstudent';
import Modal from '@/components/modal/modal';
function AllStudents() {
  const [data, setData] = useState({});
  const [availablePrograms, setAvailablePrograms] = useState({})
  const [filters, setFilters] = useState({});
  const [fullUrl, setFullUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewById, setViewById] = useState({
    id: null,
    student_id: null
  })

  const getAllStudents = (url) => {
    setIsLoading(true)
    Api.get(url ?? '/student/all')
      .then(res => {
        console.log(res.data)
        const { filters, full_url, students } = res.data
        setData(students)
        setFullUrl(full_url)
        setFilters(filters)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const getavailablePrograms = () => {
    Api.get('/programs/to-select')
      .then(res => {
        console.log(res.data)
        setAvailablePrograms(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllStudents()
    getavailablePrograms()
  }, [])
  return (
    <div>
      <SideModal
        title={`STUDENT -  ${viewById?.student_id}`}
        maxWidth='xl'
        open={Boolean(viewById?.id && viewById?.student_id)}
        showClose={true}
        onClose={() => setViewById({ id: null, student_id: null })}
      >
        <Viewstudent
          onClose={() => setViewById({ id: null, student_id: null })}
          getData={getAllStudents}
          availablePrograms={availablePrograms} student={viewById} />
      </SideModal>
      <Studenttable
        availablePrograms={availablePrograms} student={viewById}
        setViewById={setViewById}
        data={data}
        fullUrl={fullUrl}
        fetchData={getAllStudents}
        isLoading={isLoading}
        filters={filters}
      />
    </div>
  )
}

export default AllStudents