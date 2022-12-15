import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const role = localStorage.getItem('role')
    console.log("RequireAuth.js, allowedRoles", allowedRoles)
    console.log("RequireAuth.js, auth", auth) // Undefined, fix ???
    console.log("RequireAuth.js, role", role)
    // const location = useLocation

    return (
        // auth?.user
        // auth.role.find(userRole => allowedRoles?.includes(userRole))
        allowedRoles?.includes(role)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/pääsy-evätty" replace={true} />
                : <Navigate to="/kirjautuminen" replace={true} /* state={{ from: location }} replace */ />
    )
}

export default RequireAuth