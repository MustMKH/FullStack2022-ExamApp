import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const Dashboard = () => {

  const { auth } = useContext(AuthContext)

  let firstName = auth.user ? ((auth.user).split('@')[0]).split('.')[0] : "opettaja"
  let capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return (
    <main>
      <div className='page-title'>Tenttisovelluksen tietojen hallinta</div>
      <div>
        <div className='main-title'>Hei {capitalizedFirstName}, tervetuloa opettajan käyttöliittymään!</div>
        <h4>Pääset muokkaamaan tenttejä ja oppilaiden tietoja, sekä katsomaan tenttituloksia alla olevista painikkeista.</h4>
        <div className='dashboard-items'>
          <Link to="/opettaja/tentit"><button className='big-btn'>Muokkaa tenttejä</button></Link><br />
          <Link to="/keskeneräinen"><button className='big-btn'>Tenttitulokset</button></Link><br />
          <Link to="/oppilaat"><button className='big-btn'>Muokkaa oppilaiden tietoja</button></Link><br />
          {auth.role == 1111 && <div className='dashboard-items'><Link to="/opettajat"><button className='big-btn'>Muokkaa opettajien tietoja</button></Link><br /></div>}
        </div>
      </div>
    </main>
  )
}

export default Dashboard