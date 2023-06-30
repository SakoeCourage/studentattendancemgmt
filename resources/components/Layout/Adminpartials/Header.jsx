import React, { useState, useContext } from 'react'
import profilepic from '../../../../public/images/profilepic.jpg'
import { SidebarContext } from '../context/SidebarContext';
import { Icon } from '@iconify/react';
export default function Header() {
    const [isDropped, setisDropped] = useState(false)
    const { setShowsidebar } = useContext(SidebarContext)
    return (
        <div className='relative ' id='header'>
            <div className='flex justify-between  px-5 py-2'>
                <button className='text-primaryindigo bg-transparent' onClick={() => { setShowsidebar((value) => !value) }}>
                <Icon icon="flat-color-icons:menu" />
                </button>
                <nav className=' flex items-center gap-3'> <span className=' order-2 flex flex-col'>
                    <span>Isaac Kyei</span>
                    <span className='text-xs text-gray-400'>Admin</span>
                </span>
                    <img className='h-8 w-8 aspect-square object-cover rounded-full order-1' src={profilepic} alt="" />
                <Icon icon="ic:round-arrow-drop-down" onClick={() => setisDropped(!isDropped)} className='order-3 cursor-pointer bg-gray-500 text-white h-2 w-2 p-1 rounded-full'  />
                </nav>
            </div>
            {isDropped && <span className='absolute right-14 bg-white py-4 shadow-md px-4' >
                <ul>
                    <li className='flex gap-2 items-center'><Icon icon="basil:logout-solid" /><span>logout </span></li>
                </ul>
            </span>}
        </div>
    )
}
