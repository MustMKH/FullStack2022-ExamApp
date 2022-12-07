// import e from 'cors';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
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
                        <Link to="/opettaja/hallintapaneeli">Jatka sivulle tästä.</Link>
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
                            autoComplete="on"
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="pwd">Salasana:</label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />
                        {/* No validation settings here like in the registration form, because we don't want to provide any hints */}
                        <button className="login-btn">Kirjaudu</button>
                    </form>
                    <p>
                        Ei vielä tiliä? Rekisteröidy <Link to="/rekisteröinti">tästä</Link>.<br />
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login
