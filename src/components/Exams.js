import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import Spinner from './Spinner'

// TODO: Add confirmation to deleting exams

// TODO: Add toast to confirm successful deletion

const Exams = () => {
    const EXAMS_URL = 'https://localhost:8080/api/exams'
    const [isLoading, setIsLoading] = useState(false);

    const [exams, setExams] = useState([])
    let token = localStorage.getItem('token')

    const deleteExam = async (id) => {
        setIsLoading(true);
        const EXAM_URL = `https://localhost:8080/api/exams/${id}`
        console.log("Exams.js, deleteExam, id =", id)
        try {
            const response = await axios.delete(EXAM_URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setExams(exams.filter(exam => exam.exam_id !== id))
            window.location = "/opettaja/tentit/"
            setIsLoading(false)
        } catch (error) {
            console.error(error.message)
        }
        setIsLoading(false)
    }

    const addExam = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(EXAMS_URL, {
                title: "UUSI TENTTI - MUOKKAA TÄSTÄ"
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            console.log("Exams.js, addExam, response:", response)
            console.log("Exams.js, addExam, response.data:", response.data)
            window.location = "/opettaja/tentit/"
        } catch (error) {
            console.error(error.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let isMounted = true

        console.log("Exams.js, token:", token)

        // - - - Get exams - - -
        const getExams = async () => {
            setIsLoading(true);
            try {
                /* dispatch({ type: 'INIT_DATA', payload: response.data }); */
                const response = await axios.get(EXAMS_URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                /* console.log("Exams.js, getExams, response:", response)
                console.log("Exams.js, getExams, response.data:", response.data) */
                setExams(response.data)
            } catch (error) {
                console.error(error)
            }
            setIsLoading(false)
        }

        getExams()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div>
            <h1 className='page-title'>Tentit</h1>
            <div className='exams'>
                {exams?.length
                    ? (
                        <ol className='exam-items'>
                            {exams.map((exam, i) =>
                                <li key={i}>
                                    {/* TODO: Onclick to edit specific exam: - params={{ id: exam.id }} */}
                                    <Link to={`/opettaja/tentit/${exam.id}`}><button className="big-btn"> Tentti {i + 1}: {exam?.title}</button></Link>
                                    <button className='trash-btn' onClick={() => { isLoading ? <Spinner /> : deleteExam(exam?.id) }} disabled={isLoading}>
                                        <i className="fas fa-solid fa-trash"></i>
                                    </button>
                                </li>)}
                            <li>
                                <button className="big-btn" onClick={() => { isLoading ? <Spinner /> : addExam() }} disabled={isLoading}>LISÄÄ UUSI TENTTI</button>
                            </li>
                        </ol>
                    ) : <h1>Tenttejä haetaan palvelimelta.</h1>}
            </div>
            <div>
                <p><Link className='router-link' to='/opettaja/hallintapaneeli'>Takaisin hallintapaneeliin</Link></p>
                <p><Link className='router-link' to='/opettaja/käyttäjät'>Siirry muokkaamaan käyttäjiä</Link></p>
            </div>
        </div>
    )
}

export default Exams