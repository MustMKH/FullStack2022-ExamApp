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
      <h1>Sinulla ei ole tenttejä.</h1>
    </Fragment>
  )
}

export default Dashboard