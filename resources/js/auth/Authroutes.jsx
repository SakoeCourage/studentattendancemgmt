import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from './Authcontext';
import { Navigate } from "react-router-dom";

function Authroutes() {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }

}

export default Authroutes