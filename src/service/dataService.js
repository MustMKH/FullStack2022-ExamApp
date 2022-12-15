import axios from 'axios'

const URL = 'https://localhost:8080/api'
const token = localStorage.getItem('token')
const setHeaders = {
    headers: {
        Authorization: `bearer ${token}`
    }
}

// - - - Get users - - -
const getUsers = async () => {
    const response = await axios.get(`${URL}/users`, setHeaders)
    console.log("dataService.js, getUsers, response.data:", response.data)
    return response.data
}

// - - - Get staff - - -
const getStaff = async () => {
    const response = await axios.get(`${URL}/staff`, setHeaders)
    console.log("dataService.js, getStaff, response.data:", response.data)
    return response.data
}

// - - - Get exams - - -
const getExams = async () => {
    const response = await axios.get(`${URL}/exams`, setHeaders)
    console.log("dataService.js, token", token)
    console.log("dataService.js, getExams, response.data:", response.data)
    return response.data
}

// - - - Get selected exam - - -
const getExam = async (examId) => {
    const response = await axios.get(`${URL}/exams/${examId}`, setHeaders)
    console.log("dataService.js, getExam, response.data:", response.data)
    return response.data
}

// - - - Get questions for the selected exam - - -
const getQuestionsForExam = async (examId) => {
    const response = await axios.get(`${URL}/exams/${examId}/questions`, setHeaders)
    console.log("dataService.js, getQuestions, response.data:", response.data)
    return response.data
}

// - - - Get answer options for questions in the selected exam / EditExam uses this - - -
const getAnswerOptions = async (questionIds) => {
    const response = await axios.get(`${URL}/answer_options`, setHeaders, {
        body: {
            id: questionIds
        }
    })
    console.log("dataService.js, getAnswerOptions, response.data:", response.data)
    return response.data
}

// - - - Get answer options for the selected exam / GetExamData uses this - - -
const getAnswerOptionsForExam = async (examId) => {
    console.log("dataService.js, getAnswerOptionsForExam, examId:", examId)
    const response = await axios.get(`${URL}/exams/${examId}/answer_options`, setHeaders)
    console.log("dataService.js, getAnswerOptionsForExam, response.data:", response.data)
    return response.data
}

// - - - Create new exam - - -
const addExam = async () => {
    console.log("dataService.js, addExam")
    const response = await axios.post(`${URL}/exams`, {
        title: "UUSI TENTTI - MUOKKAA TÄSTÄ"
    }, setHeaders)
    console.log("dataService.js, addExam, response.data:", response.data)
    return response.data
}

// - - - Create new question - - -
const addQuestion = async (examId) => {
    console.log("dataService.js, addQuestion, examId:", examId)
    const response = await axios.post(`${URL}/questions`, {
        contents: "UUSI KYSYMYS - MUOKKAA TÄSTÄ",
        exam_id: examId
    }, setHeaders)
    console.log("dataService.js, addQuestion, response.data:", response.data)
    return response.data
}

// - - - Create new answer option - - -
const addAnswerOption = async (questionId) => {
    const response = await axios.post(`${URL}/answer_options`, {
        contents: "UUSI VASTAUSVAIHTOEHTO - MUOKKAA TÄSTÄ",
        question_id: questionId
    }, setHeaders)
    console.log("dataService.js, addAnswerOption, response.data:", response.data)
    return response.data
}

// - - - Update exam title - - -
const updateExamTitle = async (examId, examTitle) => {
    console.log("dataService.js, updateExamTitle, examId:", examId)
    console.log("dataService.js, updateExamTitle, examTitle:", examTitle)
    const response = await axios.put(`${URL}/exams/${examId}`, {
        title: examTitle
    }, setHeaders)
    console.log("dataService.js, updateExamTitle, response.data:", response.data)
    return response.data
}

// - - - Update question contents - - -
const updateQuestionContents = async (questionId, questionContents) => {
    console.log("dataService.js, updateQuestionContents, questionId:", questionId);
    console.log("dataService.js, updateQuestionContents, questionContents:", questionContents);
    const response = await axios.put(`${URL}/questions/${questionId}/contents`, {
        contents: questionContents
    }, setHeaders)
}

// - - - Update question points - - -
const updateQuestionPoints = async (questionId, questionPoints) => {
    console.log("dataService.js, updateQuestionPoints, questionId:", questionId);
    console.log("dataService.js, updateQuestionPoints, questionPoints:", questionPoints);
    const response = await axios.put(`${URL}/questions/${questionId}/points`, {
        points: questionPoints
    }, setHeaders)
}

// - - - Update answer option contents - - -
const updateAnswerOptionContents = async (answerOptionId, answerOptionContents) => {
    console.log("dataService.js, updateAnswerOptionContents, answerOptionId:", answerOptionId);
    console.log("dataService.js, updateAnswerOptionContents, answerOptionContents:", answerOptionContents);
    const response = await axios.put(`${URL}/answer_options/${answerOptionId}/contents`, {
        contents: answerOptionContents
    }, setHeaders
    )
    // This is an update, no response.data reveived:
    /* console.log("dataService.js, updateAnswerOptionContents, response.data:", response.data)
    return response.data */
}

// - - - Toggle correct answer option - - -
const toggleCorrectAnswer = async (answerOptionId, isCorrect) => {
    const response = await axios.put(`${URL}/answer_options/${answerOptionId}/is_correct`, {
        is_correct: isCorrect
    }, setHeaders)
    console.log("dataService.js, toggleCorrectAnswer, response.data:", response.data)
    return response.data
}

// - - - Delete exam - - -
const deleteExam = async (examId) => {
    console.log("dataService.js, deleteExam, examId:", examId)
    const response = await axios.delete(`${URL}/exams/${examId}`, setHeaders)
    console.log("dataService.js, deleteExam, response.data:", response.data)
    return response.data
}

// - - - Delete Question - - -
const deleteQuestion = async (questionId) => {
    const response = await axios.delete(`${URL}/questions/${questionId}`, setHeaders)
    console.log("dataService.js, deleteQuestion, response.data:", response.data)
    return response.data
}

// - - - Delete answer option - - -
const deleteAnswerOption = async (answerOptionId) => {
    const response = await axios.delete(`${URL}/answer_options/${answerOptionId}`, setHeaders)
    console.log("dataService.js, deleteAnswerOption, response.data:", response.data)
    return response.data
}

const dataService = {
    getUsers,
    getStaff,
    getExams,
    getExam,
    getQuestionsForExam,
    getAnswerOptions,
    getAnswerOptionsForExam,

    addExam,
    addQuestion,
    addAnswerOption,

    updateExamTitle,
    updateQuestionContents,
    updateQuestionPoints,
    updateAnswerOptionContents,
    toggleCorrectAnswer,

    deleteExam,
    deleteQuestion,
    deleteAnswerOption,
}

export default dataService