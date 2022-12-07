import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// TODO: get user id on registration and login

// TODO: getUserInfo function

const Dashboard = () => {

  const nimi = "Roosa"

  return (
    <Fragment>
      <div className='page-title'>Tenttisovelluksen tietojen hallinta</div>
      <ul>
        <h1>Hei {nimi}, tervetuloa opettajan käyttöliittymään!</h1>
        <p>Täällä voit hallita sovelluksen tietoja. Pääset muokkaamaan käyttäjiä, tenttejä, tenttien kysymyksiä ja<br />
          vastausvaihtoehtoja alla olevista napeista.</p>
        <Link to="/opettaja/tentit"><button className='big-btn'>Muokkaa tenttejä tästä</button></Link>
        <Link to="/opettaja/käyttäjät"><button className='big-btn'>Muokkaa käyttäjiä tästä</button></Link>
        {/*         <h3>Pääset muokkaamaan tenttejä, kysymyksiä ja vastausvaihtoehtoja <Link to="/opettaja/tentit">tästä</Link></h3>
        <h3>Pääset muokkaamaan käyttäjien tietoja <Link to="/opettaja/käyttäjät">tästä</Link></h3> */}

      </ul>
    </Fragment>
  )
}

export default Dashboard