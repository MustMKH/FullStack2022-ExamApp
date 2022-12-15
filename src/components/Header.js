import logo from './images/logo192.png'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className="nav">
      <NavLink to="/"><img src={logo} alt="Logo" className="nav-logo" /></NavLink>
      <h3><NavLink className="nav-link" to="/">React App</NavLink></h3>
      <ul className="nav-items">
        <li>
          <NavLink className="nav-link" to="/opettaja/tentit">Tentit</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/opettaja/oppilaat">Oppilaat</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/opettaja/hallintapaneeli">Hallintapaneeli</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/kirjautuminen">Kirjautuminen</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Header