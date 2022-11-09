//const fs = require('fs')
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'exam',
  password: 'admin',
  port: 5432,
})

// TODO: CHANGE ALL PARAMETERS 
// TODO: ADD RETURN STATEMENTS TO ALL FUNCTIONS
// TODO: SEPARATE ROUTER FILES FOR USERS, EXAMS, QUESTIONS AND ANSWERS!!!

// remeber pool.end() !!

// - - - "DATA HANDLERS" - - - 

/* can the records be stored both to db and json file?
let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' }) */

const getUsers = async (req, res) => {
    const text = 'SELECT first_name, last_name, e_mail FROM user_data'
    try {
        const result = await pool.query(text)
        return result
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getExams

const getExams = async (req, res) => {
    const text = 'SELECT * FROM exam'
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getQuestions

const getQuestions = async (req, res) => {
    const text = 'SELECT * FROM question'
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getAnswerOptions

const getAnswerOptions = async (req, res) => {
    const text = 'SELECT * FROM answer_option'
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getUser TESTATTU JA TOIMII!!! console.logiin on hyvä pistää parametrit joilla funktiota kutsuttiin

const getUser = async (id) => {
    console.log("records.js getUser(id) =", id)
    const text = `SELECT first_name, last_name, e_mail FROM user_data WHERE id = ${id}`
    try {
        console.log(text)
        const result = await pool.query(text)
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getExam

const getExam = async (id) => {
    const text = `SELECT * FROM exam WHERE id = ${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getQuestion

const getQuestion = async (req, res) => {
    const text = `SELECT * FROM question WHERE id = ${req.body.id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// getAnswerOption

const getAnswerOption = async (req, res) => {
    const text = `SELECT * FROM answer_option WHERE id = ${req.body.id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// createUser - parameters???

const createUser = async (req, res) => {
    try {
        const text = ("INSERT INTO user_data (first_name, last_name, e_mail) VALUES ($1, $2, $3)", [req.body.first_name, req.body.last_name, req.body.e_mail])
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// createExam

const createExam = async (req, res) => {
    try {
        const text = ("INSERT INTO exam (number, title) VALUES ($1, $2)", [req.body.number, req.body.title])
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// createQuestion

const createQuestion = async (req, res) => {
    try {
        const text = ("INSERT INTO question (number, contents) VALUES ($1, $2)", [req.body.number, req.body.contents])
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// createAnswerOption

const createAnswerOption = async (req, res) => {
    try {
        const text = ("INSERT INTO answer_option (number, contents) VALUES ($1, $2)", [req.body.number, req.body.contents])
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
    pool.end()
}

// updateUser

const updateUser = async (req, res) => {
    try {
        const text = (`UPDATE user_data SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', e_mail = '${req.body.e_mail}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// updateExam

const updateExam = async (req, res) => {
    try {
        const text = (`UPDATE exam SET number = '${req.body.number}', title = '${req.body.title}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// updateQuestion

const updateQuestion = async (req, res) => {
    try {
        const text = (`UPDATE question SET number = '${req.body.number}', contents = '${req.body.contents}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// updateAnswerOption

const updateAnswerOption = async (req, res) => {
    try {
        const text = (`UPDATE answer_option SET number = '${req.body.number}', contents = '${req.body.contents}' WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// deleteUser

const deleteUser = async (req, res) => {
    try {
        const text = (`DELETE FROM user_data WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// deleteExam

const deleteExam = async (req, res) => {
    try {
        const text = (`DELETE FROM exam WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// deleteQuestion

const deleteQuestion = async (req, res) => {
    try {
        const text = (`DELETE FROM question WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
}

// deleteAnswerOption

const deleteAnswerOption = async (req, res) => {
    try {
        const text = (`DELETE FROM answer_option WHERE id=${req.body.id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)        
    }
    pool.end()
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