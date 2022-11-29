import React, { Fragment, useState, useEffect } from 'react'

// TODO: get user id on registration and login, store in local storage?

const Dashboard = ({ setAuth }) => {

  const [name, setName] = useState("")

  async function getUserInfo() {
    try {

    } catch (error) {

    }
  }

  return (
    <Fragment>
      <h3>Tenttisovelluksen tietojen hallinta</h3>
      <ul>
        <li>
          Pääset muokkaamaan tenttejä, kysymyksiä ja vastausvaihtoehtoja <a href="http://localhost:3000/opettaja/tentit">tästä</a>.
        </li>
        <li>
          Pääset muokkaamaan käyttäjien tietoja <a href="http://localhost:3000/opettaja/käyttäjät">tästä</a>.
        </li>
      </ul>
    </Fragment>
  )
}

export default Dashboard