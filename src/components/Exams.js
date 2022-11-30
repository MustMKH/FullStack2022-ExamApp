import { useState, useEffect } from 'react'
import axios from 'axios'

const EXAMS_URL = 'https://localhost:8080/api/exams'

const Exams = () => {
    const [exams, setExams] = useState([])
    let token = localStorage.getItem('token')

    const deleteExam = async (id) => {
        const DELETE_EXAM_URL = `https://localhost:8080/api/exams/${id}`
        console.log("Exams.js, deleteExam, id =", id)
        try {
            const deleteExam = await axios.delete(DELETE_EXAM_URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setExams(exams.filter(exam => exam.exam_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        let isMounted = true

        console.log("Exams.js, Exams, useEffect, token:", token)

        // - - - Get exams - - -
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


    console.log("EXAMS:", exams)
    return (
        <article>
            <h1 className='page-title'>Tentit</h1>
            <div className='exams'>
                {exams?.length
                    ? (
                        <ol className='exam-items'>
                            {exams.map((exam, i) =>
                                <li key={i}>
                                    <button id="big-button"> Tentti {i + 1}: {exam?.title}</button>
                                    <button className='trash-btn' onClick={() => deleteExam(exam?.id)}>
                                        <i className="fas fa-solid fa-trash"></i>
                                    </button>
                                </li>)}
                            <li>
                                <button id="big-button" /* onClick={() => dispatch({ type: 'ADD_EXAM' })} */>LISÄÄ UUSI TENTTI</button>
                            </li>
                        </ol>
                    ) : <p>Tietokannassa ei ole tenttejä.</p>}
            </div>
        </article>
    )
}

export default Exams