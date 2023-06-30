import React from 'react'
import { NavLink } from 'react-router-dom'

function SidebarLinkonly({link,title,isActive,icon}) {
    return (
        <NavLink
            to={`${link}`}
            className={(props) =>
                props.isActive
                    ? "flex items-center gap-3 px-6 py-3  text-indigo-400 "
                    : "flex items-center gap-3 px-6 py-3 "
            }
        >
            {icon}
            <span className="text-sm"> {title}</span>
        </NavLink>
    )
}

export default SidebarLinkonly