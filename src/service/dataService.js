import axios from 'axios'
import { response } from 'express'

const URL = 'https://localhost:8080/api'
const token = localStorage.getItem('token')
const setHeaders = {
    headers: {
        Authorization: `bearer ${token}`
    }
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

// - - - Create new question - - -
const addQuestion = async (examId) => {
    const reponse = await axios.post(`${URL}/questions`, {
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
    const response = await axios.put(`${URL}/exams/${examId}`, {
        title: examTitle
    }, setHeaders)
    console.log("dataService.js, updateExamTitle, response.data:", response.data)
    return response.data
}

// - - - Update question contents - - -

const updateQuestionContents = async (questionId, questionContents) => {
    const response = await axios.put(`${URL}/questions/${questionId}`, {
        contents: questionContents
    }, setHeaders)
    console.log("dataService.js, updateQuestionContents, response.data:", response.data)
    return response.data
}

// - - - Update question points - - -

const updateQuestionPoints = async (questionId, questionPoints) => {
    const response = await axios.put(`${URL}/questions/${questionId}`, {
        points: questionPoints
    }, setHeaders)
    console.log("dataService.js, updateQuestionPoints, response.data:", response.data)
    return response.data
}

// - - - Update answer option contents - - -

const updateAnswerOptionContents = async (answerOptionId, answerOptionContents) => {
    const response = await axios.put(`${URL}/answer_options/${answerOptionId}`, {
        contents: answerOptionContents
    }, setHeaders)
    console.log("dataService.js, updateAnswerOptionContents, response.data:", response.data)
    return response.data
}

// - - - Toggle correct answer option - - -

const toggleCorrectAnswerOption = async (answerOptionId, isCorrect) => {
    const response = await axios.put(`${URL}/answer_options/${answerOptionId}`, {
        is_correct: isCorrect
    }, setHeaders)
    console.log("dataService.js, toggleCorrectAnswerOption, response.data:", response.data)
    return response.data
}

const dataService = {
    getExam,
    getQuestionsForExam,
    getAnswerOptions,
    getAnswerOptionsForExam,

    addQuestion,
    addAnswerOption,

    updateExamTitle,
    updateQuestionContents,
    updateQuestionPoints,
    updateAnswerOptionContents,
    toggleCorrectAnswerOption,
}

export default dataService