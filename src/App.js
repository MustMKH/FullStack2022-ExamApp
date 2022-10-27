import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Exam from "./Exam";
import AlertBox from './AlertBox';
import { useReducer,useEffect } from 'react';
import axios from 'axios' // installed

/* TODO:
 * TEE CLEAR setTimerILLE 
 * Create checkboxes for answers (user: select the right answer, admin: select which answers are correct):
 * Assign numbers or other identifiers to questions and answers
 */

let answer1 = {id: "A", contents: "Vastausvaihtoehto 1", isCorrect: false};
let answer2 = {id: "B", contents: "Vastausvaihtoehto 2", isCorrect: false};
let answer3 = {id: "C", contents: "Vastausvaihtoehto 3", isCorrect: false};
let answer4 = {id: "D", contents: "Vastausvaihtoehto 4", isCorrect: false};
let answer5 = {id: "A", contents: "Vastausvaihtoehto 1", isCorrect: false};
let answer6 = {id: "B", contents: "Vastausvaihtoehto 2", isCorrect: false};
let answer7 = {id: "C", contents: "Vastausvaihtoehto 3", isCorrect: false};
let answer8 = {id: "D", contents: "Vastausvaihtoehto 4", isCorrect: false};
let answer9 = {id: "A", contents: "Vastausvaihtoehto 1", isCorrect: false};
let answer10 = {id: "B", contents: "Vastausvaihtoehto 2", isCorrect: false};
let answer11 = {id: "C", contents: "Vastausvaihtoehto 3", isCorrect: false};
let answer12 = {id: "D", contents: "Vastausvaihtoehto 4", isCorrect: false};
let answer13 = {id: "A", contents: "Vastausvaihtoehto 1", isCorrect: false};
let answer14 = {id: "B", contents: "Vastausvaihtoehto 2", isCorrect: false};
let answer15 = {id: "C", contents: "Vastausvaihtoehto 3", isCorrect: false};
let answer16 = {id: "D", contents: "Vastausvaihtoehto 4", isCorrect: false};
let answer17 = {id: "A", contents: "Juu.", isCorrect: false};
let answer18 = {id: "B", contents: "Ei.", isCorrect: false};
let answer19 = {id: "C", contents: "Ehkä.", isCorrect: false};

