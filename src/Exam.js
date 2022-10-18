import Question from "./Question";

const Exam = (props) => {
  return (
    <div>
      <nav ClassName ="exams">
        <ul className="exam-items">
{/*  TODO: Replace with exam id list: */}
          <li>TENTTI 1</li>
          <li>TENTTI 2</li>
          <li>TENTTI 3</li>
        </ul>
      </nav>
      <h1 className="main-title">
          {props.exam.id}
      </h1>
      <div>
{/* OLD VERSION: <input type="text" onChange={(event) => { props.examRenamed(event.target.value) }} value = {props.exam.name}/> */}
        <input type="text" onChange={(event) => { props.dispatch({type:"EXAM_RENAMED", payload:event.target.value})}} value = {props.exam.name}/>
      </div>
      <h2 className="sub-title">Ohje:</h2>
      <ol className="main-help">
          <li>Lue kysymykset läpi huolellisesti.</li>
          <li>Vastaa kysymykseen valitsemalla oikea vastaus.</li>
          <li>Tarkista vastauksesi ja paina "Lähetä".</li>
      </ol>
      <div>
{/* VANHA VERSIO: {props.exam.questions.map((question,index) => <Question answerChanged = {props.answerChanged} questionIndex = {index} question={question} />)} */}
        {props.exam.questions.map((question,index) => <Question dispatch={props.dispatch} questionIndex = {index} question={question} />)}
      </div>
      </div>
  );
}

export default Exam;
