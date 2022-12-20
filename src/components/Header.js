import logo from './images/logo192.png'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

// TODO: the header is lost upon refresh ??? !!!

function Header() {
  let { auth, setAuth } = useContext(AuthContext)
  console.log('Header.js, auth.role:', auth.role);
  console.log('Header.js, auth:', auth);
  let path
  if (auth.role == 2222 || auth.role == 1111) {
    path = '/opettaja/'
  } else if (auth.role == 1234) {
    path = '/'
  }

  const logout = () => {
    localStorage.clear()
    setAuth({})
  }

  return (
    <nav className="nav">
      <NavLink to="/"><img src={logo} alt="Logo" className="nav-logo" /></NavLink>
      <h3><NavLink className="nav-link" to="/">React App</NavLink></h3>
      {auth.user ? (
        <ul className="nav-items">
          < li >
            {auth.role == 1111 &&
              <NavLink className="nav-link" to="/oppilaat">Oppilaat</NavLink>}
          </li>
          <li>
            {auth.role == 1111 &&
              <NavLink className="nav-link" to="/opettajat">Henkilöstö</NavLink>}
          </li>
          < li >
            {auth.role == 2222 &&
              <NavLink className="nav-link" to="/oppilaat">Oppilaat</NavLink>}
          </li>
          <li>
            <NavLink className="nav-link" to={`${path}tentit`}>Tentit</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={`${path}hallintapaneeli`}>Hallintapaneeli</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/uloskirjautuminen" onClick={logout}>Kirjaudu ulos</NavLink>
          </li>
        </ul>
      ) : (
        < ul className="nav-items">
          < li >
            <NavLink className="nav-link" to="/kirjautuminen">Kirjaudu sisään</NavLink>
          </li>
          < li >
            <NavLink className="nav-link" to="/rekisteröinti">Rekisteröidy</NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Header