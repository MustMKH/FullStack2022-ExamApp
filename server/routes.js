const express = require('express')
const router = express.Router()
const queries = require('./queries')
// const verifyToken = require('./verifyToken')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

// TODO: get name of logged in user (from email)

/* TODO: verifyToken can be used as middleware for all functions that require
         verification: router.use(verifyToken). This can be placed after the
         functions that do not require auth */

// TODO: paths, for example '/exams/1/questions/1/answer_options/1

/* TODO: remove if statements that check if an item is found. This
should be checked in the query handlers instead (see note in queries.js) */

// FIND: ??? and !!!



// - - - Middleware - - -

// Async handler
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}



// - - - Health test - - -
router.get('/health', asyncHandler(async (req, res) => {
    res.send("ok")
}))



// - - - SIGNUP - - -

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body
    let result
    try {
        let hashed = await bcrypt.hash(password, saltRounds)
        result = await queries.signUp(email, hashed)
        console.log("routes.js, router.post, '/signup', result =", result)
    } catch (error) {
        return next(error)
    }
    let token
    try {
        token = jwt.sign(
            { userId: result, email: email },
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
            data: { userId: result, email: email, token: token }
        })
})



// - - - LOGIN - - -

router.post('/login', async (req, res, next) => {
    let { email, password } = req.body
    let existingUser
    // let passwordMatch = false (this is not necessary)
    try {
        existingUser = await queries.login(email)
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
        // Creating jwt token (it has 3 parts: 1. header 2. payload, expiration 3. signature)
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email }, // = payload
            "secretkeyappearshere", // dotenv: recommended, store passwords in a separate file
            { expiresIn: "10h" }
        )
    } catch (error) {
        console.log(error)
        const errMsg = new Error("Error! Something went wrong.")
        return next(error)
    }

    res
        .status(200)
        // .json adds the necessary styling (quotes) to the object
        .json({
            success: true,
            data: {
                userId: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
                token: token
            }
        })
})



// - - - ADMIN CHECK - - -

const isAdmin = async (req, res, next) => {
    let admin
    try {
        console.log("routes.js, isAdmin, argument req.decoded?.email =", req.decoded.email)
        admin = await queries.adminCheck(req.decoded.email)
        if (admin) {
            console.log("routes.js, isAdmin, if, admin =", admin)
            next()
        } else {
            res.status(403).send("Unauthorized access.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

// - - - VERIFY TOKEN - - -

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Data is being requested from the server. Authorization required.")
    console.log("routes.js, verifyToken, token:", token)
    // Authorization: 'Bearer TOKEN'
    if (!token) {
        res.status(200).json({ success: false, message: "Error! Token was not provided." })
    } else {
        console.log("routes.js, verifyToken, token found")
        // Decoding the token
        const decodedToken = jwt.verify(token, "secretkeyappearshere")
        req.decoded = decodedToken
        /* next() with no arguments says "just kidding, I don't actually want to handle this". It goes back in
        and tries to find the next route that would match. In other words, if a route is found, it is rendered.
        If one isn't found, this route handler is ignored and the program moves on to other ones. */
        next()
    }
}

router.use(verifyToken)



// - - - ROUTE HANDLERS - - -

// - - - Get list of items - - -

// Get list of users
router.get('/users', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, get users")
    const users = await queries.getUsers()
    res.json(users)
}))

router.get('/staff', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, get staff")
    const users = await queries.getStaff()
    res.json(users)
}))

// Get list of exams
router.get('/exams', isAdmin, asyncHandler(async (req, res) => {
    const exams = await queries.getExams()
    res.json(exams)
}))

// Get list of all questions
router.get('/questions', isAdmin, asyncHandler(async (req, res) => {
    const questions = await queries.getQuestions()
    res.json(questions)
}))

// Get list of all answer options
router.get('/answer_options', isAdmin, asyncHandler(async (req, res) => {
    const answerOptions = await queries.getAnswerOptions()
    res.json(answerOptions)
}))

