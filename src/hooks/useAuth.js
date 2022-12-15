import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    console.log("useAuth.js, AuthContext", AuthContext)
    console.log("useAuth.js, useContext(AuthContext)", useContext(AuthContext))
    return useContext(AuthContext)
}

export default useAuth