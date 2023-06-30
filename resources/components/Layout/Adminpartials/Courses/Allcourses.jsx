import React, { useEffect,useState } from 'react'
import Coursestable from './partials/Coursestable';
import Api from '@/js/api/Api'
import SideModal from '@/components/modal/sideModal';
import Viewcourse from './partials/Viewcourse';
import Modal from '@/components/modal/modal';

function Allcourses() {
    const [data, setData] = useState({});
    const [filters, setFilters] = useState({});
    const [fullUrl, setFullUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewById, setViewById] = useState({
        id: null
    })

    const getAllcourses = (url) => {
        setIsLoading(true)
        Api.get(url ?? '/courses/all')
            .then(res => {
                console.log(res.data)
                const { filters, full_url, courses } = res.data
                setData(courses)
                setFullUrl(full_url)
                setFilters(filters)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getAllcourses()
    }, [])
    return (
        <div>
            <SideModal
                title={`COURSE`}
                maxWidth='xl'
                open={Boolean(viewById?.id)}
                showClose={true}
                onClose={() => setViewById({ id: null })}
            >
                <Viewcourse
                    onClose={() => setViewById({ id: null })}
                    getData={getAllcourses}
                />
            </SideModal>
            <Coursestable
                setViewById={setViewById}
                data={data}
                fullUrl={fullUrl}
                fetchData={getAllcourses}
                isLoading={isLoading}
                filters={filters}
            />
        </div>
    )
}

export default Allcourses