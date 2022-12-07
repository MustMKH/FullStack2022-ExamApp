import dataService from '../service/dataService'
import AnswerOption from "./AnswerOption"

const Question = (props) => {
  const answerOptions = props.answerOptions

  const ACTION = {
    ANSWER_OPTION_ADDED: "ANSWER_OPTION_ADDED",
    QUESTION_CONTENTS_EDITED: "QUESTION_CONTENTS_EDITED",
    QUESTION_POINTS_EDITED: "QUESTION_POINTS_EDITED",
    QUESTION_DELETED: "QUESTION_DELETED"
  }

  const questionId = props.question.id
  console.log("Question.js, addAnswerOption, questionId:", questionId)

  const addAnswerOption = async () => {
    console.log("AnswerOption.js, addAnswerOption")
    try {
      const response = await dataService.addAnswerOption(questionId)
      props.dispatch({
        type: ACTION.ANSWER_OPTION_ADDED,
        payload: { questionIndex: props.questionIndex }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const editQuestionContents = async () => {
    /*     props.dispatch({
          type: "QUESTION_CONTENTS_EDITED", payload: {
            contents: event.target.value,
            questionIndex: props.question.index
          }
        }) */
  }

  const editQuestionPoints = async () => {
    /*     props.dispatch({
          type: "QUESTION_POINTS_EDITED", payload: {
            points: event.target.value,
            questionIndex: props.question.index
          }
        }) */
  }

  const deleteQuestion = async () => {

  }

  return (
    <div>
      <span className="question-items">
        <input className="input-question" type="text" onChange={editQuestionContents} placeholder={props.question.contents} />
        {/* Adding a plus <button> for adding questions, this causes an error:
        onClick={()=> props.dispatch({type:"ADD_QUESTION", payload:{examIndex:props.examIndex}})}
        <button id="big-button" onClick={() => props.dispatch({ type: 'ADD_QUESTION' })}>Lisää uusi kysymys</button> */}

        {/* Adding a minus <button> for deleting questions, this does nothing:
        onClick={()=> props.dispatch({type:"DELETE_QUESTION", payload:{examIndex:props.examIndex}})}*/}
        <button className='trash-btn' onClick={deleteQuestion}>
          <i className="fas fa-solid fa-trash"></i>
        </button>
      </span>
      <span>
        PISTEET:</span>
      <span><input className="input-points" type="text" onClick={editQuestionPoints} placeholder={props.question.points} /></span><span>/{10 * props.questions.length}
      </span>
      <h4 className="answer-title">Vastausvaihtoehdot:</h4>

      <ol type="A" className="answer-items">
        {
          answerOptions.filter(
            (answerOption) => answerOption.question_id === props.question.id
          ).map(
            (answerOption, index) =>
              <li key={index}>
                <AnswerOption
                  exam={props.exam}
                  questions={props.questions}
                  question={props.question}
                  questionIndex={props.questionIndex}
                  answerOption={answerOption}
                  answerOptionIndex={index}
                  dispatch={props.dispatch} />
              </li>
          )}<button className='small-btn' onClick={addAnswerOption}>Lisää uusi vastausvaihtoehto</button>
      </ol>
    </div>
  );
}

export default Question;