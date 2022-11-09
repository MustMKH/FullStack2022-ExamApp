const express = require('express')
const router = express.Router()
const records = require('./records')


// - - - Middleware - - -

// async handler
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(err) {
            next(err)
        }
    }
}

// Toimii!
router.get('/health', asyncHandler (async (req, res) => {
    res.send("ok")
}))

/* - - - ROUTE HANDLERS - - -
??? Is the full path required? '/exams/questions/answerOptions' or just '/answerOptions'?*/

// - - - Get list of items - - -

// get list of users
router.get('/users', asyncHandler (async (req,res) => {
//    const users = await records.getUsers()
//    res.json(users)
    res.send("Trallallaa!")
}))

// get list of exams
router.get('/exams', asyncHandler (async (req, res) => {
    const exams = await records.getExams()
    res.json(exams)
}))

// get list of questions
router.get('/questions', asyncHandler (async (req, res) => {
    const questions = await records.getQuestions()
    res.json(questions)
}))

// get list of answer options
router.get('/answerOptions', asyncHandler (async (req, res) => {
    const answers = await records.getAnswerOptions()
    res.json(answers)
}))

// - - - Get specific item - - -

// get a specific user

router.get('/users/:id', asyncHandler (async (req, res) => {
    const user = await records.getUser(req.params.id)
    console.log(user)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// get a specific exam

router.get('exams/:id', asyncHandler (async (req,res) => {
    const exam = await records.getQuestion(req.params.id)
    if (exam) {
        res.json(exam)
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// get a specific question

router.get('/questions/:id', asyncHandler (async (req,res) => {
    const question = await records.getQuestion(req.params.id)
    if (question) {
        res.json(question)
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// get a specific answer option

router.get('/answerOptions/:id', asyncHandler (async (req,res) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        res.json(answerOption)
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - Create new item - - -

// Create a new user

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

// create a new exam
router.post('/', asyncHandler (async (req, res) => {
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

// create a new question - the exam id needs to be specified???
router.post('/:id/questions', asyncHandler (async (req, res) => {
    if (req.body.number && req.body.title) {
        const question = await records.createQuestion({
            number: req.body.number,
            contents: req.body.contents
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json( {message: "Missing question number or contents"} )
    }
}))

// create a new answer option - the question id needs to be specified???
router.post('/questions/:id/answerOptions', asyncHandler (async (req, res) => {
    if (req.body.number && req.body.title) {
        const answerOption = await records.createAnswerOption({
            number: req.body.number,
            contents: req.body.contents
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json( {message: "Missing answer option number or contents"} )
    }
}))

// - - - Update item - - -

// update user (name and e-mail)

router.put('/users/:id', asyncHandler(async (req, res) => {
    const user = await records.getUser(req.params.id)
    if (user) {
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.e_mail = req.body.e_mail
            await records.updateUser(user)
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// update exam

router.put('/:id', asyncHandler(async (req, res) => {
    const exam = await records.getExam(req.params.id)
    if (exam) {
        exam.number = req.body.number
        exam.title = req.body.title
        await records.updateExam(exam)
        /* For a put request, it is convention to send in the status code 204, which means no content
        This means that everything went OK but there is nothing to send back
        We need another way to end the request or the server will just hang indefinitely
        and our application will appear to be broken. For this reason, we need to use the express 
        end() method: */
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
    records.updateExam()
}))

// update question

router.put('/questions/:id', asyncHandler(async (req, res) => {
    const question = await records.getQuestion(req.params.id)
    if (question) {
        question.number = req.body.number
        question.contents = req.body.contents
        await records.updateQuestion(question)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
    records.updateQuestion()
}))

// update answer option

router.put('/answerOptions/:id', asyncHandler(async (req, res) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        answerOption.number = req.body.number
        answerOption.contents = req.body.contents
        await records.updateAnswerOption(answerOption)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
    records.updateAnswerOption()
}))

// - - - Delete item - - -

// delete user

router.delete('/users/:id', asyncHandler(async (req, res, next) => {
    const user = await records.getUser(req.params.id)
    if (user) {
        await records.deleteUser(user)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// delete exam

router.delete('/:id', asyncHandler(async (req, res, next) => {
    const exam = await records.getExam(req.params.id)
    if (exam) {
        await records.deleteExam(exam)
        // because we're only sending back a status and no response, we need to use the end() method:
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// delete question

router.delete('/questions/:id', asyncHandler(async (req, res, next) => {
    const question = await records.getQuestion(req.params.id)
    if (question) {
        await records.deleteQuestion(question)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// delete answer option

router.delete('/answerOptions/:id', asyncHandler(async (req, res, next) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        await records.deleteAnswerOption(answerOption)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - EXPORTING THE ROUTER - - - 
module.exports = router;