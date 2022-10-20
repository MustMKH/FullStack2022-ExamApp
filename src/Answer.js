const Answer = (props) => {
  return (
    <div> 
      <input type="text" onChange={(event) => {props.dispatch({type:"ANSWER_EDITED", payload: {
        contents:event.target.value,
        answerIndex:props.index,
        questionIndex:props.questionIndex,
        examIndex:props.examIndex
        }})}} value = {props.answer.contents}/>
    </div>
  );
}

export default Answer;

/* 
 * OLD USESTATE VERSION: <input type = "text" onChange={(event)=>{ props.answerChanged(event.target.value,props.index,props.questionIndex)}} value={props.answer.text}/>
 * PREVIOUS REDUCER VERSION:<input type = "text" onChange={(event)=>{props.dispatch({type:"ANSWER_CHANGED", payload: {text:event.target.value,answerIndex:props.index,questionIndex:props.questionIndex}})}} value={props.answer.text}/>
 * 
 * Removed {props.answer.text}
 * 
 * How to implement checkboxes?
 * <input type = "checkbox" /> {props.answer}
 */