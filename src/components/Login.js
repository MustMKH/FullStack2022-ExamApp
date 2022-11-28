// import e from 'cors';
import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const LOGIN_URL = 'https://localhost:8080/api/login'

function Login() {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (event) => {
        // This prevents the default behavior of the form, which would reload the page
        event.preventDefault();

        try {
/*             console.log("Login.js, handleSubmit, user:", user)
            console.log("Login.js, handleSubmit, pwd:", pwd) */
            const response = await axios.post(LOGIN_URL,
                // JSON.stringify({user, pwd}),
                {
/*                     headers: { 'Content-Type': 'application/json' },
                    withCredentials: true */
                    email: user,
                    password: pwd
                }
            );
/*             console.log("Login.js, handleSubmit, response:", response)
            console.log("Login.js, handleSubmit, response.data:", response.data)
            console.log("Login.js, handleSubmit, response.data.data:", response.data.data)
            console.log("Login.js, handleSubmit, response.data.data.token:", response.data.data.token) */
            localStorage.setItem("token", response?.data?.data?.token)

            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg('Palvelin ei vastaa');
            } else if (error.response?.status === 400) {
                setErrMsg('Käyttäjänimi tai salasana puuttuu');
            } else if (error.response?.status === 401) {
                setErrMsg('Ei oikeutta palveluun');
            } else {
                setErrMsg('Virheellinen käyttäjänimi tai salasana')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="login-form">
            {success ? (
                <section>
                    <h1>Kirjautuminen onnistui.</h1>
                    <br />
                    <p>
                        <a href="http://localhost:3000/hallintapaneeli">Jatka sivulle tästä.</a>
                    </p>
                </section>
            ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Kirjaudu sisään</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Käyttäjätunnus:</label>
            <input
                className="form-input"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(event) => setUser(event.target.value)}
                value={user}
                required
            />
            <label htmlFor="pwd">Salasana:</label>
            <input
                className="form-input"
                type="password"
                id="password"
                onChange={(event) => setPwd(event.target.value)}
                value={pwd}
                required
            />
            {/* No validation settings here like in the registration form, because we don't want to provide any hints */}
            <button className="login-btn">Kirjaudu</button>
        </form>
        <p>
            Ei vielä tiliä? Rekisteröidy <a href="http://localhost:3000/rekisteröinti">tästä</a>.<br />
        </p>
    </section>
    )}
     </div>
  )
}

export default Login