// - - - Get questions under specific exam - - -
router.get('/exams/:exam_id/questions', isAdmin, asyncHandler(async (req, res) => {
    const questions = await queries.getQuestionsForExam(req.params.exam_id)
    if (questions.length > 0) {
        res.json(questions)
    } else {
        res.json({ message: "No questions found for the exam id provided" })
    }
}))

// - - - Get answer options under specific question (req.params) / DELETE!!! - - -
router.get('/questions/:question_id/answer_options', isAdmin, asyncHandler(async (req, res) => {
    const answerOptions = await queries.getAnswerOptionsForQuestion(req.params.question_id)
    if (answerOptions.length > 0) {
        res.json(answerOptions)
    } else {
        res.status(404).json({ message: "No question found with the provided id" })
    }
}))

// - - - Get answer options under specific question (req.body) / DELETE - - -
router.get('/answer_options', isAdmin, asyncHandler(async (req, res) => {
    const answerOptions = await queries.getAnswerOptionsForQuestion(req.body.question_id)
    if (answerOptions.length > 0) {
        res.json(answerOptions)
    } else {
        res.json({ message: "No questions found for the exam id provided" })
    }
}))

// - - - Get all answer options for specific exam - - -
router.get('/exams/:exam_id/answer_options', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, AnswerOptionsForExam, req.params.exam_id:", req.params.exam_id)
    const AnswerOptionsForExam = await queries.getAnswerOptionsForExam(req.params.exam_id)
    if (AnswerOptionsForExam?.length > 0) {
        res.json(AnswerOptionsForExam)
    } else {
        res.json({ message: "No answer options found for the exam id provided" })
    }
}))

// - - - Get specific item - - -

// Get specific user
router.get('/users/:id', isAdmin, asyncHandler(async (req, res) => {
    const user = await queries.getUser(req.params.id)
    // test if the list is empty: user.length
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
}))

// Get specific exam
router.get('/exams/:id', isAdmin, asyncHandler(async (req, res) => {
    const exam = await queries.getExam(req.params.id)
    if (exam) {
        res.json(exam)
    } else {
        res.status(404).json({ message: "Exam not found" })
    }
}))

// Get specific question
router.get('/questions/:id', isAdmin, asyncHandler(async (req, res) => {
    const question = await queries.getQuestion(req.params.id)
    if (question) {
        res.json(question)
    } else {
        res.status(404).json({ message: "Question not found" })
    }
}))

// Get specific answer option
router.get('/answer_options/:id', isAdmin, asyncHandler(async (req, res) => {
    const answerOption = await queries.getAnswerOption(req.params.id)
    if (answerOption) {
        res.json(answerOption)
    } else {
        res.status(404).json({ message: "Answer option not found" })
    }
}))

// - - - Create new item - - -

// Create new user - this is handled with registration
/* router.post('/users', isAdmin, asyncHandler(async (req, res) => {
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
        res.status(400).json({ message: "Missing required information" })
    }
})) */

// Create new exam
router.post('/exams', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, createExam, req.body.title:", req.body.title)
    if (req.body.title) {
        const exam = await queries.createExam({
            title: req.body.title
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json({ message: "Exam title required." })
    }
}))

// Create new question - use req.params.exam_id (not req.body.exam_id) ???
router.post('/questions', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, createQuestion, req.body.exam_id:", req.body.exam_id)
    console.log("routes.js, createQuestion, req.body.contents:", req.body.contents)
    if (req.body.exam_id && req.body.contents) {
        const question = await queries.createQuestion({
            exam_id: req.body.exam_id,
            contents: req.body.contents
        })
        res.status(201).json(question)
    } else {
        res.status(400).json({ message: "Missing required information" })
    }
}))

// Create new answer option
router.post('/answer_options', isAdmin, asyncHandler(async (req, res) => {
    if (req.body.question_id && req.body.contents) {
        const answerOption = await queries.createAnswerOption({
            question_id: req.body.question_id,
            contents: req.body.contents
        })
        res.status(201).json(answerOption)
    } else {
        res.status(400).json({ message: "Missing required information" })
    }
}))

// - - - Update item - - -

