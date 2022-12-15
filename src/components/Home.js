import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main >
      <div >
        <div className='page-title'>Tervetuloa tenttisovellukseen!</div>
        <div className='info'>
          <h2>
            <div>Näet suoritettavat tenttisi ja niiden ajankohdan <Link to="/opettaja/hallintapaneeli">hallintapaneelista</Link>.</div>
            Sieltä pääset myös suorittamaan tenttiä ja näet suoritettujen tenttien tulokset.<br />
            Jotta voit osallistua tentteihin, sinun tulee kirjautua sisään järjestelmään. <br />
          </h2>
          <h3>Onko sinulla jo käyttäjätunnus? Kirjaudu sisään <Link to="/kirjautuminen">tästä</Link>.</h3>
          <h3>Jos sinulla ei ole käyttäjätunnusta, rekisteröidy <Link to="/rekisteröinti">tästä</Link>.</h3>
          <h4>Huomaathan, että luotuasi käyttäjätilin, tenttisi tulevat näkyviin viiveellä.</h4>
        </div>
      </div>
    </main >
  )
}

export default Home