import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// Tested errors: "Palvelin ei vastaa" and "Rekisteröityminen epäonnistui"

// TODO: Store token to localstorage

const USER_REGEX = /^(?=.*@)[A-z0-9-_@.]{3,49}$/;
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
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Virheellinen sähköpostiosoite tai salasana");
            return;
        }
// TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH! STORE TOKEN IN LOCAL STORAGE!
        try {
            console.log("USER:", user)
            console.log("PWD", pwd)
                const response = await axios.post('https://localhost:8080/api/signup',
                    // JSON.stringify({ user, pwd }), // OMG WHY???????????????
                    {
/*                         headers: { 'Content-Type': 'application/json' },
                        withCredentials: true, */
                        email: user,
                        password: pwd
                    }
                )
                console.log("RESPONSE =", response)

/*             const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ); */
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
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
                        <a href="https://i.pinimg.com/236x/11/c2/c8/11c2c8fc3c0678101a020aaabb898e63--tech-support-don-t-worry.jpg">Jatka sivulle</a>
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
                            4-50 kirjainta.<br />
                            Täytyy sisältää: @<br />
                            Sallitut merkit: kirjaimet, numerot, alaviivat, väliviivat, pisteet ja @.
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
                            Täytyy sisältää isoja ja pieniä kirjaimia, numeron ja erikoismerkin.<br />
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

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Luo tunnus</button>
                    </form>
                    <p>
                        Onko sinulla jo tunnukset?<br />
                        <span className="line">
                            <a href="https://i.pinimg.com/236x/11/c2/c8/11c2c8fc3c0678101a020aaabb898e63--tech-support-don-t-worry.jpg">Kirjaudu sisään</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register