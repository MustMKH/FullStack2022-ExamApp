import logo from './images/logo192.png'
// import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav className="nav">
        {/*         <Link to="/"><img src={logo} alt="Logo" className="nav-logo" /></Link>
        <h3><Link className="nav-link" to="/">React App</Link></h3>
        <ul className="nav-items">
          <li>
            <Link className="nav-link" to="/">Tietoa sovelluksesta</Link>
          </li>
          <li>
            <Link className="nav-link" to="/opettaja/hallintapaneeli">Hallintapaneeli</Link>
          </li>
          <li>
            <Link className="nav-link" to="/kirjautuminen">Kirjautuminen</Link>
          </li>
        </ul> */}
        <a href="http://localhost:3000/"><img src={logo} alt="Logo" className="nav-logo" /></a>
        <h3><a className="nav-link" href="http://localhost:3000/">React App</a></h3>
        <ul className="nav-items">
          <li>
            <a className="nav-link" href="http://localhost:3000/">Tietoa sovelluksesta</a>
          </li>
          <li>
            <a className="nav-link" href="http://localhost:3000/opettaja/hallintapaneeli">Hallintapaneeli</a>
          </li>
          <li>
            <a className="nav-link" href="http://localhost:3000/kirjautuminen">Kirjautuminen</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header