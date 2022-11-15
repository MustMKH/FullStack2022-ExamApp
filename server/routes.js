const express = require('express')
const router = express.Router()
const records = require('./records')

// TODO: paths, for example '/exams/1/questions/1/answers/1

/* TODO: remove if statements that check if an item is found. This
should be checked in the query handlers instead (see note in records.js) */

// - - - Middleware - - -

// Async handler
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(err) {
            next(err)
        }
    }
}

// - - - Test - - -
router.get('/health', asyncHandler (async (req, res) => {
    res.send("ok")
}))

// - - - ROUTE HANDLERS - - -

// - - - Get list of items - - -

// Get list of users
router.get('/users', asyncHandler (async (req,res) => {
    const users = await records.getUsers()
    res.json(users)
}))

// Get list of exams
router.get('/exams', asyncHandler (async (req, res) => {
    const exams = await records.getExams()
    res.json(exams)
}))

// Get list of questions
router.get('/questions', asyncHandler (async (req, res) => {
    const questions = await records.getQuestions()
    res.json(questions)
}))

// Get list of answer options
router.get('/answer_options', asyncHandler (async (req, res) => {
    const answers = await records.getAnswerOptions()
    res.json(answers)
}))

// - - - Get specific item - - -

// Get specific user
router.get('/users/:id', asyncHandler (async (req, res) => {
    const user = await records.getUser(req.params.id)
    // console.log(user)
    // test if the list is empty: user.length
    if (user) {
        res.json(user)
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// Get specific exam
router.get('/exams/:id', asyncHandler (async (req, res) => {
    const exam = await records.getExam(req.params.id)
    // console.log(exam)
    if (exam) {
        res.json(exam)
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// Get specific question
router.get('/questions/:id', asyncHandler (async (req, res) => {
    const question = await records.getQuestion(req.params.id)
    // console.log(question)
    if (question) {
        res.json(question)
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Get specific answer option
router.get('/answer_options/:id', asyncHandler (async (req, res) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        res.json(answerOption)
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - Create new item - - -

// Create new user
router.post('/users', asyncHandler (async (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.e_mail && req.body.password && req.body.is_admin) {
        const user = await records.createUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            e_mail: req.body.e_mail,
            password: req.body.password,
            is_admin: req.body.is_admin
        })
        res.status(201).json(user)
    } else {
        res.status(400).json( {message: "Missing required information"} )
    }
}))

// Create new exam
router.post('/exams', asyncHandler (async (req, res) => {
    // console.log("routes.js - Ceate new exam - req.body.number:", req.body.number)
    // console.log("routes.js - Ceate new exam - req.body.title:", req.body.title)
        if (req.body.number && req.body.title) {
        const exam = await records.createExam({
            number: req.body.number,
            title: req.body.title
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json( {message: "Missing exam number or title"} )
    }
}))

// Create new question
router.post('/questions', asyncHandler (async (req, res) => {
    console.log("routes.js - Ceate new question - req.body.exam_id:", req.body.exam_id)
    console.log("routes.js - Ceate new question - req.body.number:", req.body.number)
    console.log("routes.js - Ceate new question - req.body.contents:", req.body.contents)
    if (req.body.exam_id && req.body.number && req.body.contents) {
        const question = await records.createQuestion({
            exam_id: req.body.exam_id,
            number: req.body.number,
            contents: req.body.contents
        })
        res.status(201).json(question)
    } else {
        res.status(400).json( {message: "Missing required information"} )
    }
}))

// Create new answer option
router.post('/answer_options', asyncHandler (async (req, res) => {
    if (req.body.question_id && req.body.number && req.body.contents && req.body.is_correct) {
        const answerOption = await records.createAnswerOption({
            question_id: req.body.question_id,
            number: req.body.number,
            contents: req.body.contents,
            is_correct: req.body.is_correct
        })
        res.status(201).json(answerOption)
    } else {
        res.status(400).json( {message: "Missing required information"} )
    }
}))

// - - - Update item - - -

// Update user (name and e-mail)
router.put('/users/:id', asyncHandler(async (req, res) => {
    const user = await records.getUser(req.params.id)
    if (user) {
        await records.updateUser(req.params.id, req.body.first_name, req.body.last_name, req.body.e_mail)
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// Update exam
router.put('/exams/:id', asyncHandler(async (req, res, next) => {
    const exam = await records.getExam(req.params.id)
    console.log("routes.js, router.put, 'exams/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'exams/:id', exam =", exam)
    if (exam) {
        await records.updateExam(req.params.id, req.body.number, req.body.title)
        /* For a put request, it is convention to send in the status code 204, which means no content
        This means that everything went OK but there is nothing to send back
        We need another way to end the request or the server will just hang indefinitely
        and our application will appear to be broken. For this reason, we need to use the express
        end() method: */
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// Update question
router.put('/questions/:id', asyncHandler(async (req, res) => {
    const question = await records.getQuestion(req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.body.number =", req.body.number)
    console.log("routes.js, router.put, 'questions/:id', req.body.contents =", req.body.contents)
    if (question) {
        await records.updateQuestion(req.params.id, req.body.number, req.body.contents)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Update answer option
router.put('/answer_options/:id', asyncHandler(async (req, res) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.body.number =", req.body.number)
    console.log("routes.js, router.put, 'questions/:id', req.body.contents =", req.body.contents)
    console.log("routes.js, router.put, 'questions/:id', req.body.is_correct =", req.body.is_correct)
    // console.log(req.body)
    if (answerOption) {
    // this does not work: if (answerOption && req.body.number && req.body.contents && req.body.is_correct) {
        await records.updateAnswerOption(req.params.id, req.body.number, req.body.contents, req.body.is_correct)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - Delete item - - -

// Delete user
router.delete('/users/:id', asyncHandler(async (req, res, next) => {
    const user = await records.getUser(req.params.id)
    console.log("routes.js, router.delete, '/users/:id', req.params.id=", req.params.id)
    console.log("routes.js, router.delete, '/users/:id', user=", user)
    console.log("routes.js, router.delete, '/users/:id', user.id=", user.id)
    if (user) {
        await records.deleteUser(user.id)
        // because we're only sending back a status and no response, we need to use the end() method:
        res.status(204).end()
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// Delete exam
router.delete('/exams/:id', asyncHandler(async (req, res, next) => {
    const exam = await records.getExam(req.params.id)
    console.log("routes.js, router.delete, '/exams/:id', req.params.id=", req.params.id)
    console.log("routes.js, router.delete, '/exams/:id', exam=", exam)
    console.log("routes.js, router.delete, '/exams/:id', exam.id=", exam.id)
    if (exam) {
        // const id = req.body.id
        await records.deleteExam(exam.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// Delete question
router.delete('/questions/:id', asyncHandler(async (req, res, next) => {
    const question = await records.getQuestion(req.params.id)
    if (question) {
        await records.deleteQuestion(question.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Delete answer option
router.delete('/answer_options/:id', asyncHandler(async (req, res, next) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        await records.deleteAnswerOption(answerOption.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - EXPORTING THE ROUTER - - -
module.exports = router;