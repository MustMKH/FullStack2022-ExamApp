import e from 'cors';
import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider"

import axios from '../api/axios';
const LOGIN_URL = '/auth'

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // replace with React router to the page of our choice:
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    const handleSubmit = async (event) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });
            setUser('');
            setPassword('');
            setSuccess(true);
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Kirjautuminen onnistui.</h1>
                    <br />
                    <p>
                        <a href="#">Jatka sivulle tästä.</a>
                    </p>
                </section>
            ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" :
        "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Kirjaudu sisään</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Käyttäjätunnus:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(event) => setUser(event.target.value)}
                value={user}
                required
            />
            <label htmlFor="password">Salasana:</label>
            <input
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                required
            />
            <button>Kirjaudu</button>
        </form>
        <p>
            Ei vielä tiliä? Rekisteröidy tästä.<br />
            <span>
                {/* put react router link here */}
                <a href="#">Rekisteröidy</a>
            </span>
        </p>
    </section>
    )}
     </>
  )
}

export default Login