let question1 = {id: "1.1", contents: "Kysymys 1", answers: [answer1, answer2, answer3, answer4]};
let question2 = {id: "1.2", contents: "Kysymys 2", answers: [answer5, answer6, answer7, answer8]}
let question3 = {id: "1.3", contents: "Kysymys 3", answers: [answer9, answer10, answer11, answer12]};
let question4 = {id: "1.4", contents: "Kysymys 4", answers: [answer13, answer14, answer15, answer16]};
let question5 = {id: "2.1", contents: "Tämä on toisen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question6 = {id: "2.2", contents: "Tämä on toisen tentin toka kysymys", answers: [answer17, answer18, answer19]};
let question7 = {id: "3.1", contents: "Tämä on kolmannen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question8 = {id: "3.2", contents: "Tämä on kolmannen tentin toka kysymys", answers: [answer17, answer18, answer19]};

let exam1 = {
  id: "Tentti 1", 
  title: "Anna tentin 1 otsikko", 
  questions: [question1, question2, question3, question4],
};

let exam2 = {
  id: "Tentti 2", 
  title: "Anna tentin 2 otsikko", 
  questions: [question5, question6],
};

let exam3 = {
  id: "Tentti 3", 
  title: "Anna tentin 3 otsikko", 
  questions: [question7, question8],
};

/* TODO: make instructions that can be edited by admin 
let instructions1 = {text: "Lue kysymykset läpi huolellisesti."}
let instructions2 = {text: "Vastaa kysymykseen valitsemalla oikea vaihtoehto."}
let instructions3 = {text: "Tarkista vastauksesi."}
let instructions4 = {text: "Vastauksesi tallentuvat automaattisesti. Voit sulkea selaimen kun olet valmis."} */

// TODO: luo erikseen tallennettava data ja muu data
let applicationData = {
  exams: [exam1, exam2, exam3],
  // TODO: mieti onko järkeä tallentaa näitä tietoja local storageen (antaa käynnistettäessa true arvoja näihin muuttujiin):

}

let initialData = {
  saveRequired: false,
  initialized: false,
  // apumuuttuja setTimeoutille
  dataSaved: false,
  timerinApumuuttuja: false 
}

// The latest version of this app utilizes the useReducer hook. See the useState version in useState.js
function reducer(state,action) {
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
    
/* How to delete answer, question or exam?

    case 'DELETE_EXAM': {

    }    

    case 'DELETE_QUESTION': {
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
        } : exam)),
        saveRequired: true
      }
    }

    case 'DELETE_ANSWER': {
      
    } */

    // This case added:
    case 'ADD_EXAM': {
      console.log("Reducer called, exam added", action);
      return {...state, exams:[...state.exams, {title: "Anna tentin otsikko", questions:[]}], saveRequired:true}
    }

    // TODO: case 'ADD_QUESTION'

    case 'ADD_ANSWER': {
/*       the below code generates two answers at a time, used JSON.parse instead
      const stateCopy = {...state}
      stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({contents: "Anna vastausvaihtoehto"})
      return stateCopy */
      console.log("Reducer called, answer added", action)
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.exams[action.payload.examIndex].questions[action.payload.questionIndex].answers.push({contents: "Anna vastausvaihtoehto"})
      return stateCopy
    }

    case 'UPDATE_SAVE_STATUS':
      return {...state, saveRequired: action.payload}

    case 'SAVING_DATA':
      return {...state, dataSaved: action.payload}
      
    case 'INITIALIZE_DATA':
      return {...action.payload, initialized: true}
        
    default:
      throw new Error("This is an error from the reducer function. You're not supposed to be here...")
  }
}
      
function App() {
  const [appData, dispatch] = useReducer(reducer, applicationData);
        
  useEffect(() => {
    const getData = async () => {
      const result = await axios('http://localhost:8080');
      console.log("result: ", result)
      dispatch({ type: "INITIALIZE_DATA", payload: result.data.data })
    }
    getData()
  }, [])

  useEffect(() => {
    const saveData = async () => {
      try {
        const result = await axios.post('http://localhost:8080', {
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
  }, [appData.saveRequired])
  
  
/// LOCAL STORAGE USEeFFECTS COMMENTED OUT, BECAUSE WE ARE TRYING TO SAVE DATA TO SERVER AND A FILE (examdata.json)  

  // This version employs useEffect Hooks:
/*   useEffect(() => {
    let examData = localStorage.getItem('examData');
    if (examData == null) {
      console.log("data from default")
      localStorage.setItem('examData', JSON.stringify(applicationData));
      dispatch({ type: "INITIALIZE_DATA", payload: applicationData })
    } else {
      console.log("data from local storage")
      dispatch({ type: "INITIALIZE_DATA", payload: (JSON.parse(examData))})
    }
  }, []);
        
  useEffect(() => {
    let timerID;
    console.log(timerID)
    if (appData.saveRequired == true) {      
      dispatch({type: "UPDATE_SAVE_STATUS", payload: false})
      if (timerID) {
        console.log("Ajastin tyhjennettiin?")
        clearTimeout(timerID)
      }       
      console.log("saving exam name")
      console.log("exam:", appData)
      dispatch({type: "SAVING_DATA", payload: false})
      // Adding a timer to delay saving data + creating a variable for the timer's ID:
      
        timerID = setTimeout(() => {
          console.log("ollaan setTimeoutin sisällä")
          dispatch({type: "SAVING_DATA", payload: true})
          localStorage.setItem('examData', JSON.stringify(appData));
          console.log("timerID:", timerID)
        }, 5000)
      
      console.log("timerID:", timerID)
    }
    // Added clearTimeout here as well:
    return () => clearTimeout(timerID)
  }, [appData.saveRequired]); */
  
// console.log("HUOMIO", appData.exams, appData.initialized)

  return (
    <div>
      <Header />
      <main>
      <nav className ="exams">
        <ul className="exam-items">
{/*  TODO: Replace with exam id list: */}
          <li><button id="big-button">Tentti 1</button></li>
          <li><button id="big-button">Tentti 2</button></li>
          <li><button id="big-button">Tentti 3</button></li>
        </ul>
      </nav>
{/* OLD VERSION: <Exam exam = {exam} answerChanged={answerChanged} examRenamed = {examRenamed}/> */}
{/* PREVIOUS VERSION: <Exam exam={exam} dispatch={dispatch} /> */}
        {appData.initialized && appData.exams.map((exam, index) => <Exam examIndex={index} exam={exam} dispatch={dispatch} />)}
        <button id="big-button" onClick={() => dispatch({ type: 'ADD_EXAM' })}>Lisää uusi tentti</button>
      {appData.dataSaved && <AlertBox />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

/* PREVIOUS VERSION, switch case QUESTION_EDITED:      
      {let contents1 = action.payload.contents
      let examCopy1 = {...state}
      examCopy1.questions[action.payload.questionIndex].contents = contents1
      examCopy1.saveRequired=true
      return examCopy1}
   PREVIOUS VERSION, switch case ANSWER_EDITED:   
      {let contents2 = action.payload.contents
      let examCopy2 = {...state}
      examCopy2.questions[action.payload.questionIndex].answers[action.payload.answerIndex].contents = contents2
      examCopy2.saveRequired=true
      return examCopy2} */