import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// TODO: get user id on registration and login

// TODO: getUserInfo function

const Dashboard = () => {

  const nimi = "Roosa"

  return (
    <main>
      <div className='page-title'>Tenttisovelluksen tietojen hallinta</div>
      <div>
        <h1>Hei {nimi}, tervetuloa opettajan käyttöliittymään!</h1>
        <p>Pääset muokkaamaan tenttejä ja oppilaiden tietoja, sekä katsomaan tenttituloksia alla olevista painikkeista.</p>
        <div className='dashboard-items'>
          <Link to="/opettaja/tentit"><button className='big-btn'>Muokkaa tenttejä</button></Link><br />
          <Link to="/opettaja/oppilaat"><button className='big-btn'>Muokkaa oppilaiden tietoja</button></Link><br />
          <Link to="/keskeneräinen"><button className='big-btn'>Tenttitulokset</button></Link>
        </div>
      </div>
    </main>
  )
}

export default Dashboard