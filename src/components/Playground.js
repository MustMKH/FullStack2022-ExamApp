import { useEffect, useReducer } from 'react'
import dataService from '../service/dataService'
import { Link, useParams } from "react-router-dom"
import Question from './Question'

// !!! FIND HARD CODED

/* TODO: "Luo tenttitapahtuma" event
    - step 1: check if all questions have at least 2 answer options
      and at least 1 option is checked as correct
    - step 3: make "Luo tenttitapahtuma" button active when the above conditions are met
    - step 2: create a copy of the finished exam for students to take
    - step 3: require additional informaton such as exam date and time
    - step 4 (optional): choose students/groups required to take exam */

console.log("TEMPORARY FILE NAME PLAYGROUND, REAL FILE NAME EXAMDATA")

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
    EXAM_RENAMED: "EXAM_RENAMED",
    QUESTION_ADDED: "QUESTION_ADDED",
    ANSWER_OPTION_ADDED: "ANSWER_OPTION_ADDED",
    QUESTION_CONTENTS_EDITED: "QUESTION_CONTENTS_EDITED",
    ANSWER_OPTION_CONTENTS_EDITED: "ANSWER_OPTION_CONTENTS_EDITED",
    QUESTION_POINTS_EDITED: "QUESTION_POINTS_EDITED",
    TOGGLE_CORRECT_ANSWER: "TOGGLE_CORRECT_ANSWER",
    QUESTION_DELETED: "QUESTION_DELETED",
    ANSWER_OPTION_DELETED: "ANSWER_OPTION_DELETED",
    // SAVING
    DATA_SAVED: "DATA_SAVED",
    SAVE_REQUIRED: "SAVE_REQUIRED"
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

        // - - -   E D I T   E X A M S   -   U N D E R   C O N S T R U C T I O N   !!!   - - -
        case ACTION.EXAM_RENAMED: {
            // USE PATCH TO UPDATE TITLE ONLY !!!
            console.log("Reducer called, exam renamed", action);
            // PREVIOUS VERSION: return {...state, name: action.payload.name};
            const stateCopy = { ...state, saveRequired: true }
            // stateCopy.exams[action.payload.index].title = action.payload.title
            return stateCopy
        }

        case ACTION.QUESTION_ADDED: {
            console.log("EditExam.js, reducer, ACTION.QUESTION_ADDED, action", action)
            console.log("EditExam.js, reducer, ACTION.QUESTION_ADDED, action.payload", action.payload)
            console.log("EditExam.js, reducer, ACTION.QUESTION_ADDED, state.questions", state.questions)
            // const stateCopy = JSON.parse(JSON.stringify(state))
            // console.log("EditExam.js, reducer, ACTION.QUESTION_ADDED, stateCopy", stateCopy)
            state.questions.push({ contents: "UUSI KYSYMYS - MUOKKAA TÄSTÄ" })
            return state
        }

        case ACTION.ANSWER_OPTION_ADDED: {
            /*       the below code generates two answers at a time, used JSON.parse instead
            const stateCopy = {...state}
            stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({contents: "Kirjoita vastausvaihtoehto tähän"})
            return stateCopy */
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, action", action)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, action", action.payload)
            // const stateCopy = JSON.parse(JSON.stringify(state))
            // console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_ADDED, stateCopy", stateCopy)
            state.answerOptions.push({ contents: "UUSI VASTAUSVAIHTOEHTO - MUOKKAA TÄSTÄ" })
            return state
        }

        case ACTION.QUESTION_CONTENTS_EDITED: {
            console.log("Reducer called, question edited.", action);
            const stateCopy = { ...state, saveRequired: true }
            // stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].contents = action.payload.contents
            return stateCopy
        }

        case ACTION.QUESTION_POINTS_EDITED: {
            console.log("Reducer called, question points edited.", action)
            const stateCopy = { ...state, saveRequired: true }
            return stateCopy
        }

        // TODO !!!
        case ACTION.QUESTION_DELETED: {
            console.log("Reducer called, question deleted.", action);
            return {
                /*                 ...state,
                                exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
                                    ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
                                } : exam)), */
                saveRequired: true
            }
        }

        // TODO !!!
        case ACTION.ANSWER_OPTION_CONTENTS_EDITED: {
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_CONTENTS_EDITED, action", action)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_CONTENTS_EDITED, action.payload", action.payload)
            return { ...state }
        }

        // TODO !!!
        case ACTION.TOGGLE_CORRECT_ANSWER: {
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_CONTENTS_EDITED, action", action)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_CONTENTS_EDITED, action.payload", action.payload)
            return { ...state }
        }

        // TODO !!!
        case ACTION.ANSWER_OPTION_DELETED: {
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, action", action)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, action", action.payload)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, action", action.payload.answerOptionId)
            // const answerOptionsCopy = state.answerOptions.filter((answerOption => answerOption.id !== action.payload.answerOptionId))
            const stateCopy = { ...state }
            stateCopy.answerOptions.filter((answerOption => answerOption.id !== action.payload.answerOptionId))
            // state.answerOptions.filter((answerOption => answerOption.id !== action.payload.answerOptionId))
            /* stateCopy = {
            ...state,
            answerOptions: state.answerOptions.filter((answerOption, i) => i !== action.payload.answerOptionIndex),
            saveRequired: true
        } */
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, state.exam", state.exam)
            console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, state.questions", state.questions)
            // console.log("EditExam.js, reducer, ACTION.ANSWER_OPTION_DELETED, answerOptionsCopy", answerOptionsCopy)
            return stateCopy
        }

        case ACTION.SAVE_REQUIRED:
            return { ...state, saveRequired: action.payload }

        case ACTION.DATA_SAVED:
            return { ...state, dataSaved: action.payload }

        case ACTION.DATA_RETRIEVED:
            return { ...action.payload, examDataRetrieved: true }

        default:
            throw new Error("Unexpected action in the reducer function.")
    }
}

