import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

// TODO: auth is currently an empty object !!!

const StudentDashboard = () => {
    const { auth } = useContext(AuthContext)
    let firstName = auth.user ? ((auth.user).split('@')[0]).split('.')[0] : "oppilas"
    let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

    return (
        <main>
            <div className='page-title'>Tenttisovelluksen tietojen hallinta</div>
            <div className='main-title'>Hei {capitalizedFirstName}!</div>
            <h3>Pääset muokkaamaan käyttäjätietojasi sekä katsomaan tenttituloksia alla olevista painikkeista.</h3>
            <div className='dashboard-items'>
                <Link to="/keskeneräinen"><button className='small-btn'>Muokkaa käyttäjätietojasi</button></Link>
                <Link to="/keskeneräinen"><button className='small-btn'>Katsele tenttituloksiasi</button></Link>
                <Link to="/keskeneräinen"><button className='small-btn'>Ilmottaudu tenttiin</button></Link>
            </div>

            <div className='main-title'>Sinulla on 1 suorittamaton tentti:</div>
            <Link to='/tentit/50' ><button className='big-btn'>Höpölöpön alkeet</button></Link>
        </main>
    )
}

export default StudentDashboard