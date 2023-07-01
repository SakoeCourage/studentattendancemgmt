import React, { useState, useContext } from 'react'
import profilepic from '../../../../public/images/profilepic.jpg'
import { SidebarContext } from '../context/SidebarContext';
import { Icon } from '@iconify/react';
import { useAuth } from '@/js/auth/Authcontext';
export default function Header() {

    const { logout } = useAuth()
    const [isDropped, setisDropped] = useState(false)
    const { setShowsidebar } = useContext(SidebarContext)
    return (
        <div className='relative  ' id='header'>
            <div className='flex justify-between  px-5 py-2'>
                <button className='text-primaryindigo bg-transparent' onClick={() => { setShowsidebar((value) => !value) }}>
                    <Icon icon="flat-color-icons:menu" />
                </button>
                <nav className=' flex items-center gap-3'> <span className=' order-2 flex flex-col'>
                    <span>Administrator</span>
                    <span className='text-xs text-gray-400'>Admin</span>
                </span>
                    <nav className='h-8 w-8 aspect-square object-cover rounded-full order-1 font-bold bg-blue-400 grid place-items-center text-blue-50'>
                        A
                    </nav>
                    <button onClick={()=>logout()} className='flex gap-2 items-center order-3 cursor-pointer bg-info-500 p-2 text-white  rounded-full'>
                        <Icon icon="basil:logout-solid" /><span className=' text-sm'>logout </span></button>
                </nav>
            </div>
            {/* {isDropped && <span className='fixed right-14 bg-white py-4 shadow-md px-4 z-50  ' >
                <ul onClick={()=>logout()} className=' cursor-pointer z-50'>
                    
                </ul>
            </span>} */}
        </div>
    )
}
