import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import Exam from "./Exam";
import { useReducer } from "react";

let answer1 = {id: "A", text: "Vastausvaihtoehto 1", isCorrect: false};
let answer2 = {id: "B", text: "Vastausvaihtoehto 2", isCorrect: false};
let answer3 = {id: "C", text: "Vastausvaihtoehto 3", isCorrect: false};
let answer4 = {id: "D", text: "Vastausvaihtoehto 4", isCorrect: false};
let answer5 = {id: "A", text: "Vastausvaihtoehto 1", isCorrect: false};
let answer6 = {id: "B", text: "Vastausvaihtoehto 2", isCorrect: false};
let answer7 = {id: "C", text: "Vastausvaihtoehto 3", isCorrect: false};
let answer8 = {id: "D", text: "Vastausvaihtoehto 4", isCorrect: false};
let answer9 = {id: "A", text: "Vastausvaihtoehto 1", isCorrect: false};
let answer10 = {id: "B", text: "Vastausvaihtoehto 2", isCorrect: false};
let answer11 = {id: "C", text: "Vastausvaihtoehto 3", isCorrect: false};
let answer12 = {id: "D", text: "Vastausvaihtoehto 4", isCorrect: false};
let answer13 = {id: "A", text: "Vastausvaihtoehto 1", isCorrect: false};
let answer14 = {id: "B", text: "Vastausvaihtoehto 2", isCorrect: false};
let answer15 = {id: "C", text: "Vastausvaihtoehto 3", isCorrect: false};
let answer16 = {id: "D", text: "Vastausvaihtoehto 4", isCorrect: false};
let answer17 = {id: "A", text: "Juu.", isCorrect: true};
let answer18 = {id: "B", text: "Ei.", isCorrect: false};
let answer19 = {id: "C", text: "Ehkä.", isCorrect: false};

let question1 = {id: "1.1", text: "Kysymys 1", answers: [answer1, answer2, answer3, answer4]};
let question2 = {id: "1.2", text: "Kysymys 2", answers: [answer5, answer6, answer7, answer8]}
let question3 = {id: "1.3", text: "Kysymys 3", answers: [answer9, answer10, answer11, answer12]};
let question4 = {id: "1.4", text: "Kysymys 4", answers: [answer13, answer14, answer15, answer16]};
let question5 = {id: "2.1", text: "Tämä on toisen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question6 = {id: "2.2", text: "Tämä on toisen tentin toka kysymys", answers: [answer17, answer18, answer19]};
let question7 = {id: "3.1", text: "Tämä on kolmannen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question8 = {id: "3.2", text: "Tämä on kolmannen tentin toka kysymys", answers: [answer17, answer18, answer19]};

let exam1 = {id: "Tentti 1", name: "Anna tentin 1 otsikko", questions: [question1, question2, question3, question4]};
let exam2 = {id: "Tentti 2", name: "Anna tentin 2 otsikko", questions: [question5, question6]};
let exam3 = {id: "Tentti 3", name: "Anna tentin 3 otsikko", questions: [question7, question8]};

/* TODO: make the instructions accept input from admin 
let instructions1 = {text: "Lue kysymykset läpi huolellisesti."}
let instructions2 = {text: "Vastaa kysymykseen valitsemalla oikea vaihtoehto."}
let instructions3 = {text: "Tarkista vastauksesi."}
let instructions4 = {text: "Vastauksesi tallentuvat automaattisesti. Voit sulkea selaimen kun olet valmis."} */

// The latest version of this app utilizes the useReducer hook. See the useState version in useState.js
function reducer(state,action) {
  switch (action.type) {

    case 'EXAM_RENAMED':
      console.log("Reduceria kutsuttiin, tentti nimetty uudelleen", action);
      return {...state, name: action.payload.name};

    case 'QUESTION_CHANGED':
      console.log("Reduceria kutsuttiin, kysymystä muutettu", action);
      let text1 = action.payload.text
      let examCopy1 = {...state}
      examCopy1.questions[action.payload.questionIndex].text = text1
      return examCopy1

    case 'ANSWER_CHANGED':
      console.log("Reduceria kutsuttiin, vastausta muutettu", action);
      let text2 = action.payload.text
      let examCopy2 = {...state}
      examCopy2.questions[action.payload.questionIndex].answers[action.payload.answerIndex].text = text2
      return examCopy2
    
    default:
      throw new Error("This is an error from the reducer function. You're not supposed to be here...")
  }
}

function App() {

  const [exam, dispatch] = useReducer(reducer,exam1);

  return (
    <div>
      <Header />
      <main>
{/* OLD VERSION: <Exam exam = {exam} answerChanged={answerChanged} examRenamed = {examRenamed}/> */}
        <Exam exam={exam} dispatch={dispatch} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
