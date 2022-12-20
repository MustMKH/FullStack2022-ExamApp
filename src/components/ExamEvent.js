import '../styles/ExamEvent.css'
import { useState, useEffect, useReducer } from 'react'
import { useParams, Link } from "react-router-dom"
import dataService from '../service/dataService'

// TODO: Create endpoints to exam_copy (currently using the same endpoints as GetExamData (or Playground)) !!!

const ACTION = {
    EXAM_DATA_REQUESTED: 'EXAM_DATA_REQUESTED',
    // DATA FETCH INITIATED
    EXAM_FETCH_INITIATED: 'EXAM_FETCH_INITIATED',
    QUESTIONS_FETCH_INITIATED: 'QUESTIONS_FETCH_INITIATED',
    ANSWER_OPTIONS_FETCH_INITIATED: 'ANSWER_OPTIONS_FETCH_INITIATED',
    // DATA FETCH SUCCESS CASES
    EXAM_RETRIEVED: 'EXAM_RETRIEVED',
    QUESTIONS_RETRIEVED: 'QUESTIONS_RETRIEVED',
    ANSWER_OPTIONS_RETRIEVED: 'ANSWER_OPTIONS_RETRIEVED',
    // DATA FETCH PARTIAL FAILURE
    NO_QUESTIONS_FOUND: 'NO_QUESTIONS_FOUND',
    NO_ANSWER_OPTIONS_FOUND: 'NO_ANSWER_OPTIONS_FOUND',
    // DATA FETCH FAILURE CASES
    FAILED_TO_FETCH_EXAM: 'FAILED_TO_FETCH_EXAM',
    FAILED_TO_FETCH_QUESTIONS: 'FAILED_TO_FETCH_QUESTIONS',
    FAILED_TO_FETCH_ANSWER_OPTIONS: 'FAILED_TO_FETCH_ANSWER_OPTIONS',
    // EDIT DATA
    TOGGLE_ANSWER_SELECTION: "TOGGLE_ANSWER_SELECTION",
}

const reducer = (state, action) => {
    switch (action.type) {

        case ACTION.EXAM_DATA_REQUESTED:
            console.log("Exam data requested.", action.payload)
            return { ...state, examDataRequested: true }

        case ACTION.EXAM_FETCH_INITIATED:
            console.log("Exam data fetch has begun.")
            return { ...state, examFetchInitiated: true, examDataRequested: false }
        case ACTION.QUESTIONS_FETCH_INITIATED:
            console.log("Questions data fetch has begun.")
            return { ...state, questionsFetchInitiated: true, questionsDataRequested: false }
        case ACTION.ANSWER_OPTIONS_FETCH_INITIATED:
            console.log("Answer options data fetch has begun.")
            return { ...state, answerOptionsFetchInitiated: true, answerOptionsDataRequested: false }

        case ACTION.EXAM_RETRIEVED:
            console.log("Exam retrieved successfully.")
            return { ...state, exam: action.payload, examDataRequested: false, examFetchInitiated: false, questionsDataRequested: true, examRetrieved: true }
        case ACTION.QUESTIONS_RETRIEVED:
            console.log("Questions retrieved successfully.")
            return { ...state, questions: action.payload, questionsDataRequested: false, questionsFetchInitiated: false, answerOptionsDataRequested: true, noQuestionsFound: false, questionsRetrieved: true }
        case ACTION.ANSWER_OPTIONS_RETRIEVED:
            console.log("Answer options retrieved successfully.")
            return { ...state, answerOptions: action.payload, answerOptionsDataRequested: false, answerOptionsFetchInitiated: false, noAnswerOptionsFound: false, answerOptionsRetrieved: true }

        case ACTION.NO_QUESTIONS_FOUND:
            console.log("No questions found for the exam.")
            return { noQuestionsFound: true, ...state, questions: "", questionsDataRequested: false, questionsFetchInitiated: false, answerOptionsDataRequested: false, answerOptionsFetchInitiated: false }
        case ACTION.NO_ANSWER_OPTIONS_FOUND:
            console.log("No answer options found for the exam questions.")
            return { noAnswerOptionsFound: true, ...state, answerOptions: "", answerOptionsDataRequested: false, answerOptionsFetchInitiated: false }

        case ACTION.FAILED_TO_FETCH_EXAM:
            console.log("Failed to fetch exam.")
            return { ...state, failedToFetchExam: true, examFetchInitiated: false }
        case ACTION.FAILED_TO_FETCH_QUESTIONS:
            console.log("Failed to fetch questions.")
            return { ...state, failedToFetchQuestions: true, questionsFetchInitiated: false }
        case ACTION.FAILED_TO_FETCH_ANSWER_OPTIONS:
            console.log("Failed to fetch answer options.")
            return { ...state, failedToFetchAnswerOptions: true, answerOptionsFetchInitiated: false }

        // - - - TODO !!!  - - -
        case ACTION.TOGGLE_ANSWER_SELECTION: {
            console.log("ExamEvent.js, reducer, TOGGLE_ANSWER_SELECTION, action", action);
            console.log("ExamEvent.js, reducer, TOGGLE_ANSWER_SELECTION, action.payload", action.payload);
            return { ...state }
        }

        default:
            throw new Error("Unexpected action in the reducer function.")
    }
}

