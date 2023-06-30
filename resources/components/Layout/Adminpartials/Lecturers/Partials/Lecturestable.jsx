import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { TablePagination, Tooltip, Zoom, Card } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { dateReformat, formatnumber, addOrUpdateUrlParam } from '@/js/api/Util';
import Loadingwheel from '@/components/Loaders/Loadingwheel';
import Api from '@/js/api/Api';
import FormInputSelect from '@/components/inputs/FormInputSelect';
import Button from '@/components/inputs/Button';


function Lecturestable({ data, isLoading, fetchData, filters, fullUrl, setViewById }) {
    const [searchKey, setSearchKey] = useState('')

    const handleChangePage = (event, newPage) => {
        if ((newPage + 1) > data.current_page) {
            fetchData(data.next_page_url)
        } else {
            fetchData(data.prev_page_url)
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    const handleSearch = () => {
        searchKey && fetchData(addOrUpdateUrlParam(fullUrl, 'search', searchKey))
    }

    return (
        <div>
            <nav>
            </nav>
            <Card className='py-6'>
                <div className="flex flex-col w-full min-h-[36rem] h-max relative ">
                    <div className="flex items-center gap-3 w-full justify-end lg: px-10">
                        <div className='border rounded-lg flex items-center justify-between !w-96'>
                            <input onKeyDown={(e) => { e.key === 'Enter' && handleSearch() }} className='bg-transparent outline-none px-4 w-full' placeholder='Search by first or last name' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="search" />
                            <button onClick={() => handleSearch()} className='bg-gray-300 px-3 py-2 grid place-content-center text-gray-600'>
                                <Icon icon="ic:round-search" fontSize={30} />
                            </button>
                        </div>
                        {filters?.search != null && <Button
                            onClick={() => { setSearchKey(''); fetchData() }}
                            text="reset"
                        />}
                    </div>
                    <div className="flex flex-col  overflow-hidden w-full">
                        <div className="flex-auto p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full overflow-hidden">
                                    <thead className="bg-secondary-200 ">
                                        <tr>
                                            <th className="px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold ">
                                                Date modified
                                            </th>
                                            <th className="px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold ">
                                                Fist Name
                                            </th>
                                            <th className="px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold ">
                                                Last Name
                                            </th>
                                            <th className="px-6 py-3 text-left rtl:text-right  whitespace-nowrap font-semibold ">
                                                Action
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary-200 ">
                                        {data?.data && data?.data.map((x, i) => {
                                            return (
                                                <tr
                                                    key={i}
                                                    className={`${i % 2 !== 0 && 'bg-secondary-100 '
                                                        }`}
                                                >

                                                    <td className="px-6 py-2 !text-xs whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <h6 className="mb-0  ">
                                                                {dateReformat(x.created_at)}
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-2 !text-xs whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <h6 className="mb-0  ">
                                                                {x.first_name}
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-2 !text-xs whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <h6 className="mb-0  ">
                                                                {x.last_name}
                                                            </h6>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-2 !text-xs flex items-center gap-2 whitespace-nowrap">
                                                        <Tooltip title="Edit Data" arrow TransitionComponent={Zoom}>
                                                            <span
                                                                onClick={() => setViewById({ id: x.id })}
                                                                className=" p-1 rounded-full border border-gray-400/70 active:border-gray-400/40 text-red-900   text-sm font-semibold leading-5  hover:cursor-pointer"
                                                            >
                                                                <Icon className='' icon="mdi:database-edit-outline" fontSize={20} />
                                                            </span>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {isLoading && <Loadingwheel />
                                }
                            </div>
                        </div>
                    </div>
                    <TablePagination className=" !mt-auto "
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={data?.total ?? 0}
                        rowsPerPage={data?.per_page ?? 0}
                        page={(data?.current_page - 1) ?? 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </div>
            </Card>
        </div>
    )
}

export default Lecturestable