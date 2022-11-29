import AnswerOption from "./AnswerOption";

const Question = (props) => {

  return (
    <div className="questions">
      <h4>{props.question.id}&nbsp;{props.question.contents}</h4>
      <div>
        <input type="text" onChange={(event) => {
          // TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH!
          props.dispatch({
            type: "QUESTION_EDITED", payload: {
              contents: event.target.value,
              questionIndex: props.questionIndex,
              examIndex: props.examIndex
            }
          })
        }} value={props.question.contents} />
        {/* Adding a plus <button> for adding questions, this causes an error:
        onClick={()=> props.dispatch({type:"ADD_QUESTION", payload:{examIndex:props.examIndex}})}
        <button id="big-button" onClick={() => props.dispatch({ type: 'ADD_QUESTION' })}>Lisää uusi kysymys</button> */}
        <button onClick={() => props.dispatch({ type: "ADD_QUESTION", payload: { examIndex: props.examIndex } })} className='plus-btn'>
          <i className="fas fa-plus-square"></i>
        </button>
        {/* Adding a minus <button> for deleting questions, this does nothing:
        onClick={()=> props.dispatch({type:"DELETE_QUESTION", payload:{examIndex:props.examIndex}})}*/}
        <button className='minus-btn'>
          <i className="fas fa-minus-square"></i>
        </button>
      </div>
      <h4 className="answer-title">Vastausvaihtoehdot:</h4>
      <div className="answers">
        {props.question.answers.map((answer, index) => <AnswerOption dispatch={props.dispatch} examIndex={props.examIndex} index={index} questionIndex={props.questionIndex} answer={answer} />)}
      </div>
      {/* This button has been moved to the Answer.js component:
      <button id='small-button' onClick={()=> props.dispatch({type:"ADD_ANSWER", payload:{questionIndex:props.questionIndex,examIndex:props.examIndex}})}>
        Lisää vastausvaihtoehto
      </button> */}
    </div>
  );
}

export default Question;

/*
 * OLD USESTATE VERSION: {props.question.answers.map((answer,index) => <Answer answerChanged={props.answerChanged} index={index} questionIndex={props.questionIndex} answer={answer} />)}
 * PREVIOUS REDUCER VERSION: {props.question.answers.map((answer,index) => <Answer dispatch={props.dispatch} index={index} questionIndex={props.questionIndex} answer={answer} />)}
 */