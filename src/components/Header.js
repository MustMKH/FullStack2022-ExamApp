function Header() {
  return (
    <header>
      <nav className="nav">
        <img src="./logo192.png" alt="React Logo" className="nav-logo" />
        <h3>React App</h3>
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