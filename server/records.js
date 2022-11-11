//const fs = require('fs')
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: 'admin',
    port: 5432,
})

// TODO: FIND "!!!" (params and return statements)
// TODO: SEPARATE FILES FOR USERS, EXAMS, QUESTIONS AND ANSWERS!!!

/* ??? Removed all pool.end()s because:
Error: Called end on pool more than once
    at BoundPool.end (C:\Users\musto\OneDrive\Tiedostot\Ohjelmointi\ReactApps\tenttisovellus\node_modules\pg-pool\index.js:434:19)
    at Object.getExams (C:\Users\musto\OneDrive\Tiedostot\Ohjelmointi\ReactApps\tenttisovellus\server\records.js:45:10)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async C:\Users\musto\OneDrive\Tiedostot\Ohjelmointi\ReactApps\tenttisovellus\server\routes.js:36:19
    at async C:\Users\musto\OneDrive\Tiedostot\Ohjelmointi\ReactApps\tenttisovellus\server\routes.js:12:13
[nodemon] app crashed - waiting for file changes before starting...*/

/* ??? Can the records be stored both to db and json file?
let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' }) */

// - - - Get list of items - - -

// Get list of users
const getUsers = async () => {
    // console.log("records.js getUser no parameter")
    const text = 'SELECT id, first_name, last_name, e_mail FROM user_data'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get list of exams
const getExams = async () => {
    // console.log("records.js getExams no parameter")
    const text = 'SELECT * FROM exam'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get list of questions
const getQuestions = async () => {
    // console.log("records.js getQuestions no parameter")
    const text = 'SELECT * FROM question'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get list of answer options
const getAnswerOptions = async () => {
    const text = 'SELECT * FROM answer_option'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific user
const getUser = async (id) => {
    // console.log("records.js getUser parameter id =", id)
    const text = `SELECT id, first_name, last_name, e_mail FROM user_data WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific exam
const getExam = async (id) => {
    // console.log("records.js getExam parameter id=", id)
    const text = `SELECT * FROM exam WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific question
const getQuestion = async (id) => {
    // console.log("records.js getQuestion parameter id=", id)
    const text = `SELECT * FROM question WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific answer option
const getAnswerOption = async (id) => {
    const text = `SELECT * FROM answer_option WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}
// Create new user
const createUser = async (params) => {
    try {
        const text = 'INSERT INTO user_data (first_name, last_name, e_mail, password, is_admin) VALUES ($1, $2, $3, $4, $5)'
        const values = [params.first_name, params.last_name, params.e_mail, params.password, params.is_admin]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Create new exam
const createExam = async (oiskoNääVaikParams) => {
    // console.log("records.js createExam params.number and params.title =", oiskoNääVaikParams.number, oiskoNääVaikParams.title)
    try {
        const text = 'INSERT INTO exam (number, title) VALUES ($1, $2)'
        const values = [oiskoNääVaikParams.number, oiskoNääVaikParams.title]
        const result = await pool.query(text, values)
        // No need for return? return result.rows[0] or RETURNING * ???
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Create new question
const createQuestion = async (params) => {
    console.log("records.js createQuestion params.exam_id =", params.exam_id)
    console.log("records.js createQuestion params.number =", params.number)
    console.log("records.js createQuestion params.contents =", params.contents)
    try {
        const text = "INSERT INTO question (exam_id, number, contents) VALUES ($1, $2, $3)"
        values = [params.exam_id, params.number, params.contents]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Create new answer option
const createAnswerOption = async (params) => {
    try {
        const text = "INSERT INTO answer_option (question_id, number, contents, is_correct) VALUES ($1, $2, $3, $4)"
        const values = [params.question_id, params.number, params.contents, params.is_correct]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// updateUser !!!

const updateUser = async (req, res) => {
    try {
        const text = (`UPDATE user_data SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', e_mail = '${req.body.e_mail}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// updateExam !!!

const updateExam = async (req, res) => {
    try {
        const text = (`UPDATE exam SET number = '${req.body.number}', title = '${req.body.title}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// updateQuestion !!!

const updateQuestion = async (req, res) => {
    try {
        const text = (`UPDATE question SET number = '${req.body.number}', contents = '${req.body.contents}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// updateAnswerOption !!!

const updateAnswerOption = async (req, res) => {
    try {
        const text = (`UPDATE answer_option SET number = '${req.body.number}', contents = '${req.body.contents}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// deleteUser !!!

const deleteUser = async (req, res) => {
    try {
        const text = (`DELETE FROM user_data WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// deleteExam !!!

const deleteExam = async (req, res) => {
    try {
        const text = (`DELETE FROM exam WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// deleteQuestion !!!

const deleteQuestion = async (req, res) => {
    try {
        const text = (`DELETE FROM question WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// deleteAnswerOption !!!

const deleteAnswerOption = async (req, res) => {
    try {
        const text = (`DELETE FROM answer_option WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

module.exports = {
    getUsers,
    getExams,
    getQuestions,
    getAnswerOptions,
    getUser,
    getExam,
    getQuestion,
    getAnswerOption,
    createUser,
    createExam,
    createQuestion,
    createAnswerOption,
    updateUser,
    updateExam,
    updateQuestion,
    updateAnswerOption,
    deleteUser,
    deleteExam,
    deleteQuestion,
    deleteAnswerOption
}