import React, { useEffect,useState } from 'react'
import Lecturestable from './Partials/Lecturestable';
import Api from '@/js/api/Api'
import SideModal from '@/components/modal/sideModal';
import Viewlecturer from './Partials/Viewlecturer';
import Modal from '@/components/modal/modal';

function Alllecturers() {
    const [data, setData] = useState({});
    const [filters, setFilters] = useState({});
    const [fullUrl, setFullUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewById, setViewById] = useState({
        id: null
    })

    const getAlllecturers = (url) => {
        setIsLoading(true)
        Api.get(url ?? '/lecturer/all')
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
        getAlllecturers()
    }, [])
    return (
        <div>
            <SideModal
                title={`LECTURER`}
                maxWidth='xl'
                open={Boolean(viewById?.id)}
                showClose={true}
                onClose={() => setViewById({ id: null })}
            >
                <Viewlecturer
                    onClose={() => setViewById({ id: null })}
                    getData={getAlllecturers}
                />
            </SideModal>
            <Lecturestable
                setViewById={setViewById}
                data={data}
                fullUrl={fullUrl}
                fetchData={getAlllecturers}
                isLoading={isLoading}
                filters={filters}
            />
        </div>
    )
}

export default Alllecturers