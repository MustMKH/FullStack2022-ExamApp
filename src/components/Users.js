import { useState, useEffect } from 'react'
import axios from 'axios'

const USERS_URL = 'https://localhost:8080/api/users'

const Users = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        let isMounted = true
        let token = localStorage.getItem('token')
        console.log("Users.js, Users, useEffect, token:", token)
        // const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await axios.get(USERS_URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                console.log("Users.js, Users, useEffect, getUsers, response:", response)
                console.log("Users.js, Users, useEffect, getUsers, response.data:", response.data)
                // is mounted???
                isMounted && setUsers(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        getUsers()

        return () => {
            isMounted = false
            // controller.abort()
        }
    }, [])


    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}> {user?.id} {user?.email} {user?.role}</li>)}
                    </ul>
                ) : <p>No users to display</p>}
        </article>
    )
}

export default Users