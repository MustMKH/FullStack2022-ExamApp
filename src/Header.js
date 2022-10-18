function Header() {
    return (
      <header>
        <nav className="nav">
          <img src="./reactlogo.png" alt="React Logo" className="nav-logo" />
          <h3>React App</h3>
            <ul className="nav-items">
              <li>Tentit</li>
              <li>Tietoa sovelluksesta</li>
              <li>Yhteystiedot</li>
            </ul>
        </nav>
      </header>
    )
  }

  export default Header 