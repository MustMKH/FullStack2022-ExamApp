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

// - - - ROUTE HANDLERS - - -

// - - - Get list of items - - -

// get list of exams
router.get('/exams', asyncHandler (async (req, res) => {

}))

// get list of questions
router.get('/exams/questions', async)

// get list of answers
router.get('/exams/questions/answers', async)

// - - - Get specific item - - -

// get a specific exam

// get a specific question

// get a specific answer

// - - - Create new item - - -

// create a new exam
router.post('/exams', asyncHandler (async (req, res) => {
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

// create a new question
router.post('/exams/:examId/questions', asyncHandler (async (req, res) => {
    if (req.body.number && req.body.title) {
        const question = await records.createQuestion({
            number: req.body.number,
            contents: req.body.contents
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json( {message: "Missing question number or contents."} )
    }
}))

// create a new answer
router.post('/questions/:questionId/answerOptions', asyncHandler (async (req, res) => {
    if (req.body.number && req.body.title) {
        const answerOption = await records.createAnswerOption({
            number: req.body.number,
            contents: req.body.contents
        })
        res.status(201).json(exam)
    } else {
        res.status(400).json( {message: "Missing answer option number or contents."} )
    }
}))

// - - - Delete item - - -

// delete exam

router.delete("/exams/:id", asyncHandler(async(req, res, next) => {
    const exam = await records.getExam(req.params.id)
    if (exam) {
        await records.deleteExam(exam)
        // because we're only sending back a status, not a response, we need to use the end() method:
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Exam Not Found"} )
    }
}))

// delete question

router.delete("/questions/:id", asyncHandler(async(req, res, next) => {
    const question = await records.getQuestion(req.params.id)
    if (question) {
        await records.deleteQuestion(question)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Question Not Found"} )
    }
}))

// delete answer

router.delete("/answerOptions/:id", asyncHandler(async(req, res, next) => {
    const answerOption = await records.getAnswerOption(req.params.id)
    if (answerOption) {
        await records.deleteAnswerOption(answerOption)
        res.status(204).end()
    } else {
        res.status(404).json( {message: "Answer Option Not Found"} )
    }
}))

// - - - EXPORTING THE ROUTER - - - 
module.exports = router;