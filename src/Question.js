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