const Playground = () => {
    // const { id: tenttiId } = useParams();
    let { tentti: examId } = useParams()
    console.log(" - - - EXAM ID - - -", examId) // !!! HARD CODED !!!
    // try useParams (?) react-router-dom
    /*     let examId = ((window.location.href).toString())
        examId = examId.split("/").pop() */

    let initialData = {
        exam: "",
        questions: "",
        answerOptions: "",

        examRetrieved: true,
        questionsRetrieved: true,
        answerOptionsRetrieved: true,

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

    // - - - useEffect with an empty dependency array to get examData only once - - -
    useEffect(() => {
        dispatch({ type: ACTION.EXAM_DATA_REQUESTED, payload: { examDataRequested: true } })
    }, [])


    useEffect(() => {

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
            let questions = appData.questions
            let questionIds = questions.map(({ id }) => id)
            questionIds = questionIds.join(" OR ")
            console.log("ExamData.js, getAnswerOptions, questionIds:", questionIds)
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


        appData.examDataRequested && getExam()
        appData.questionsDataRequested && getQuestions()
        appData.answerOptionsDataRequested && getAnswerOptions()

    }, [appData])

    const addQuestion = async () => {
        console.log("Examdata.js, addQuestion")
        try {
            const response = await dataService.addQuestion(examId)
            dispatch({
                type: ACTION.QUESTION_ADDED,
                payload: { exam_id: examId }
            })
        } catch (error) {
            console.error(error.message)
        }
    }
    /* const addAnswerOption = async () => {
        console.log("AnswerOption.js, addAnswerOption")
        try {
            const response = await dataService.addAnswerOption(questionId)
            props.dispatch({
                type: ACTION.ANSWER_OPTION_ADDED,
                payload: { questionIndex: props.questionIndex }
            })
        } catch (error) {
            console.error(error.message)
        }
    } */
    const editExamTitle = async (event) => {
        try {
            console.log("ExamData.js, editExamTitle, event.target.value:", event.target.value)
            const examTitle = event.target.value
            const response = await dataService.updateExamTitle(examId, examTitle)
            dispatch({
                type: ACTION.EXAM_RENAMED,
                payload: {
                    title: examTitle,
                    // examIndex: examIndex,
                    examId: examId
                }
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <div className='page-title'>Täällä voi editoida kokeita, jiihaa!</div>

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
                <h1 className='main-title'>Tentin otsikko:</h1>
                <div>
                    <input className="input-exam-title" type="text" onChange={editExamTitle} placeholder={appData.examRetrieved && appData.exam.title} />
                </div><h3 className='section-title'>Kun tentti on valmis, voit luoda tenttitapahtuman, jossa määritetään tentin ajankohta ja osallistujat:<button className='create-exam-event-btn' >Luo tenttitapahtuma</button></h3>
                <div>
                    <h2 className='section-title'>Kysymykset:</h2>
                    <button className='small-btn' onClick={addQuestion}>Lisää uusi kysymys</button>
                    <ol className='question-items'>
                        {/* {appData.examDataRetrieved && appData.questions.map((question, index) => <Question questionIndex={index} question={question} dispatch={dispatch} />)} */}
                        {appData.questionsRetrieved && appData.questions.map((question, index) =>
                            <li key={index}>
                                <Question answerOptionsRetrieved={appData.answerOptionsRetrieved} exam={appData.exam} questions={appData.questions} question={question} questionIndex={index} answerOptions={appData.answerOptions} dispatch={dispatch} />
                            </li>)}
                    </ol><button className='small-btn' >Lisää uusi kysymys</button>


                </div>
            </div>
            <div><h3 className='section-title'>Kun tentti on valmis, voit luoda tenttitapahtuman, jossa määritetään tentin ajankohta ja osallistujat:<button className='create-exam-event-btn' >Luo tenttitapahtuma</button></h3>
                <div>
                    <p><Link className='router-link' to='/opettaja/hallintapaneeli'>Takaisin hallintapaneeliin</Link></p>
                    <p><Link className='router-link' to='/opettaja/tentit'>Siirry tenttilistaan</Link></p>
                    <p><Link className='router-link' to='/opettaja/käyttäjät'>Siirry muokkaamaan käyttäjiä</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Playground
