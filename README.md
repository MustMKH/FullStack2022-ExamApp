# Tenttisovellus

React sovellus, jossa opettajat voivat luoda ja muokata tenttejä ja oppilaat voivat tehdä tenttejä. Full Stack 2022 ohjelmistosuunnittelukoulutuksen projektisovellus.

## Kuvia sovelluksesta

### Rekisteröityminen

![Registration Form](https://user-images.githubusercontent.com/114909607/209111686-d31c6717-4bce-4d36-bda2-fd3e1960700d.gif)

![Rekisteröityminen](https://user-images.githubusercontent.com/114909607/209115561-b79f8310-e9fe-4daa-b22a-da2991db8333.png)

### Kokeen muokkaaminen

![Editing Exams](https://user-images.githubusercontent.com/114909607/209111800-fff823ec-62c5-471a-aac3-81d88b596eb5.gif)

![Tenttilista](https://user-images.githubusercontent.com/114909607/209115651-91fe3f76-381a-44b3-8dd8-efad97bffb28.png)

![Tentin muokkaus](https://user-images.githubusercontent.com/114909607/209115683-4065b112-27f9-476a-b831-93dfa68869d9.png)

### Kokeen tekeminen

![Taking an Exam](https://user-images.githubusercontent.com/114909607/209111886-5ab2a582-29e0-4980-afd9-b25660cd793e.gif)

![Oppilaan näkymä](https://user-images.githubusercontent.com/114909607/209115439-7bcf02d9-227e-4555-b447-ea9f71cfa7e0.png)

![Tentin suorittaminen](https://user-images.githubusercontent.com/114909607/209115729-713dab00-f356-488b-bb86-36ac8518bd7e.png)

## Toteutukseen käytetyt teknologiat:

React, JavaScript, CSS, HTML, PostgreSQL, Node.js, Express.js, REST

### Viimeisimmät muutokset uusimmasta vanhimpaan

- Luotu käyttäjäryhmien mukaan mukautuva Navigation Bar
- Luotu Unauthorized, Not Found ja Login Required komponentit
- Lisätty opettajan käyttöliittymään tenttien hakutoiminto
- Luotu toiminto, joka tallentaa tietokantaan kopion muokatusta kokeesta koetilannetta varten
- Luotu React Router Domin avulla polut sovelluksen eri osioihin suojauksineen
- Token tallentuu Local Storageen kirjautumisen ja rekisteröitymisen yhteydessä.
- Luotu React sovellukseen kirjautumistoiminto.
- Luotu React sovellukseen rekisteröintitoiminto. Käyttäjätunnukset ja salatut salasanat tallentuvat tietokantaan.
- Luotu salattu palvelin.
- Luotu PostreSQL relaatiotietokanta, johon sovelluksen data tallentuu.
- Luotu Express palvelin, jossa on 'get', 'post', 'put' ja 'delete' toiminnot tiedon hakua, muokkaamista ja tallennusta varten.
