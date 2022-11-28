const Answer = (props) => {
  return (
    <div>
      <input type="text" onChange={(event) => {
        // TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH!
        props.dispatch({
          type: "ANSWER_EDITED", payload: {
            contents: event.target.value,
            answerIndex: props.index,
            questionIndex: props.questionIndex,
            examIndex: props.examIndex
          }
        })
      }} value={props.answer.contents} />
      <button onClick={() => {
        props.dispatch({ type: "ADD_ANSWER", payload: { questionIndex: props.questionIndex, examIndex: props.examIndex } })}}
        className='plus-btn'>
        <i className="fas fa-plus-square"></i>
      </button>
      <button className='minus-btn'>
        <i className="fas fa-minus-square"></i>
      </button>
    </div>
  );
}

export default Answer;