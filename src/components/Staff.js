import { useState, useEffect } from 'react'
import dataService from '../service/dataService'

const STAFF_URL = 'https://localhost:8080/api/staff'

const Staff = () => {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        let isMounted = true
        // const controller = new AbortController()

        const getStaff = async () => {
            try {
                const response = await dataService.getStaff()
                console.log("Staff.js, Staff, useEffect, getStaff, response:", response)
                isMounted && setStaff(response)
            } catch (error) {
                console.error(error)
            }
        }

        getStaff()

        return () => {
            isMounted = false
            // controller.abort()
        }
    }, [])

    const getName = (email) => {
        let firstName = ((email).split('@')[0]).split('.')[0]
        let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
        /* console.log("Staff.js, getName, firstName", firstName)
        console.log("Staff.js, getName, capitalizedFirstName", capitalizedFirstName) */
        let lastName = ((email).split('@')[0]).split('.')[1]
        let capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        /* console.log("Staff.js, getName, lastName", lastName)
        console.log("Staff.js, getName, capitalizedLastName", capitalizedLastName) */
        return (`${capitalizedFirstName} ${capitalizedLastName}`)
    }

    return (
        <main>
            <div className='page-title'>
                Henkilökunta
            </div>
            <div className='sub-title'> Henkilöstön määrä: {staff?.length || 0} kpl</div>
            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tunnus</th>
                            <th>Nimi</th>
                            <th>Sähköpostiosoite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((member, i) =>
                            <tr key={i}>
                                <td>{member?.id}</td>
                                <td>{getName(member.email)}</td>
                                <td>{member?.email}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </main >
    )
}

export default Staff