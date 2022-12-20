import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const userRole = auth.role
    console.log("RequireAuth.js, allowedRoles", allowedRoles)
    console.log("RequireAuth.js, auth", auth) // Undefined, fix ???
    console.log("RequireAuth.js, userRole", userRole)
    // const location = useLocation

    const isAuthorized = () => {
        console.log('RequireAuth.js, allowedRoles:', allowedRoles, 'auth.role:', auth.role)
        if (allowedRoles.includes(userRole)) return true
        else return false
    }

    const isAuthenticated = () => {
        if (auth.user) return true
        else return false
    }

    return (
        // allowedRoles?.includes(auth?.role)
        // auth?.user
        isAuthorized
            // allowedRoles?.includes(role)
            ? <Outlet />
            // : auth?.user
            : isAuthenticated
                ? <Navigate to="/pääsy-evätty" replace={true} />
                : <Navigate to="/kirjautuminen" replace={true} /* state={{ from: location }} replace */ />
    )
}

export default RequireAuth