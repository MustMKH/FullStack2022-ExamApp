import { Fragment } from 'react'

const Home = () => {
  return (
    <Fragment >
        <div className='info'>
            <h1>Tervetuloa tenttisovellukseen!</h1>
            <h3>
                Näet suoritettavat tenttisi ja niiden ajankohdan <a href="http://localhost:3000/hallintapaneeli">hallintapaneelista</a>.<br />
                Sieltä pääset myös suorittamaan tenttiä ja näet suoritettujen tenttien tulokset.<br />
                Jotta voit osallistua tentteihin, sinun tulee kirjautua sisään järjestelmään. <br />
                Huomaathan, että luotuasi käyttäjätilin, tenttisi tulevat näkyviin viiveellä. <br />
            </h3>
            <h4>Onko sinulla jo käyttäjätunnus? Kirjaudu sisään <a href="http://localhost:3000/kirjautuminen">tästä</a>.</h4>
            <h4>Jos sinulla ei ole käyttäjätunnusta, rekisteröidy <a href="http://localhost:3000/rekisteröinti">tästä</a>.</h4>
        </div>
    </Fragment>
  )
}

export default Home