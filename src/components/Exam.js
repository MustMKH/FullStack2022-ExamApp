import Question from "./Question";

const Exam = (props) => {
  return (
    <div>
      <h1 className="main-title">
        {props.exam.id}: {props.exam.title}
      </h1>
      <div>
        <input type="text" onChange={(event) => {
// TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH!
          props.dispatch({type:"EXAM_RENAMED", payload:{index:props.examIndex,title:event.target.value}})}} value = {props.exam.title}/>
      </div>
{/* TODO: Add instructions with an option to edit them
       <h2 className="sub-title">Ohje:</h2>
      <ol className="main-help">
          <li>Lue kysymykset läpi huolellisesti.</li>
          <li>Vastaa kysymykseen valitsemalla oikea vastaus.</li>
          <li>Tarkista vastauksesi ja paina "Lähetä".</li>
      </ol> */}
      <div>
        {props.exam.questions.map((question,index) => <Question dispatch={props.dispatch} examIndex={props.examIndex} questionIndex={index} question={question} />)}
{/*         <button onClick={()=> props.dispatch({type:"ADD_QUESTION", payload:{examIndex:props.examIndex}})} className='plus-btn'>
          <i className="fas fa-plus-square"></i>
        </button> */}

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