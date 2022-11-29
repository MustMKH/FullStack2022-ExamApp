import { useState, useEffect } from 'react'
import axios from 'axios'

const EXAMS_URL = 'https://localhost:8080/api/exams'

const Exams = (dispatch) => {
    const [exams, setExams] = useState()

    useEffect(() => {
        let isMounted = true
        let token = localStorage.getItem('token')
        console.log("Exams.js, Exams, useEffect, token:", token)

        const getExams = async () => {
            try {
                /* dispatch({ type: 'INIT_DATA', payload: response.data }); */
                const response = await axios.get(EXAMS_URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                console.log("Exams.js, Exams, useEffect, getExams, response:", response)
                console.log("Exams.js, Exams, useEffect, getExams, response.data:", response.data)
                setExams(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        getExams()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <article>
            <h1 className='page-title'>Tentit</h1>
            <div className='exams'>
                {exams?.length
                    ? (
                        <ol className='exam-items'>
                            {exams.map((exam, i) => <li><button id="big-button"> Tentti {i + 1}: {exam?.title}</button></li>)}
                            <li><button id="big-button" onClick={() => dispatch({ type: 'ADD_EXAM' })}>LISÄÄ UUSI TENTTI</button></li>
                        </ol>
                    ) : <p>Tietokannassa ei ole tenttejä.</p>}
            </div>
        </article>
    )
}

export default Exams