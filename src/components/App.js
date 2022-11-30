import '../App.css'
import { useReducer, useEffect, useState, Fragment } from 'react'

// - - - REACT ROUTER DOM - - -
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'

// - - - COMPONENTS - - -
import Header from './Header'
import Footer from './Footer'
import Exam from './Exam'
import Exams from './Exams'
import AlertBox from './AlertBox'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'
import Users from './Users'
import EditExam from './EditExam'

// NOTE: REDUCER HANDLES LOCAL STATE, CHANGES IN DB ARE HANDLED BY AXIOS

// TODO: Clear for setTimer

// TODO: Checkboxes for answers (user: submit user answers, admin: mark options as correct/incorrect):

// TODO: Assign identifiers to exams, questions and answers

// TODO: Placeholders for exam, question and answer fields

// TODO: Build a JSON object from the retrieved database data



let defaultAnswer = {
  id: "answerIndex + 1",
  isCorrect: false,
  placeholder: "Kirjoita vastausvaihtoehto tähän",
  contents: ""
}

let defaultQuestion = {
  id: "examIndex.questionIndex + 1",
  placeholder: "Kirjoita kysymys tähän",
  contents: "",
  answers: [defaultAnswer]
}

let defaultExam = {
  id: "examIndex + 1",
  placeholder: "Anna tentin otsikko",
  title: "",
  questions: [defaultQuestion],
}


/* TODO: make instructions that can be edited by admin
let instructions1 = {text: "Lue kysymykset läpi huolellisesti."}
let instructions2 = {text: "Vastaa kysymykseen valitsemalla oikea vaihtoehto."}
let instructions3 = {text: "Tarkista vastauksesi."}
let instructions4 = {text: "Vastauksesi tallentuvat automaattisesti. Voit sulkea selaimen kun olet valmis."} */

// TODO: luo erikseen tallennettava data ja muu data
let applicationData = {
  // see what happens:   exams: [defaultExam]
  exams: [],
}

// TODO: mieti onko järkeä tallentaa näitä tietoja local storageen (antaa käynnistettäessa true arvoja näihin muuttujiin):
let initialData = {
  saveRequired: false,
  initialized: false,
  // auxiliary variable for setTimeout
  dataSaved: false,
  timerinApumuuttuja: false
}

// The latest version of this app utilizes the useReducer hook. See the useState version in useState.js
function reducer(state, action) {
  switch (action.type) {

    case 'EXAM_RENAMED': {
      console.log("Reducer called, exam renamed", action);
      // PREVIOUS VERSION: return {...state, name: action.payload.name};
      const stateCopy = { ...state, saveRequired: true }
      stateCopy.exams[action.payload.index].title = action.payload.title
      return stateCopy;
    }

    case 'QUESTION_EDITED': {
      console.log("Reducer called, question edited.", action);
      const stateCopy = { ...state, saveRequired: true }
      stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].contents = action.payload.contents
      return stateCopy
    }

    case 'ANSWER_EDITED': {
      console.log("Reducer called, answer edited", action);
      const stateCopy = { ...state, saveRequired: true }
      // kokeile viimeisiin sulkeisiin [action.payload.index]:
      stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers[action.payload.answerIndex].contents = action.payload.contents
      return stateCopy
    }

    /* TODO: case 'DELETE_EXAM': {

        } */

    // not working:
    case 'DELETE_QUESTION': {
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
        } : exam)),
        saveRequired: true
      }
    }

    // not working:
    case 'DELETE_ANSWER': {
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
        } : exam)),
        saveRequired: true
      }
    }

    /*     case 'ADD_EXAM': {
          console.log("Reducer called, exam added", action);
          return { ...state, exams: [...state.exams, { title: "Anna tentin otsikko", questions: [defaultQuestion] }], saveRequired: true }
        } */

    case 'ADD_EXAM': {
      console.log("Reducer called, exam added", action)
      return { ...state, exams: [...state.exams, { title: "Anna tentin otsikko" }], saveRequired: true }
    }

    // TODO: case 'ADD_QUESTION'
    case 'ADD_QUESTION': {
      console.log("Reducer called, question added", action)
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.exams[action.payload.examIndex].questions.push({ contents: "Kirjoita kysymys tähän", answers: [defaultAnswer] })
      return stateCopy
    }

    case 'ADD_ANSWER': {
      /*       the below code generates two answers at a time, used JSON.parse instead
            const stateCopy = {...state}
            stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({contents: "Kirjoita vastausvaihtoehto tähän"})
            return stateCopy */
      console.log("Reducer called, answer added", action)
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({ contents: "Kirjoita vastausvaihtoehto tähän" })
      return stateCopy
    }

    case 'UPDATE_SAVE_STATUS':
      return { ...state, saveRequired: action.payload }

    case 'SAVING_DATA':
      return { ...state, dataSaved: action.payload }

    case 'INITIALIZE_DATA':
      return { ...action.payload, initialized: true }

    default:
      throw new Error("This is an error from the reducer function. You're not supposed to be here...")
  }
}

