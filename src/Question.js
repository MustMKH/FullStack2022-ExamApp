import Answer from "./Answer";
/* 
 * MALLI:
 * <input type="text" onChange={(event) => {props.dispatch({type:"ANSWER_EDITED", payload: {
 *     contents:event.target.value,
 *     answerIndex:props.index,
 *     questionIndex:props.questionIndex,
 *     examIndex:props.examIndex
 *    }})}} value = {props.answer.contents}/>
 */
const Question = (props) => {
  return (
    <div>
      <h5>{props.question.id}&nbsp;{props.question.contents}</h5>
      <div>
        <input type="text" onChange={(event) => {props.dispatch({type:"QUESTION_EDITED", payload: {
            contents:event.target.value,
            questionIndex:props.questionIndex,
            examIndex:props.examIndex}})}} value={props.question.contents} />
      </div>
      <h6>VASTAUSVAIHTOEHDOT:</h6>
      <div className="answers">
        {props.question.answers.map((answer,index) => <Answer dispatch={props.dispatch} examIndex={props.examIndex} index={index} questionIndex={props.questionIndex} answer={answer}/>)}
      </div>
    </div>
  );
}

export default Question;

/*
 * OLD USESTATE VERSION: {props.question.answers.map((answer,index) => <Answer answerChanged={props.answerChanged} index={index} questionIndex={props.questionIndex} answer={answer} />)}
 * PREVIOUS REDUCER VERSION: {props.question.answers.map((answer,index) => <Answer dispatch={props.dispatch} index={index} questionIndex={props.questionIndex} answer={answer} />)}
 */