import { useReducer, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import Question from './Question'

// THE CODE FROM THIS FILE IS CURRENTLY BEING EDITED INSIDE PLAYGROUND.JS

let examData = { exam: "", questions: [], answerOptions: [] }

let initialData = {
    /* examRetrieved: false,
    questionsRetrieved: false,
    answerOptionsRetrieved: false, */
    examDataRetrieved: false,
    saveRequired: false,
    dataSaved: false,
}

const ACTION = {
    EXAM_RENAMED: "EXAM_RENAMED",
    QUESTION_ADDED: "QUESTION_ADDED",
    QUESTION_CONTENTS_EDITED: "QUESTION_CONTENTS_EDITED",
    QUESTION_POINTS_EDITED: "QUESTION_POINTS_EDITED",
    QUESTION_DELETED: "QUESTION_DELETED",
    ANSWER_OPTION_ADDED: "ANSWER_OPTION_ADDED",
    ANSWER_OPTION_EDITED: "ANSWER_OPTION_EDITED",
    TOGGLE_CORRECT_ANSWER: "TOGGLE_CORRECT_ANSWER",
    ANSWER_OPTION_DELETED: "ANSWER_OPTION_DELETED",
    DATA_SAVED: "DATA_SAVED",
    SAVE_REQUIRED: "SAVE_REQUIRED",
    DATA_RETRIEVED: "DATA_RETRIEVED",
}

function reducer(state, action) {
    switch (action.type) {

        case ACTION.EXAM_RENAMED: {
            // USE PATCH TO UPDATE TITLE ONLY !!!
            console.log("Reducer called, exam renamed", action);
            // PREVIOUS VERSION: return {...state, name: action.payload.name};
            const stateCopy = { ...state, saveRequired: true }
            stateCopy.exams[action.payload.index].title = action.payload.title
            return stateCopy;
        }

        case ACTION.QUESTION_ADDED: {
            console.log("Reducer called, question added", action)
            let defaultAnswer = { isCorrect: false, contents: "MUOKKAA VASTAUSVAIHTOEHTOA" }
            const stateCopy = JSON.parse(JSON.stringify(state))
            stateCopy.exams[action.payload.examIndex].questions.push({ contents: "Kirjoita kysymys tähän", answers: [defaultAnswer] })
            return stateCopy
        }

        case ACTION.QUESTION_CONTENTS_EDITED: {
            console.log("Reducer called, question edited.", action);
            const stateCopy = { ...state, saveRequired: true }
            stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].contents = action.payload.contents
            return stateCopy
        }

        case ACTION.QUESTION_POINTS_EDITED: {

        }

        // TODO !!!
        case ACTION.QUESTION_DELETED: {
            console.log("Reducer called, question deleted.", action);
            return {
                ...state,
                exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
                    ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
                } : exam)),
                saveRequired: true
            }
        }

        case ACTION.ANSWER_OPTION_ADDED: {
            /*       the below code generates two answers at a time, used JSON.parse instead
            const stateCopy = {...state}
            stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({contents: "Kirjoita vastausvaihtoehto tähän"})
            return stateCopy */
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, action", action)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, action", action.payload)
            const stateCopy = JSON.parse(JSON.stringify(state))
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, stateCopy", stateCopy)
            stateCopy.answerOptions.push({ contents: "UUSI VASTAUSVAIHTOEHTO - MUOKKAA TÄSTÄ" })
            return stateCopy
        }

        case ACTION.ANSWER_OPTION_EDITED: {
            console.log("Reducer called, answer option edited", action);
            const stateCopy = { ...state, saveRequired: true }
            // kokeile viimeisiin sulkeisiin [action.payload.index]:
            stateCopy.
                exams[action.payload.examIndex].
                questions[action.payload.questionIndex].
                answers[action.payload.answerIndex].
                contents = action.payload.contents
            return stateCopy
        }

        // TODO !!!
        case ACTION.TOGGLE_CORRECT_ANSWER: {

        }

        // TODO !!!
        case ACTION.ANSWER_OPTION_DELETED: {
            console.log("Reducer called, answer option deleted.", action);
            return {
                ...state,
                exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
                    ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
                } : exam)),
                saveRequired: true
            }
        }

        case ACTION.SAVE_REQUIRED:
            return { ...state, saveRequired: action.payload }

        case ACTION.DATA_SAVED:
            return { ...state, dataSaved: action.payload }

        case ACTION.DATA_RETRIEVED:
            return { ...action.payload, examDataRetrieved: true }

        default:
            throw new Error("This is an error from the reducer function. You're not supposed to be here...")
    }
}



