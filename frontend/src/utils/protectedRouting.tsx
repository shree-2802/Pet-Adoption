import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
export type ProtectedRoutingType = {
    isAuthenticated: boolean
}
const ProtectedRouting = ({ isAuthenticated }: ProtectedRoutingType) => {
    const location = useLocation();
    console.log(isAuthenticated)
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    )
}

export default ProtectedRouting
