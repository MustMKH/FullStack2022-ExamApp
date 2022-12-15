import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
// import Spinner from './Spinner'
import dataService from '../service/dataService'

// TODO: Add confirmation to deleting exams
// TODO: Add loading spinner
// TODO: Exams do not load on first login ???

const Exams = () => {
    // const [isLoading, setIsLoading] = useState(false);

    const [exams, setExams] = useState()

    const getExams = async () => {
        // setIsLoading(true);
        try {
            const response = await dataService.getExams()
            console.log("Exams.js, getExams, response:", response)
            setExams(response)
        } catch (error) {
            console.error(error)
        }
        // setIsLoading(false)
    }

    const deleteExam = async (id) => {
        // setIsLoading(true);
        console.log("Exams.js, deleteExam, id =", id)
        try {
            const response = await dataService.deleteExam(id)
            console.log("Exams.js, deleteExam, response:", response)
            setExams((exams) => exams.filter((exam) => exam.id !== id))
        } catch (error) {
            console.error(error.message)
        }
        // setIsLoading(false)
    }

    const addExam = async () => {
        // setIsLoading(true);
        console.log("Exams.js, addExam")
        try {
            const response = await dataService.addExam()
            console.log("Exams.js, addExam, response:", response)
            setExams(prevExams => [...prevExams, { id: response.id, title: response.title }])
        } catch (error) {
            console.error(error.message)
        }
        // setIsLoading(false)
    }

    useEffect(() => {
        getExams()
    }, [])

    return (
        <main>
            <div className='page-title'>Tentit</div>
            <div className='sub-title'> Tenttejä palvelussa: {exams?.length || 0} kpl</div>
            <div className='exams'>
                {exams?.length
                    ? (
                        <ol className='exam-items' >
                            {exams.map((exam, i) =>
                                <li key={i} data-testid={`exam-item-${i}`} >
                                    {/* TODO: Onclick to edit specific exam: - params={{ id: exam.id }} */}
                                    <Link to={`/opettaja/tentit/${exam.id}`} ><button className="big-btn"> Tentti {i + 1}: {exam?.title}</button></Link>
                                    {/* <button className='trash-btn' onClick={() => { isLoading ? <Spinner /> : deleteExam(exam?.id) }} disabled={isLoading}> */}
                                    <button className='trash-btn' onClick={() => { deleteExam(exam?.id) }}>
                                        <i className="fas fa-solid fa-trash"></i>
                                    </button>
                                </li>)}
                            <li>
                                {/* <button className="big-btn" onClick={() => { isLoading ? <Spinner /> : addExam() }} disabled={isLoading}>LISÄÄ UUSI TENTTI</button> */}
                                <button className="big-btn" onClick={() => addExam()}>LISÄÄ UUSI TENTTI</button>
                            </li>
                        </ol>
                    ) : <h1>Tenttejä haetaan palvelimelta.</h1>}
            </div>
        </main>
    )
}

export default Exams