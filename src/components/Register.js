import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// TODO: add first name and last name to the registration form

// Tested errors: "Palvelin ei vastaa" and "Rekisteröityminen epäonnistui"

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://localhost:8080/api/signup';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevents the page from refreshing
        // Add a dispatch here? -Register initiated, etc. see example from rest api app
        // if button enabled with JS hack:
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Virheellinen sähköpostiosoite tai salasana");
            return;
        }
        try {
            console.log("Register.js, handleSubmit, user:", user)
            console.log("Register.js, handleSubmit, pwd:", pwd)
                const response = await axios.post(REGISTER_URL,
                    // JSON.stringify({ user, pwd }),
                    {
                        /* These are not needed, because the headers are set in routes.js and queries.js
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true, */
                        email: user,
                        password: pwd
                    }
                )

/*             console.log("Register.js, handleSubmit, response.data:", response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response)) */
            console.log("Register.js, handleSubmit, response:", response)
            console.log("Register.js, handleSubmit, response.data:", response.data)
            console.log("Register.js, handleSubmit, response.data.data:", response.data.data)
            console.log("Register.js, handleSubmit, response.data.data.token:", response.data.data.token)
            localStorage.setItem("token", response?.data?.data?.token)
            setSuccess(true);
            // Clearing state and controlled inputs (the value attribute on inputs is needed for this)
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Palvelin ei vastaa');
            } else if (err.response?.status === 409) {
                setErrMsg('Käyttäjätunnus varattu');
            } else {
                setErrMsg('Rekisteröityminen epäonnistui')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="register-form">
            {success ? (
                <section>
                    <h1>Kirjautuminen onnistui!</h1>
                    <p>
                        <a href="http://localhost:3000/hallintapaneeli">Jatka sivulle</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Rekisteröidy</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Sähköpostiosoite:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(event) => setUser(event.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Syötä hyväksyttyä muotoa oleva sähköpostiosoite.
                        </p>


                        <label htmlFor="password">
                            Salasana:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8-24 kirjainta.<br />
                            Salasanan täytyy sisältää: isoja ja pieniä kirjaimia, numero ja erikoismerkki.<br />
                            Sallitut erikoismerkit: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Vahvista salasana:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="confirm_pwd"
                            onChange={(event) => setMatchPwd(event.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Salasanojen täytyy täsmätä.
                        </p>
                        {/* No onClick even required for the button below, because it is the only button in the form, submit event triggered instead*/}
                        <button className="login-btn" disabled={!validName || !validPwd || !validMatch ? true : false}>Luo tunnus</button>
                    </form>
                    <p>
                        Onko sinulla jo tunnukset?<br />
                        <span className="line">
                            <a href="http://localhost:3000/kirjautuminen">Kirjaudu sisään</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register