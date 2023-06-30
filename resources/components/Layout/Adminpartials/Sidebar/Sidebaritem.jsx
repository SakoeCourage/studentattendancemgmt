import { NavLink, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from 'react'
import { Icon } from "@iconify/react";

export default function Sidebaritem(props) {
    const [isColapsed, setisColapsed] = useState(false)
    const [isIncurrentRoute, setisIncurrentRoute] = useState(false)
    const [scrollHeight,setScrollHeight] = useState(0)
    const location = useLocation()
    let listitems = useRef(null)
    const newScrollHeight=() =>{
        setScrollHeight(listitems.current.scrollHeight)
    } 

    // useEffect(()=>{
    //     if(isColapsed){
    //         listitems.current.style.height = 0
    //     }else{
    //         listitems.current.style.height = `${scrollHeight}px`
    //     }
    // },[isColapsed])

    useEffect(() => {
        newScrollHeight()
        let checkisIncurrentRoute = Object.values(props.links).map((value) => value.link).some(value => value == location.pathname)
        setisIncurrentRoute(checkisIncurrentRoute)   
        if(checkisIncurrentRoute){
            setisColapsed(false)
        }                      
    }, [location.pathname])
    return (
        <div className=" overflow-hidden ">
            <nav className={` px-6 py-3 flex items-center justify-between cursor-pointer transition-all duration-200  ${isIncurrentRoute && 'text-indigo-400'} `} onClick={() => setisColapsed(!isColapsed)}>
                <span className="flex items-center gap-3  ">
                    {props.icon}
                    <span className=" sentence text-sm">{props.title}</span>
                </span>
                <Icon icon="ic:round-arrow-drop-down"  className={` transfrom transition-transform justify-self-end ml-3  ${!isColapsed && ' rotate-180'}`} />
            </nav>
            <ul ref={listitems} className={`overflow-hidden transition-[height] duration-200 bg-gray-400/10  `}>
                {props.links.map((link, i) =>
                    <li key={i} className='py-1 flex  '>

                        <NavLink
                            to={link.link}
                            className={(props) =>
                                props.isActive
                                    ? " flex item-center   gap-1 hover:bg-gray-500/10    text-sm py-2   pl-7  text-indigo-400 rounded-md w-full"
                                    : "flex item-center   gap-1 hover:bg-gray-500/10   text-sm py-2  pl-7 w-full "
                                }
                        >
                           <nav className=" grid place-items-center  h-full">
                           <Icon icon="ic:round-arrow-right" />
                           </nav>
                            <span>  {link.title}</span>
                        </NavLink>
                    </li>
                )}
            </ul>
            

        </div>
    );
}
