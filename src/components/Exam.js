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
          props.dispatch({ type: "EXAM_RENAMED", payload: { index: props.examIndex, title: event.target.value } })
        }} value={props.exam.title} />
      </div>
      <div>
        {props.exam.questions.map((question, index) => <Question dispatch={props.dispatch} examIndex={props.examIndex} questionIndex={index} question={question} />)}
      </div>
    </div>
  );
}

export default Exam;
