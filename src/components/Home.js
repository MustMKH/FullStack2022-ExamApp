import { Fragment } from 'react'

const Home = () => {
  return (
    <Fragment >
      <div >
        <div className='page-title'>Tervetuloa tenttisovellukseen!</div>
        <div className='info'>
          <h2>
            <div>Näet suoritettavat tenttisi ja niiden ajankohdan <a href="http://localhost:3000/hallintapaneeli">hallintapaneelista</a>.</div>
            Sieltä pääset myös suorittamaan tenttiä ja näet suoritettujen tenttien tulokset.<br />
            Jotta voit osallistua tentteihin, sinun tulee kirjautua sisään järjestelmään. <br />
          </h2>
          <h3>Onko sinulla jo käyttäjätunnus? Kirjaudu sisään <a href="http://localhost:3000/kirjautuminen">tästä</a>.</h3>
          <h3>Jos sinulla ei ole käyttäjätunnusta, rekisteröidy <a href="http://localhost:3000/rekisteröinti">tästä</a>.</h3>
          <h4>Huomaathan, että luotuasi käyttäjätilin, tenttisi tulevat näkyviin viiveellä.</h4>
        </div>
      </div>
    </Fragment>
  )
}

export default Home