const App = () => {
  const [dispatch] = useReducer(reducer)

  return (
    <Fragment>
      <Header />
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/kirjautuminen' element={<Login />} />
            <Route exact path='/rekisteröinti' element={<Register />} />
            <Route exact path='/opettaja/hallintapaneeli' element={<Dashboard />} />
            <Route exact path='/opettaja/tentit' element={<Exams />} />
            <Route exact path='/opettaja/tentit/muokkaus' element={<EditExam />} />
            <Route exact path='/opettaja/käyttäjät' element={<Users />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </Fragment>
  )
}

/* function App() {
  const [appData, dispatch] = useReducer(reducer, applicationData); */

// TODO: ADD USEEFFECT (MODIFY THE ONE BELOW) TO GET ALL EXAMS FROM DATABASE!!!

/*   const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
  }, []) */


// TODO: ADD ANOTHER USEEFFECT TO GET A SPECIFIC EXAM WHEN IT IS SELECTED

/*   useEffect(() => {
    const getData = async () => {
      const result = await axios('http://localhost:3001');
      console.log("result: ", result)
      dispatch({ type: "INITIALIZE_DATA", payload: result.data.data })
    }
    getData()
  }, [])

  useEffect(() => {
    const saveData = async () => {
      try {
        const result = await axios.post('http://localhost:3001', {
          data: appData
        })
        dispatch({ type: "UPDATE_SAVE_STATUS", payload: false })
      } catch (error) {
        console.log("An error occurred:", error)
      }
    }
    if (appData.saveRequired == true) {
      saveData()
    }
  }, [appData.saveRequired]) */


/*  This version employs an Express server that receives and stores data with 'get' and 'post'.
    The useEffect that stores data in the local storage can be found at '.localStorage.js' */

/* useEffect(() => {
  let timerID;
  console.log(timerID)
  if (appData.saveRequired == true) {
    dispatch({type: "UPDATE_SAVE_STATUS", payload: false})
    if (timerID) {
      console.log("The timer has been cleared?")
      clearTimeout(timerID)
    }
    console.log("saving exam name")
    console.log("exam:", appData)
    dispatch({type: "SAVING_DATA", payload: false})
    // Adding a timer to delay saving data + creating a variable for the timer's ID:

      timerID = setTimeout(() => {
        console.log("this log is from the setTimeout function")
        dispatch({type: "SAVING_DATA", payload: true})
        localStorage.setItem('examData', JSON.stringify(appData));
        console.log("timerID:", timerID)
      }, 5000)

    console.log("timerID:", timerID)
  }
  // Added clearTimeout here as well:
  return () => clearTimeout(timerID)
}, [appData.saveRequired]); */

/*   return (
    <div>
      <Header />
      <Register />
      <Login />
      <main>
      <p></p>
      <nav className ="exams">
        <ul className="exam-items">
          <li><button id="big-button">Tentti 1</button></li>
          <li><button id="big-button">Tentti 2</button></li>
          <li><button id="big-button">Tentti 3</button></li>
          <li><button id="big-button" onClick={() => dispatch({ type: 'ADD_EXAM' })}>Uusi tentti</button></li>
        </ul>
      </nav>
        {appData.initialized && appData.exams.map((exam, index) => <Exam examIndex={index} exam={exam} dispatch={dispatch} />)}
        <button id="big-button" onClick={() => dispatch({ type: 'ADD_EXAM' })}>Uusi tentti</button>
      {appData.dataSaved && <AlertBox />}
      </main>
      <Footer />
    </div>
  );
} */

export default App;
