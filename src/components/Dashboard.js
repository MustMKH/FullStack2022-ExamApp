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
      <div className='page-title'>Tenttisovelluksen tietojen hallinta</div>
      <ul>
        <h3>Pääset muokkaamaan tenttejä, kysymyksiä ja vastausvaihtoehtoja <a href="http://localhost:3000/opettaja/tentit">tästä</a>.</h3>
        <h3>Pääset muokkaamaan käyttäjien tietoja <a href="http://localhost:3000/opettaja/käyttäjät">tästä</a>.</h3>
      </ul>
    </Fragment>
  )
}

export default Dashboard