// Update user's name and email
router.put('/users/:id', isAdmin, asyncHandler(async (req, res) => {
    const user = await queries.getUser(req.params.id)
    if (user) {
        await queries.updateUser(req.params.id, req.body.first_name, req.body.last_name, req.body.email)
        // Without the .end(), the response keeps hanging forever
        res.status(204).end()
    } else {
        res.status(404).json({ message: "User not found" })
    }
}))

// Update exam
router.put('/exams/:id', isAdmin, asyncHandler(async (req, res, next) => {
    const exam = await queries.getExam(req.params.id)
    console.log("routes.js, getExam, req.params.id =", req.params.id)
    console.log("routes.js, getExam, exam =", exam)
    if (exam) {
        await queries.updateExamTitle(req.params.id, req.body.title)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Exam not found" })
    }
}))

// Update question points
router.put('/questions/:id/points', isAdmin, asyncHandler(async (req, res) => {
    const question = await queries.getQuestion(req.params.id)
    console.log("routes.js, getQuestion, req.params.id =", req.params.id)
    console.log("routes.js, getQuestion, req.body.points =", req.body.points)
    if (question) {
        await queries.updateQuestionPoints(req.params.id, req.body.points)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Question not found" })
    }
}))
// Update question contents
router.put('/questions/:id/contents', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, updateQuestionContents, req.params.id =", req.params.id)
    console.log("routes.js, updateQuestionContents, req.body.contents =", req.body.contents)
    const question = await queries.getQuestion(req.params.id)
    if (question) {
        await queries.updateQuestionContents(req.params.id, req.body.contents)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Question not found" })
    }
}))

// Update answer option contents
router.put('/answer_options/:id/contents', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, updateAnswerOptionContents, req.params.id =", req.params.id)
    console.log("routes.js, updateAnswerOptionContents, req.body.contents =", req.body.contents)
    const answerOption = await queries.getAnswerOption(req.params.id)
    // console.log(req.body)
    if (answerOption) {
        await queries.updateAnswerOptionContents(req.params.id, req.body.contents)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Answer option not found" })
    }
}))

// Toggle correct answer
router.put('/answer_options/:id/is_correct', isAdmin, asyncHandler(async (req, res) => {
    console.log("routes.js, toggleCorrectAnswer, req.params.id =", req.params.id)
    console.log("routes.js, toggleCorrectAnswer, req.body.contents =", req.body.is_correct)
    const answerOption = await queries.getAnswerOption(req.params.id)
    // console.log(req.body)
    if (answerOption) {
        await queries.toggleCorrectAnswer(req.params.id, req.body.is_correct)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Answer option not found" })
    }
}))

// - - - Delete item - - -

// Delete user
router.delete('/users/:id', isAdmin, asyncHandler(async (req, res, next) => {
    const user = await queries.getUser(req.params.id)
    console.log("routes.js, getUser, req.params.id=", req.params.id)
    console.log("routes.js, getUser, user=", user)
    console.log("routes.js, getUser, user.id=", user.id)
    if (user) {
        await queries.deleteUser(user.id)
        // because we're only sending back a status and no response, we need to use the end() method:
        res.status(204).end()
    } else {
        res.status(404).json({ message: "User not found" })
    }
}))

// Delete exam
router.delete('/exams/:id', isAdmin, asyncHandler(async (req, res, next) => {
    const exam = await queries.getExam(req.params.id)
    console.log("routes.js, deleteExam, req.params.id=", req.params.id)
    if (exam) {
        await queries.deleteExam(exam.id)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Exam not found" })
    }
}))

// Delete question
router.delete('/questions/:id', isAdmin, asyncHandler(async (req, res, next) => {
    const question = await queries.getQuestion(req.params.id)
    if (question) {
        await queries.deleteQuestion(question.id)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Question not found" })
    }
}))

// Delete answer option
router.delete('/answer_options/:id', isAdmin, asyncHandler(async (req, res, next) => {
    const answerOption = await queries.getAnswerOption(req.params.id)
    if (answerOption) {
        await queries.deleteAnswerOption(answerOption.id)
        res.status(204).end()
    } else {
        res.status(404).json({ message: "Answer option not found" })
    }
}))

// - - - EXPORTING THE ROUTER - - -
module.exports = router;