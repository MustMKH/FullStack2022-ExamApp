import dataService from '../service/dataService'
import AnswerOption from "./AnswerOption"

const Question = (props) => {
  const answerOptions = props.answerOptions
  const questions = props.questions

  const ACTION = {
    ANSWER_OPTION_ADDED: "ANSWER_OPTION_ADDED",
    QUESTION_CONTENTS_EDITED: "QUESTION_CONTENTS_EDITED",
    QUESTION_POINTS_EDITED: "QUESTION_POINTS_EDITED",
    QUESTION_DELETED: "QUESTION_DELETED"
  }

  const questionId = props.question.id

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

  const editQuestionContents = async (event) => {
    try {
      console.log("Question.js, editquestionContents, event.target.value:", event.target.value)
      const questionContents = event.target.value
      const response = await dataService.updateQuestionContents(questionId, questionContents)
      props.dispatch({
        type: ACTION.QUESTION_CONTENTS_EDITED,
        payload: {
          contents: questionContents,
          questionIndex: props.questionIndex,
          questionId: questionId
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const editQuestionPoints = async (event) => {
    try {
      console.log("Question.js, editQuestionPoints, event.target.value:", event.target.value)
      console.log("Question.js, editQuestionPoints, questionId:", questionId)
      const questionPoints = event.target.value
      const response = await dataService.updateQuestionPoints(questionId, questionPoints)
      props.dispatch({
        type: ACTION.QUESTION_POINTS_EDITED,
        payload: {
          points: questionPoints,
          questionIndex: props.questionIndex,
          questionId: questionId
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteQuestion = async () => {
    try {
      const response = await dataService.deleteQuestion(questionId)
      props.dispatch({
        type: ACTION.QUESTION_DELETED,
        payload: { questionIndex: props.questionIndex, questionId: questionId }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  let examPointList = questions.map(({ points }) => points)
  let examPoints = examPointList.reduce((prev, next) => {
    return (prev + next)
  })

  return (
    <div>
      <span className="question-items">
        <input className="input-question" type="text" title='Muokkaa kysymystä' onChange={editQuestionContents} placeholder={props.question.contents} />
        {/* Adding a plus <button> for adding questions, this causes an error:
        onClick={()=> props.dispatch({type:"ADD_QUESTION", payload:{examIndex:props.examIndex}})}
        <button id="big-button" onClick={() => props.dispatch({ type: 'ADD_QUESTION' })}>Lisää uusi kysymys</button> */}

        {/* Adding a minus <button> for deleting questions, this does nothing:
        onClick={()=> props.dispatch({type:"DELETE_QUESTION", payload:{examIndex:props.examIndex}})}*/}
        <button className='trash-btn' title='Poista kysymys' onClick={deleteQuestion}>
          <i className="fas fa-solid fa-trash"></i>
        </button>
      </span>
      <span>
        PISTEET:</span>
      <span><input className="input-points" title='Muokkaa kysymyksen pisteitä' type="text" onChange={editQuestionPoints} placeholder={props.question.points} /></span><span>/{examPoints}
      </span>
      <h4 className="answer-title">Vastausvaihtoehdot:</h4>

      <ol type="A" className="answer-items">
        {
          props.answerOptionsRetrieved && answerOptions.filter(
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
        <button className='small-btn'>Arvo vastausvaihtoehtojen järjestys</button>
      </ol>
    </div>
  );
}

export default Question;