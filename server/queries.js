//const fs = require('fs')
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: 'admin',
    port: 5432,
})



// ??? Why does update user request never load on postman?

// TODO: Calculate and record answer_option and exam result

/* TODO: It is currently not possible to delete an exam with questions or
         a question with answer options. The DELETE request returns status
         204 No Content as if everything went ok, this needs to be fixed */

// TODO: SEPARATE FILES FOR USERS, EXAMS, QUESTIONS AND ANSWERS

/* TODO: Bad Request Status and Error Handling for inputs that are too long
         For example, the exam title is limited to 50 characters */

/* TODO: SQL UPDATE statements return 0 if the row is not found!
         Check to see if an item exists in the database can be done here
         in the try block OR Test if row count is > 0 */

/* TODO: Pool.end()?
         The following error message was received when the same route handler
         called two query functions:
         Error: Called end on pool more than once */

/* ??? Can the data be stored both to db and json file?
let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' }) */



// - - - QUERY HANDLERS - - -

// Sign up

const signUp = async (email, hashed) => {
    const text = ('INSERT INTO user_data (email, password) VALUES ($1, $2) returning id', [email, hashed])
    try {
        const result = await pool.query(text)
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Login

const login = async (email) => {
    const text = ('SELECT * FROM user_data WHERE email = $1', [email])
    try {
        const result = await pool.query(text)
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// - - - Selects - - -

// Get list of users
const getUsers = async () => {
    // console.log("queries.js getUser no parameter")
    const text = 'SELECT id, first_name, last_name, email FROM user_data'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get list of exams
const getExams = async () => {
    // console.log("queries.js getExams no parameter")
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
    // console.log("queries.js getQuestions no parameter")
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
    // console.log("queries.js getUser parameter id =", id)
    const text = `SELECT id, first_name, last_name, email FROM user_data WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        // console.log("RESULT.ROWS:", result.rows[0]) // returns undefined
        // console.log("RESULT.ROWS:", result.rows) // this is an empty list
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific exam
const getExam = async (id) => {
    // console.log("queries.js getExam parameter id=", id)
    const text = `SELECT * FROM exam WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific question
const getQuestion = async (id) => {
    // console.log("queries.js getQuestion parameter id=", id)
    const text = `SELECT * FROM question WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        // list length can be tested here: result.rowcount
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Get specific answer option
const getAnswerOption = async (id) => {
    const text = `SELECT * FROM answer_option WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// - - - Inserts - - -

// Create new user
const createUser = async (params) => {
    try {
        const text = 'INSERT INTO user_data (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)'
        const values = [params.first_name, params.last_name, params.email, params.password, params.is_admin]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Create new exam
const createExam = async (params) => {
    // console.log("queries.js createExam params.number and params.title =", params.number, params.title)
    try {
        const text = 'INSERT INTO exam (number, title) VALUES ($1, $2)'
        const values = [params.number, params.title]
        const result = await pool.query(text, values)
        // No need for return? return result.rows[0] or RETURNING * ???
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Create new question
const createQuestion = async (params) => {
    console.log("queries.js createQuestion params.exam_id =", params.exam_id)
    console.log("queries.js createQuestion params.number =", params.number)
    console.log("queries.js createQuestion params.contents =", params.contents)
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

// - - - Updates - - -

// Update user (name and e-mail)
const updateUser = async (id, first_name, last_name, email) => {
    try {
        const text = (`UPDATE user_data SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}' WHERE id=${id}`)
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Update exam
const updateExam = async (examId, examNumber, examTitle) => {
    const text = `UPDATE exam SET number = '${examNumber}', title = '${examTitle}' WHERE id=${examId}`
/*     console.log("queries.js, updateExam, parametri examId =", examId)
    console.log("queries.js, updateExam, parametri examNumber =", examNumber)
    console.log("queries.js, updateExam, parametri examTitle =", examTitle)
    console.log("queries.js, updateExam, text =", text) */
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error", error)
    }
}

// Update question
const updateQuestion = async (id, number, contents) => {
    const text = `UPDATE question SET number = '${number}', contents = '${contents}' WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error", error)
    }
}

// Update answer option
const updateAnswerOption = async (id, number, contents, is_correct) => {
    console.log("queries.js, updateAnswerOption id =", id)
    console.log("queries.js, updateAnswerOption number =", number)
    console.log("queries.js, updateAnswerOption contents =", contents)
    console.log("queries.js, updateAnswerOption is_correct =", is_correct)
    const text = (`UPDATE answer_option SET number = '${number}', contents = '${contents}', is_correct = '${is_correct}' WHERE id=${id}`)
/*     const text = 'UPDATE answer_option SET (number, contents, is_correct) VALUES ($1, $2, $3) WHERE id=3'
    const values = [params.number, params.contents, params.is_correct] */
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// - - - Deletes - - -

// Delete user
const deleteUser = async (kukkuluuruu) => {
    console.log ("queries.js deleteUser parameter kukkuluuruu =", kukkuluuruu)
    const text = `DELETE FROM user_data WHERE id=${kukkuluuruu}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete exam (cannot delete exams with questions, add error message!)
const deleteExam = async (id) => {
    console.log ("queries.js deleteExam parameter id =", id)
    const text = `DELETE FROM exam WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete question (cannot delete questions with answer options, add error message!)
const deleteQuestion = async (idFromRequest) => {
    const text = (`DELETE FROM question WHERE id=${idFromRequest}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete answer option
const deleteAnswerOption = async (answerOptionId) => {
    const text = (`DELETE FROM answer_option WHERE id=${answerOptionId}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}



module.exports = {
    signUp,
    login,
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