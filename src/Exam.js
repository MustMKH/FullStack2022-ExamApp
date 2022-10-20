import Question from "./Question";

const Exam = (props) => {
  return (
    <div>
      <nav ClassName ="exams">
        <ul className="exam-items">
{/*  TODO: Replace with exam id list: */}
          <li>Tentti 1: {props.exam.title}</li>
{/*           <li>Tentti 2</li>
          <li>Tentti 3</li> */}
        </ul>
      </nav>
      <h1 className="main-title">
          Anna tentin otsikko:
      </h1>
      <div>
        <input type="text" onChange={(event) => { props.dispatch({type:"EXAM_RENAMED", payload:{index:props.examIndex,title:event.target.value}})}} value = {props.exam.title}/>
      </div>
      <h2 className="sub-title">Ohje:</h2>
      <ol className="main-help">
          <li>Lue kysymykset läpi huolellisesti.</li>
          <li>Vastaa kysymykseen valitsemalla oikea vastaus.</li>
          <li>Tarkista vastauksesi ja paina "Lähetä".</li>
      </ol>
      <div>
        {props.exam.questions.map((question,index) => <Question dispatch={props.dispatch} examIndex={props.examIndex} questionIndex={index} question={question} />)}
      </div>
      </div>
  );
}

export default Exam;

/*
 * OLD VERSION: <input type="text" onChange={(event) => { props.examRenamed(event.target.value) }} value = {props.exam.name}/>
 * OLD VERSION: {props.exam.questions.map((question,index) => <Question answerChanged = {props.answerChanged} questionIndex = {index} question={question} />)}
 * PREVIOUS VERSION: <input type="text" onChange={(event) => { props.dispatch({type:"EXAM_RENAMED", payload:event.target.value})}} value = {props.exam.name}/>
 * PREVIOUS VERSION: added examIndex = {props.examIndex} above 
 */