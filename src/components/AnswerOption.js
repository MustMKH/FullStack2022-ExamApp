import dataService from "../service/dataService"

// TODO: The order of answer options changes after every change

// TODO: Page refresh is needed after every change

const AnswerOption = (props) => {
  const answerOptionId = props.answerOption.id
  let isCorrect = props.answerOption.is_correct

  const ACTION = {
    ANSWER_OPTION_CONTENTS_EDITED: "ANSWER_OPTION_CONTENTS_EDITED",
    TOGGLE_CORRECT_ANSWER: "TOGGLE_CORRECT_ANSWER",
    ANSWER_OPTION_DELETED: "ANSWER_OPTION_DELETED"
  }

  const editAnswerOptionContents = async (event) => {
    try {
      console.log("AnswerOption.js, editAnswerOptionContents, event.target.value:", event.target.value)
      const answerOptionContents = event.target.value
      const response = await dataService.updateAnswerOptionContents(answerOptionId, answerOptionContents)
      props.dispatch({
        type: ACTION.ANSWER_OPTION_CONTENTS_EDITED,
        payload: {
          contents: answerOptionContents,
          answerOptionIndex: props.answerOptionIndex,
          answerOptionId: answerOptionId
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const toggleCorrectAnswer = async (event) => {
    try {
      console.log("AnswerOption.js, editAnswerOptionContents, event.target.value:", event.target.value)
      console.log("AnswerOption.js, editAnswerOptionContents, !isCorrect:", !isCorrect)
      console.log("AnswerOption.js, editAnswerOptionContents, isCorrect:", isCorrect)
      // console.log("AnswerOption.js, editAnswerOptionContents, correctAnswer:", correctAnswer)
      const response = await dataService.toggleCorrectAnswer(answerOptionId, !isCorrect)
      props.dispatch({
        type: ACTION.TOGGLE_CORRECT_ANSWER,
        payload: {
          isCorrect: !isCorrect,
          answerOptionIndex: props.answerOptionIndex,
          answerOptionId: answerOptionId
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteAnswerOption = async () => {
    try {
      const response = await dataService.deleteAnswerOption(answerOptionId)
      props.dispatch({
        type: ACTION.ANSWER_OPTION_DELETED,
        payload: { answerOptionIndex: props.answerOptionIndex, answerOptionId: answerOptionId }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="answer-option-items">
      <input className="input-answer-option" type="text" title='Muokkaa vastausvaihtoehtoa' onChange={editAnswerOptionContents} placeholder={props.answerOption.contents} />
      {/* <input className="checkbox" defaultChecked={isCorrect} type="checkbox" onChange={toggleCorrectAnswer} /> */}
      <button className='check-square' title='Aseta oikea vastaus' style={{ color: isCorrect ? "lime" : "gray" }} onClick={toggleCorrectAnswer}><i className="fas fa-check-square" /></button>
      <button className='trash-btn' title='Poista vastausvaihtoehto' onClick={deleteAnswerOption}>
        <i className="fas fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

export default AnswerOption;