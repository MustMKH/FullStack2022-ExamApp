import { useState, useEffect } from 'react'
import dataService from '../service/dataService'

const USERS_URL = 'https://localhost:8080/api/users'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        let isMounted = true
        // const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await dataService.getUsers()
                console.log("Users.js, Users, useEffect, getUsers, response:", response)
                isMounted && setUsers(response)
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

    const getName = (email) => {
        let firstName = ((email).split('@')[0]).split('.')[0]
        let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        /* console.log("Users.js, getName, firstName", firstName)
        console.log("Users.js, getName, capitalizedFirstName", capitalizedFirstName) */
        let lastName = ((email).split('@')[0]).split('.')[1]
        let capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        /* console.log("Users.js, getName, lastName", lastName)
        console.log("Users.js, getName, capitalizedLastName", capitalizedLastName) */
        return (`${capitalizedFirstName} ${capitalizedLastName}`)
    }

    return (
        <main>
            <div className='page-title'>
                Oppilaat
            </div>
            <div className='sub-title'> Oppilaita kirjoilla: {users?.length || 0} kpl</div>
            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tunnus</th>
                            <th>Nimi</th>
                            <th>Sähköpostiosoite</th>
                            {/* <th>Role</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) =>
                            <tr key={i}>
                                <td>{user?.id}</td>
                                <td>{getName(user.email)}</td>
                                <td>{user?.email}</td>
                                {/* <td>{user?.role}</td> */}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </main >
    )
}

export default Users