const EditExam = () => {
    // const [appData, dispatch] = useReducer(reducer, examData);
    const [state, dispatch] = useReducer(reducer, examData)

    let examId = ((window.location.href).toString())
    examId = examId.split("/").pop()

    const [exam, setExam] = useState([])
    const [questions, setQuestions] = useState([])
    const [answerOptions, setAnswerOptions] = useState([])

    const token = localStorage.getItem('token')
    const EXAM_URL = `https://localhost:8080/api/exams/${examId}`
    const QUESTIONS_URL = `https://localhost:8080/api/exams/${examId}/questions`

    const toastSuccess = () => toast.success("Tiedot tallennettu onnistuneesti")

    const toastError = () => toast.error("Tapahtui virhe")



    // - - - GET DATA - - -
    useEffect(() => {
        let isMounted = true

        // console.log("EditExam.js, Exam, useEffect, token:", token)

        // - - - Get exam - - -
        const getExam = async () => {
            // setIsLoading(true);
            try {
                /* dispatch({ type: 'INIT_DATA', payload: response.data }); */
                const response = await axios.get(EXAM_URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                /* console.log("EditExam.js, getExam, response:", response)*/
                console.log("EditExam.js, getExam, response.data:", response.data)
                setExam(response.data)
            } catch (error) {
                // toastError()
                console.error(error)
            }
            // setIsLoading(false)
        }
        getExam()

        // - - - Get questions - - -
        const getQuestions = async () => {
            // setIsLoading(true);
            try {
                const response = await axios.get(QUESTIONS_URL, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
                /* console.log("EditExam.js, getQuestions, response:", response)*/
                console.log("EditExam.js, getQuestions, response.data:", response.data)
                setQuestions(response.data)
            } catch (error) {
                // toastError()
                console.error(error)
            }
            // setIsLoading(false)
        }
        getQuestions()

        // - - - Get answer options - - -
        const getAnswerOptions = async () => {
            // setIsLoading(true);

            let questionIds = questions.map(function (element) {
                return `id=${element.id}`
            })
            questionIds = questionIds.join(" OR ")
            // console.log("EditExam.js, getQuestions, questionIds:", questionIds)
            try {
                // ERROR: COULD NOT GET HEADERS. CHECK ORDER OF BODY AND HEADERS IN GET REQUESTS!
                const response = await axios.get('https://localhost:8080/api/answer_options', {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }, {
                    id: questionIds
                })
                // console.log("EditExam.js, getAnswerOptions, response:", response)
                console.log("EditExam.js, getAnswerOptions, response.data:", response.data)
                setAnswerOptions(response.data)
            } catch (error) {
                // toastError()
                console.error(error)
            }
            // setIsLoading(false)
        }
        getAnswerOptions()

    }, [])

    /* console.log("QUESTIONS:", questions)
    console.log("ANSWER OPTIONS:", answerOptions)
    var questionTitles = questions.map(question => (question.contents))
    console.log("QUESTIONTITLES=", questionTitles) */

    return (
        <div>
            <div className='page-title'>Täällä voi editoida kokeita, jiihaa!</div>
            <div>
                <h1 className='main-title'>Tentin otsikko:</h1>
            </div>
            <div>
                <input className="input-exam-title" type="text" onChange={(event) => {
                    // TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH!
                    dispatch({ type: "EXAM_RENAMED", payload: { title: event.target.value } })
                }} placeholder={exam.title} />
            </div>
            <div>
                <h3 className='section-title'>Kysymykset:</h3>
                <button className='small-btn' >Lisää uusi kysymys</button>
                <ol className='question-items'>
                    {/* {appData.examDataRetrieved && appData.questions.map((question, index) => <Question questionIndex={index} question={question} dispatch={dispatch} />)} */}
                    {questions.map((question, index) =>
                        <li key={index}>
                            <Question exam={exam} questions={questions} question={question} questionIndex={index} answerOptions={answerOptions} dispatch={dispatch} />
                        </li>)}
                </ol><button className='small-btn' >Lisää uusi kysymys</button>
                {/* MALLI:
                            <button onClick={() => props.dispatch({ type: "ADD_QUESTION", payload: { examIndex: props.examIndex } })} >
          <i className="fas fa-plus-square"></i>
        </button> */}
            </div>

            {/* {appData.dataSaved && toastSuccess <ToastContainer />} */}
            <div>
                <p><Link className='router-link' to='/opettaja/hallintapaneeli'>Takaisin hallintapaneeliin</Link></p>
                <p><Link className='router-link' to='/opettaja/tentit'>Siirry tenttilistaan</Link></p>
                <p><Link className='router-link' to='/opettaja/käyttäjät'>Siirry muokkaamaan käyttäjiä</Link></p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditExam