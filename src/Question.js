import Answer from "./Answer";

const Question = (props) => {
    return (
        <div>
            <h5>{props.question.id}&nbsp;{props.question.text}</h5>
            <div>
                <input type="text" onChange={(event) => { props.dispatch({type:"QUESTION_CHANGED", payload: {text:event.target.value,questionIndex:props.questionIndex}})}} value={props.question.text} />
            </div>
            <h6>VASTAUSVAIHTOEHDOT:</h6>
            <div className="answers">
{/* OLD VERSION: <div>{props.question.answers.map((answer,index) => <Answer answerChanged={props.answerChanged} index={index} questionIndex={props.questionIndex} answer={answer} />)}</div> */}
                {props.question.answers.map((answer,index) => <Answer dispatch={props.dispatch} index={index} questionIndex={props.questionIndex} answer={answer} />)}
            </div>
        </div>
    );
}

export default Question;
