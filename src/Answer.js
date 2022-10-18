const Answer = (props) => {
    return (
        <div> 
            <div>{/* {props.answer.text} */}
{/* OLD VERSION: <input type = "text" onChange={(event)=>{ props.answerChanged(event.target.value,props.index,props.questionIndex)}} value={props.answer.text}/> */}
            <input type = "text" onChange={(event)=>
                {props.dispatch({type:"ANSWER_CHANGED", payload: 
                    {text:event.target.value,answerIndex:props.index,questionIndex:props.questionIndex}})}} value={props.answer.text}/>
            </div>
        </div>
    );
}

export default Answer;
