// import dataService from '../service/dataService'

const AnswerOption = (props) => {

  const ACTION = {
    // ANSWER_OPTION_ADDED: "ANSWER_OPTION_ADDED",
    ANSWER_OPTION_EDITED: "ANSWER_OPTION_EDITED",
    ANSWER_OPTION_DELETED: "ANSWER_OPTION_DELETED"
  }

  /* const questionId = props.question.id
  console.log("AnswerOption.js, addAnswerOption, questionId:", questionId) */

  const editAnswerOptionContents = async => {
    /*     {
          // TODO: ADD AXIOS REQUEST HERE WITH TRY/CATCH!
          props.dispatch({
            type: "ANSWER_OPTION_EDITED", payload: {
              contents: event.target.value,
              answerOptionIndex: props.answerOptionIndex
            } )
    
      }  */
  }

  const toggleCorrectAnswer = async => {

  }

  const deleteAnswerOption = async => {

  }

  /*   const deleteExam = async (id) => {
      setIsLoading(true);
      const EXAM_URL = `https://localhost:8080/api/exams/${id}`
      console.log("Exams.js, deleteExam, id =", id)
      try {
        const response = await axios.delete(EXAM_URL, {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setExams(exams.filter(exam => exam.exam_id !== id))
        window.location = "/opettaja/tentit/"
        setIsLoading(false)
      } catch (error) {
        console.error(error.message)
      }
      setIsLoading(false)
    } */

  return (
    <div className="answer-option-items">
      <input className="input-answer-option" type="text" onChange={editAnswerOptionContents} placeholder={props.answerOption.contents} />
      <button className='check-square' onClick={toggleCorrectAnswer}><i className="fas fa-check-square" /></button>
      <button className='trash-btn' onClick={deleteAnswerOption}>
        <i className="fas fa-solid fa-trash"></i>
      </button>
    </div>
  );
}

export default AnswerOption;