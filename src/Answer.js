const Answer = (props) => {
    return (
        <div> 
            <div>{props.answer.text}
            <input type = "text" onChange={(event)=>{ props.answerChanged(event.target.value,props.index,props.questionIndex)}} value ={props.answer.text}/>
            </div>
            <div>{props.information2}</div>
        </div>
    );
}

export default Answer;
