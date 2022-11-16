const express = require('express')
const router = express.Router()
const queries = require('./queries')
const verifyToken = require('.verifyToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

// TODO: paths, for example '/exams/1/questions/1/answers/1

/* TODO: remove if statements that check if an item is found. This
should be checked in the query handlers instead (see note in queries.js) */

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


// - - - AUTHENTICATION - - -

/* let password = "12345"
let email = "erkki@esimerkki.net" */

// Handling post request for signup
router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body
    let result
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await pool.query("INSERT INTO user_data (email, password) VALUES ($1, $2) returning id", [email, hashed]) // queries.js: signUp !!!
    } catch (error) {
        return next(error)
    }
    let token
    try {
        token = jwt.sign(
            { userId: result.rows[0].id, email: email },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        )
    } catch (error) {
        const errMsg = new Error("Error! Something went wrong.")
        return next(error)
    }
    res
        .status(201)
        .json({
            success: true,
            data: { userId: result.rows[0].id, email: email, token: token }
        })
})

// Handling post request for login
router.post('/login', async (req, res, next) => {
    let { email, password } = req.body

    let existingUser
    // let passwordMatch = false
    try {
        let result = await pool.query ("SELECT * FROM user_data WHERE email = $1", [email]) // queries.js: login !!!
        existingUser = { password: result.rows[0].password, email: result.rows[0].email, id: result.rows[0].id }
        passwordMatch = await bcrypt.compare(password, existingUser.password)
    } catch (error) {
        const errMsg = new Error("Error! Something went wrong.")
        return next(error)
    }

    if (!existingUser || !passwordMatch) {
        const error = Error("Virheellinen käyttäjätunnus tai salasana.")
        return next(error)
    }
    let token
    try {
        // Creating jwt token
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        )
    } catch (error) {
        console.log(error)
        const errMsg = new Error("Error! Something went wrong.")
        return next(error)
    }

    res
        .status(200)
        .json({
            success: true,
            data: {
                userId: existingUser.id,
                email: existingUser.email,
                token: token
            }
        })
})

router.use(verifyToken)



// - - - ROUTE HANDLERS - - -

// - - - Get list of items - - -

// Get list of users
router.get('/users', asyncHandler (async (req,res) => {
    console.log("routes.js, router.get, '/users, req.decoded =", req.decoded)
    console.log("Data is being requested from the server. Authorization required.")
    const users = await queries.getUsers()
    res.json(users)
}))

// Get list of exams
router.get('/exams', asyncHandler (async (req, res) => {
    const exams = await queries.getExams()
    res.json(exams)
}))

// Get list of questions
router.get('/questions', asyncHandler (async (req, res) => {
    const questions = await queries.getQuestions()
    res.json(questions)
}))

// Get list of answer options
router.get('/answer_options', asyncHandler (async (req, res) => {
    const answers = await queries.getAnswerOptions()
    res.json(answers)
}))

// - - - Get specific item - - -

// Get specific user
router.get('/users/:id', asyncHandler (async (req, res) => {
    const user = await queries.getUser(req.params.id)
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
    const exam = await queries.getExam(req.params.id)
    // console.log(exam)
    if (exam) {
        res.json(exam)
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// Get specific question
router.get('/questions/:id', asyncHandler (async (req, res) => {
    const question = await queries.getQuestion(req.params.id)
    // console.log(question)
    if (question) {
        res.json(question)
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Get specific answer option
router.get('/answer_options/:id', asyncHandler (async (req, res) => {
    const answerOption = await queries.getAnswerOption(req.params.id)
    if (answerOption) {
        res.json(answerOption)
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - Create new item - - -

// Create new user
router.post('/users', asyncHandler (async (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.email && req.body.password && req.body.is_admin) {
        const user = await queries.createUser({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
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
        const exam = await queries.createExam({
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
        const question = await queries.createQuestion({
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
        const answerOption = await queries.createAnswerOption({
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
    const user = await queries.getUser(req.params.id)
    if (user) {
        await queries.updateUser(req.params.id, req.body.first_name, req.body.last_name, req.body.email)
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// Update exam
router.put('/exams/:id', asyncHandler(async (req, res, next) => {
    const exam = await queries.getExam(req.params.id)
    console.log("routes.js, router.put, 'exams/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'exams/:id', exam =", exam)
    if (exam) {
        await queries.updateExam(req.params.id, req.body.number, req.body.title)
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
    const question = await queries.getQuestion(req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.body.number =", req.body.number)
    console.log("routes.js, router.put, 'questions/:id', req.body.contents =", req.body.contents)
    if (question) {
        await queries.updateQuestion(req.params.id, req.body.number, req.body.contents)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Update answer option
router.put('/answer_options/:id', asyncHandler(async (req, res) => {
    const answerOption = await queries.getAnswerOption(req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.params.id =", req.params.id)
    console.log("routes.js, router.put, 'questions/:id', req.body.number =", req.body.number)
    console.log("routes.js, router.put, 'questions/:id', req.body.contents =", req.body.contents)
    console.log("routes.js, router.put, 'questions/:id', req.body.is_correct =", req.body.is_correct)
    // console.log(req.body)
    if (answerOption) {
    // this does not work: if (answerOption && req.body.number && req.body.contents && req.body.is_correct) {
        await queries.updateAnswerOption(req.params.id, req.body.number, req.body.contents, req.body.is_correct)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - Delete item - - -

// Delete user
router.delete('/users/:id', asyncHandler(async (req, res, next) => {
    const user = await queries.getUser(req.params.id)
    console.log("routes.js, router.delete, '/users/:id', req.params.id=", req.params.id)
    console.log("routes.js, router.delete, '/users/:id', user=", user)
    console.log("routes.js, router.delete, '/users/:id', user.id=", user.id)
    if (user) {
        await queries.deleteUser(user.id)
        // because we're only sending back a status and no response, we need to use the end() method:
        res.status(204).end()
    } else {
        res.status(404).json( {message: "User not found"} )
    }
}))

// Delete exam
router.delete('/exams/:id', asyncHandler(async (req, res, next) => {
    const exam = await queries.getExam(req.params.id)
    console.log("routes.js, router.delete, '/exams/:id', req.params.id=", req.params.id)
    console.log("routes.js, router.delete, '/exams/:id', exam=", exam)
    console.log("routes.js, router.delete, '/exams/:id', exam.id=", exam.id)
    if (exam) {
        // const id = req.body.id
        await queries.deleteExam(exam.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam not found"} )
    }
}))

// Delete question
router.delete('/questions/:id', asyncHandler(async (req, res, next) => {
    const question = await queries.getQuestion(req.params.id)
    if (question) {
        await queries.deleteQuestion(question.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question not found"} )
    }
}))

// Delete answer option
router.delete('/answer_options/:id', asyncHandler(async (req, res, next) => {
    const answerOption = await queries.getAnswerOption(req.params.id)
    if (answerOption) {
        await queries.deleteAnswerOption(answerOption.id)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer option not found"} )
    }
}))

// - - - EXPORTING THE ROUTER - - -
module.exports = router;