const ExamEvent = () => {
    const [answer, setAnswer] = useState()
    const toggleAnswer = () => {
        setAnswer(prev => !prev)
    }

    // TODO: use real user id instead of mock id !!!
    const userId = 3

    let { tentti: examId } = useParams()
    console.log("ExamData.js, examId:", examId, "userId:", userId)

    let initialData = {
        exam: "",
        questions: [],
        answerOptions: [],

        examRetrieved: false, // this was true???
        questionsRetrieved: false, // this was true???
        answerOptionsRetrieved: false, // this was true???

        examDataRequested: false,
        questionsDataRequested: false,
        answerOptionsDataRequested: false,

        examFetchInitiated: false,
        questionsFetchInitiated: false,
        answerOptionsFetchInitiated: false,

        noQuestionsFound: false,
        noAnswerOptionsFound: false,

        failedToFetchExam: false,
        failedToFetchQuestions: false,
        failedToFetchAnswerOptions: false,
    }

    const [appData, dispatch] = useReducer(reducer, { initialData })

    // - - - Get selected exam - - -
    const getExam = async () => {
        try {
            dispatch({ type: ACTION.EXAM_FETCH_INITIATED })
            const result = await dataService.getExam(examId)
            console.log("ExamData.js, getExam, result:", result)
            dispatch({ type: ACTION.EXAM_RETRIEVED, payload: result })
        } catch (error) {
            console.error(error.message)
            dispatch({ type: ACTION.FAILED_TO_FETCH_EXAM })
        }
    }

    // - - - Get questions for selected exam - - -
    const getQuestions = async () => {
        try {
            dispatch({ type: ACTION.QUESTIONS_FETCH_INITIATED })
            const result = await dataService.getQuestionsForExam(examId)
            console.log("ExamData.js, getQuestions, result:", result)
            // const itemList = todoList.map(({item_name})=> item_name)
            if (result.length > 0) {
                dispatch({ type: ACTION.QUESTIONS_RETRIEVED, payload: result })
            } else {
                dispatch({ type: ACTION.NO_QUESTIONS_FOUND, payload: { noQuestionsFound: true } })
            }
        } catch (error) {
            console.error(error.message)
            dispatch({ type: ACTION.FAILED_TO_FETCH_QUESTIONS })
        }
    }

    // - - - Get answer options for questions in the selected exam - - -
    const getAnswerOptions = async () => {
        try {
            dispatch({ type: ACTION.ANSWER_OPTIONS_FETCH_INITIATED })
            const result = await dataService.getAnswerOptionsForExam(examId)
            console.log("ExamData.js, getAnswerOptions, result:", result)
            if (result.length > 0) {
                dispatch({ type: ACTION.ANSWER_OPTIONS_RETRIEVED, payload: result })
            } else {
                dispatch({ type: ACTION.NO_ANSWER_OPTIONS_FOUND, payload: { noAnswerOptionsFound: true } })
            }
        } catch (error) {
            console.error(error.message)
            dispatch({ type: ACTION.FAILED_TO_FETCH_ANSWER_OPTIONS })
        }
    }

    const toggleSelectAnswer = async (event) => {
        try {
            console.log("ExamEvent.js, toggleSelectAnswer, event.target.value:", event.target.value)
            // console.log("ExamEvent.js, toggleSelectAnswer, !isChecked:", !isChecked)
            // console.log("ExamEvent.js, toggleSelectAnswer, Checked:", Checked)
            // console.log("ExamEvent.js, toggleSelectAnswer, correctAnswer:", correctAnswer)
            // const response = await dataService.toggleSelectAnswer(answerOptionId, !Checked)
            /* props.dispatch({
                type: ACTION.TOGGLE_ANSWER_SELECTION,
                payload: {
                    Checked: !Checked,
                    answerOptionIndex: props.answerOptionIndex,
                    answerOptionId: answerOptionId
                }
            }) */
        } catch (error) {
            console.error(error.message)
        }
    }

    // - - - useEffect with an empty dependency array to get examData only once - - -
    // TODO: not working as intended !!!
    useEffect(() => {
        console.log("ExamEvent.js, useEffect, setting examDataRequested to true")
        dispatch({ type: ACTION.EXAM_DATA_REQUESTED, payload: { examDataRequested: true } })
    }, [])

    appData.examDataRequested && getExam()
    appData.questionsDataRequested && getQuestions()
    appData.answerOptionsDataRequested && getAnswerOptions()

    return (
        <main>
            <div className='page-title'>{appData.examRetrieved && appData.exam.title}</div>
            <div>
                <div>{appData.examFetchInitiated && "Haetaan tentin tietoja"}</div>
                <div>{appData.questionsFetchInitiated && "Haetaan kysymysten tietoja"}</div>
                <div>{appData.answerOptionsFetchInitiated && "Haetaan vastausvaihtoehtojen tietoja"}</div>
                <div>{appData.examRetrieved && "Tentin haku onnistui"}</div>
                <div>{appData.questionsRetrieved && "Kysymysten haku onnistui"}</div>
                <div>{appData.answerOptionsRetrieved && "Vastausvaihtoehtojen haku onnistui"}</div>
                <div>{appData.noQuestionsFound && "Tentillä ei ole kysymyksiä."}</div>
                <div>{appData.noAnswerOptionsFound && "Kysymyksillä ei ole vastausvaihtoehtoja."}</div>
                <div>{appData.failedToFetchExam && "Tentin haku ei onnistunut."}</div>
                <div>{appData.failedToFetchQuestions && "Kysymysten haku ei onnistunut."}</div>
                <div>{appData.failedToFetchAnswerOptions && "Vastausvaihtoehtojen haku ei onnistunut."}</div>
            </div>
            <div>
                <h2 className='section-title'>Kysymykset:</h2>
                <ol className='question-items'>
                    {appData.questionsRetrieved && appData.questions.map((question, index) =>
                        <li className='question-item' key={index}>
                            <span className='sub-title'>{question.contents} </span><i className='points'>({question.points} pistettä)</i>
                            <ol /* className='answer-option-items' */>
                                {
                                    appData.answerOptionsRetrieved && appData.answerOptions.filter(
                                        (answerOption) => answerOption.question_id === question.id
                                    ).map(
                                        (answerOption, index) =>
                                            <li className='answer-option-list'>
                                                <span>
                                                    <input className="checkbox" defaultChecked={false} type="checkbox" onChange={toggleSelectAnswer} />
                                                </span>
                                                <span>
                                                    <li className='answer-option-contents' type="A" key={index}>
                                                        <label >{answerOption.contents}</label>

                                                    </li>
                                                </span>
                                            </li>
                                    )}
                            </ol>
                        </li>)}
                </ol>
                <div className='sub-title'>Kun olet valmis, voit palauttaa tentin alla olevasta painikkeesta. <br />
                    Et pääse muokkaamaan vastauksiasi palautuksen jälkeen.</div>
                <Link to='/keskeneräinen'><button className='small-btn'>Palauta tentti</button></Link>
            </div>
        </main>
    )
}

export default ExamEvent