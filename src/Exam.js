import Question from "./Question";

const Exam = (props) => {
  console.log("tulostetaan props.exam", props.exam)
  return (
    <>
      <div>Tentin nimi:{props.exam.name}</div>
      <input type="text" onChange={(event) => { props.examRenamed(event.target.value) }} value = {props.exam.name}/>
      <div>Questions:</div>
      <div>{props.exam.questions.map((question,index) => <Question answerChanged = {props.answerChanged} questionIndex = {index} question={question} />)}</div>
    </>
  );
}

export default Exam;

/* The original version below. Moved question list to App.js. 

import Question from "./Question";

const Exam = () => {
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

export default Exam; */