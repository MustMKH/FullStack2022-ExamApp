import Answer from "./Answer";

const Question = (props) => {
    return (
        <>
            <div>KYSYMYS:{props.question.text}</div>
            <div>VASTAUSVAIHTOEHDOT:</div>
            <div>{props.question.answers.map((answer,index) => <Answer answerChanged={props.answerChanged} index={index} questionIndex={props.questionIndex} answer={answer} information2={10} />)}</div>
        </>
    );
}

export default Question;



/* original code that cannot be altered by user:
const Question=(props)=>{
    return (
        <div>
        <div>KYSYMYS:{props.question.text}</div>
        <div>Vastausvaihtoehdot:</div>
        <ol>
            <li>{props.question.answers.map(answer=><Answer answer={answer}/>)}</li>
        </ol>    
        </div>
    );
}
*/
