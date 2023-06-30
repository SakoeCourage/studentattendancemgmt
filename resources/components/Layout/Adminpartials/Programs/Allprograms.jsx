import React, { useEffect,useState } from 'react'
import Programstable from './partials/Programstable';
import Api from '@/js/api/Api'
import SideModal from '@/components/modal/sideModal';
import Viewprogram from './partials/Viewprogram';
import Modal from '@/components/modal/modal';

function Allprograms() {
    const [data, setData] = useState({});
    const [filters, setFilters] = useState({});
    const [fullUrl, setFullUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [viewById, setViewById] = useState({
        id: null
    })

    const getAllprograms = (url) => {
        setIsLoading(true)
        Api.get(url ?? '/programs/all')
            .then(res => {
                console.log(res.data)
                const { filters, full_url, programs } = res.data
                setData(programs)
                setFullUrl(full_url)
                setFilters(filters)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getAllprograms()
    }, [])
    return (
        <div>
            <SideModal
                title={`PROGRAM`}
                maxWidth='xl'
                open={Boolean(viewById?.id)}
                showClose={true}
                onClose={() => setViewById({ id: null })}
            >
                <Viewprogram
                    onClose={() => setViewById({ id: null })}
                    getData={getAllprograms}
                />
            </SideModal>
            <Programstable
                setViewById={setViewById}
                data={data}
                fullUrl={fullUrl}
                fetchData={getAllprograms}
                isLoading={isLoading}
                filters={filters}
            />
        </div>
    )
}

export default Allprograms