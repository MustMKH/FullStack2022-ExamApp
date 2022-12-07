import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

const USERS_URL = 'https://localhost:8080/api/users'

/* const Users = [
    {
        id: 1,
        selected: false,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
    },
    {
        id: 2,
        selected: false,
        name: "Ervin Howell",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
    }
]; */

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
        <div>
            <div className='page-title'>Users List</div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            // checked={this.state.MasterChecked}
                                            id="mastercheck"
                                        />
                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ORIGINAL:
                            {users?.length
                                ? (
                                    <ul className='user-list'>
                                        {users.map((user, i) => <li key={i}> {user?.id} {user?.email} {user?.role}</li>)}
                                    </ul>
                                ) : <p>No users to display</p>} */}
                                {users.map((user, i) => (
                                    <tr key={i}> {user?.id} {user?.email} {user?.role})
                                        <th scope="row">
                                            <input
                                                type="checkbox"
                                                // checked={user.selected}
                                                className="form-check-input"
                                                id="rowcheck{user.id}"
                                            />
                                        </th>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            className="btn btn-primary"
                        >
                            Get Selected Items
                        </button>
                        <div className="row">
                            <b>All Row Items:</b>
                            <code>JSON</code>
                        </div>
                        <div className="row">
                            <b>Selected Row Items(Click Button To Get):</b>
                            <code>JSON</code>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p><Link className='router-link' to='/opettaja/hallintapaneeli'>Takaisin hallintapaneeliin</Link></p>
                <p><Link className='router-link' to='/opettaja/tentit'>Siirry muokkaamaan tenttejä</Link></p>
            </div>
        </div >
    )
}

export default Users