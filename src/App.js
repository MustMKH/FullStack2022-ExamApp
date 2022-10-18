import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import TitleSection from './TitleSection';
import Exam from "./Exam";
import Event from "./events";
import {useState} from "react";

let answer1 = {text: "En osaa sanoa.", isCorrect: false};
let answer2 = {text: "Tyhmä kysymys, kysy joku toinen.", isCorrect: false};
let answer3 = {text: "Kanada.", isCorrect: false};
let answer4 = {text: "Koska valospektrissä sininen aalto on lyhytaaltoista ja siroaa eniten.", isCorrect: true};
let answer5 = {text: "-13", isCorrect: false};
let answer6 = {text: "0", isCorrect: false};
let answer7 = {text: "42", isCorrect: true};
let answer8 = {text: "∞", isCorrect: false};
let answer9 = {text: "Violetiksi.", isCorrect: false};
let answer10 = {text: "Ne eivät muuta väriä.", isCorrect: true};
let answer11 = {text: "Punaiseksi.", isCorrect: false};
let answer12 = {text: "Miksi?", isCorrect: true};
let answer13 = {text: "Sille", isCorrect: true};
let answer14 = {text: "tais", isCorrect: true};
let answer15 = {text: "käydä", isCorrect: true};
let answer16 = {text: "kehnosti.", isCorrect: true};
let answer17 = {text: "Juu.", isCorrect: true};
let answer18 = {text: "Ei.", isCorrect: false};
let answer19 = {text: "Ehkä.", isCorrect: false};

let question1 = {text: "Miksi taivas on sininen?", answers: [answer1, answer2, answer3, answer4]};
let question2 = {text: "Mikä on elämän tarkoitus?", answers: [answer5, answer6, answer7, answer8]}
let question3 = {text: "Jos kuristat smurffia, minkä väriseksi sen kasvot muuttuvat?", answers: [answer9, answer10, answer11, answer12]};
let question4 = {text: "Jos jäniksenkäpälä tuottaa onnea, mitä jänikselle tapahtui?", answers: [answer13, answer14, answer15, answer16]};
let question5 = {text: "Tämä on toisen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question6 = {text: "Tämä on toisen tentin toka kysymys", answers: [answer17, answer18, answer19]};
let question7 = {text: "Tämä on kolmannen tentin eka kysymys", answers: [answer17, answer18, answer19]};
let question8 = {text: "Tämä on kolmannen tentin toka kysymys", answers: [answer17, answer18, answer19]};

let exam1 = {name: "Tentti 1", questions: [question1, question2, question3, question4]};
let exam2 = {name: "Tentti 2", questions: [question5, question6]};
let exam3 = {name: "Tentti 3", questions: [question7, question8]};

function App() {
  const [exam, setExam] = useState(exam1);

  const examRenamed = (name) => {
    /* TAPA 1:
    *  const examCopy = JSON.parse(JSON.stringify(exam))
    *  examCopy.name = name
    *  TAPA 2:
    *  const examCopy = {...exam}
    *  TAPA 3:
    *  "optimoiden"*/ 
    const examCopy = {...exam};
    setExam(examCopy);
    console.log(examCopy);
  }

  const answerChanged = (text,answerIndex,questionIndex) => {
    /* TAPA 1:
     * const examCopy = JSON.parse(JSON.stringify(exam))
     * examCopy.questions[questionIndex].answers[answerIndex].text = text
     * TAPA 2
     * "optimoiden:" */
    const examCopy = {...exam}
    examCopy.questions = [...examCopy.questions]
    examCopy.questions[questionIndex].answers = [...examCopy.questions[questionIndex].answers]
    examCopy.questions[questionIndex].answers[answerIndex].text = text

    setExam(examCopy)
    console.log(examCopy)
  }


  return (
    <div>
      <Header />
      <TitleSection/>
      <div>
        <Exam exam = {exam} answerChanged={answerChanged} examRenamed = {examRenamed}/>
      </div>
      <Event />
      <Footer />
    </div>
  );
}

export default App;



/* const Exam = () => {
    let answer1 = {text: "En osaa sanoa.", isCorrect: false}
    let answer2 = {text: "Tyhmä kysymys, kysy joku toinen.", isCorrect: false}
    let answer3 = {text: "Kanada.", isCorrect: false}
    let answer4 = {text: "Koska valospektrissä sininen aalto on lyhytaaltoista ja siroaa eniten.", isCorrect: true}
    let answer5 = {text: "-13", isCorrect: false}
    let answer6 = {text: "0", isCorrect: false}
    let answer7 = {text: "42", isCorrect: true}
    let answer8 = {text: "∞", isCorrect: false}
    let answer9 = {text: "Violetiksi.", isCorrect: false}
    let answer10 = {text: "Ne eivät muuta väriä.", isCorrect: true}
    let answer11 = {text: "Punaiseksi.", isCorrect: false}
    let answer12 = {text: "Miksi?", isCorrect: true}
    let answer13 = {text: "Sille", isCorrect: true}
    let answer14 = {text: "tais", isCorrect: true}
    let answer15 = {text: "käydä", isCorrect: true}
    let answer16 = {text: "kehnosti.", isCorrect: true}

    let question1 = {text: "Miksi taivas on sininen?", answers: [answer1, answer2, answer3, answer4]}
    let question2 = {text: "Mikä on elämän tarkoitus?", answers: [answer5, answer6, answer7, answer8]}
    let question3 = {text: "Jos kuristat smurffia, minkä väriseksi sen kasvot muuttuvat?", answers: [answer9, answer10, answer11, answer12]}
    let question4 = {text: "Jos jäniksenkäpälä tuottaa onnea, mitä jänikselle tapahtui?", answers: [answer13, answer14, answer15, answer16]}

    let exam1 = {text: "Tentti 1", questions: [question1, question2, question3, question4]}

    return (
        <header>
            <nav ClassName ="exams">
                <ul className="exam-items">
                    <li>Tentti 1</li>
                    <li>Tentti 2</li>
                    <li>Tentti 3</li>
                </ul>
            </nav>
            {exam1.questions.map(question=><div><Question question={question}/></div>)}    
        </header>
    );
};

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Exam />
      <Event />
      <Footer />
    </div>
  );
}

export default App; */



/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
