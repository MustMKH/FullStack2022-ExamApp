//const fs = require('fs')
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: 'admin',
    port: 5432,
})

/* NOTE: http request for login and signup:
         Make sure Content-type is application/json in the Header section */

// TODO: Calculate and record answer_option and exam result

// TODO: Separate files for users, exams, questions and answer options

/* TODO: Bad Request Status and Error Handling for inputs that are too long
         For example, the exam title is limited to 50 characters */

/* TODO: SQL UPDATE statements return 0 if the row is not found!
         Check to see if an item exists in the database can be done here
         in the try block OR Test if row count is > 0 */

/* TODO: Pool.end()?
         The following error message was received when the same route handler
         called two query functions:
         Error: Called end on pool more than once */

/* ??? Should the data be stored both to db and json file?
let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' }) */

// Find questions (???) and todos (!!!)



// - - - QUERY HANDLERS - - -

// Sign up

const signUp = async (email, hashed) => {
    /*     console.log("queries.js, signUp, parameter email =", email)
        console.log("queries.js, signUp, parameter hashed =", hashed) */
    const text = 'INSERT INTO user_data (email, password) VALUES ($1, $2) returning id'
    const values = [email, hashed]
    try {
        const result = await pool.query(text, values)
        /*         console.log("queries.js, signUp, result =", result)
                console.log("queries.js, signUp, result.rows[0] =", result.rows[0])
                console.log("queries.js, signUp, result.rows[0].id =", result.rows[0].id) */
        return result.rows[0].id
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Login

const login = async (email) => {
    const text = 'SELECT * FROM user_data WHERE email = $1'
    const values = [email]
    try {
        const result = await pool.query(text, values)
        const existingUser = { password: result.rows[0].password, email: result.rows[0].email, id: result.rows[0].id }
        return existingUser
    } catch (error) {
        console.log("There was an error:", error)
    }
}



// - - - adminCheck - - -
const adminCheck = async (email) => {
    /*     console.log("queries.js, adminCheck, parameter email =", email) */
    const text = 'SELECT is_admin FROM user_data WHERE email = $1'
    const values = [email]
    try {
        const result = await pool.query(text, values)
        /*         console.log("queries.js, adminCheck, result.rows[0] =", result.rows[0]) */
        return result.rows[0].is_admin
    } catch (error) {
        console.log("There was an error:", error)
    }
}



// - - - Selects - - -

// Select list of users
const getUsers = async () => {
    // console.log("queries.js getUser no parameter")
    const text = 'SELECT id, first_name, last_name, email FROM user_data ORDER BY id'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Select list of exams
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

// Select list of all questions
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

// Select list of all answer options
const getAnswerOptions = async () => {
    const text = 'SELECT * FROM answer_option'
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Select questions under specific exam

const getQuestionsForExam = async (examId) => {
    const text = `SELECT * FROM question WHERE exam_id = ${examId}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("Unable to complete query. Error:", error)
    }
}

// Select answer options under specific question(s)

const getAnswerOptionsForQuestion = async (questionId) => {
    const text = `SELECT * FROM answer_option WHERE question_id = ${questionId}`
    try {
        const result = await pool.query(text)
        return result.rows
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// - - - Get all answer-options for specific exam - - -
const getAnswerOptionsForExam = async (examId) => {
    console.log("queries.js, getAnswerOptionsForExam, examId:", examId)
    const text = `SELECT * FROM question, answer_option WHERE question.exam_id=${examId} AND answer_option.question_id = question.id`
    // const text = `SELECT * FROM answer_option WHERE question.exam_id = ${examId} AND answer_option.question_id = question.id`
    try {
        const result = await pool.query(text)
        console.log("queries.js, getAnswerOptionsForExam, result:", result)
        console.log("queries.js, getAnswerOptionsForExam, result.rowCount:", result.rowCount)
        return result.rows
    } catch (error) {
        //console.log("There was an error:", error)
        throw "Database error"
    }
}

// Select specific user
const getUser = async (id) => {
    // console.log("queries.js getUser parameter id =", id)
    const text = `SELECT id, first_name, last_name, email FROM user_data WHERE id = ${id}`
    try {
        const result = await pool.query(text)
        // console.log("RESULT.ROWS:", result.rows[0]) // returns undefined
        // console.log("RESULT.ROWS:", result.rows) // this is an empty list
        return result.rows[0]
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Select specific exam
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

// Select specific question
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

// Select specific answer option
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

// Insert new user - delete - This is not needed!!!
const createUser = async (params) => {
    try {
        const text = 'INSERT INTO user_data (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)'
        const values = [params.first_name, params.last_name, params.email, params.password, params.is_admin]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Insert new exam
const createExam = async (params) => {
    console.log("queries.js createExam params.title =", params.title)
    try {
        const text = 'INSERT INTO exam (title) VALUES ($1)'
        const values = [params.title]
        const result = await pool.query(text, values)
        // No need for return? return result.rows[0] or RETURNING * ???
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Insert new question
const createQuestion = async (params) => {
    console.log("queries.js createQuestion params.exam_id =", params.exam_id)
    console.log("queries.js createQuestion params.contents =", params.contents)
    try {
        const text = "INSERT INTO question (exam_id, contents) VALUES ($1, $2)"
        values = [params.exam_id, params.contents]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Insert new answer option - Get exam id ???
const createAnswerOption = async (params) => {
    try {
        const text = "INSERT INTO answer_option (question_id, contents) VALUES ($1, $2)"
        const values = [params.question_id, params.contents]
        const result = await pool.query(text, values)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// - - - Updates - - -

/* TODO: add conflict clauses to updates ??? Example:
         ON CONFLICT (column_name) DO NOTHING;
         ON CONFLICT (column_name1) DO UPDATE SET column_name2 = EXCLUDED.column_name2; */

// Update user's name and email TODO: update role, password (reset)???
const updateUser = async (id, first_name, last_name, email) => {
    const text = (`UPDATE user_data SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}' WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Update exam
const updateExamTitle = async (id, title) => {
    const text = `UPDATE exam SET title = '${title}' WHERE id=${id}`
    /*     console.log("queries.js, updateExam, parametri id =", id)
        console.log("queries.js, updateExam, parametri title =", title)
        console.log("queries.js, updateExam, text =", text) */
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error", error)
    }
}

// Update question
const updateQuestionContents = async (id, contents) => {
    const text = `UPDATE question SET contents = '${contents}' WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error", error)
    }
}

// Update question
const updateQuestionPoints = async (id, points) => {
    const text = `UPDATE question SET points = '${points}' WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error", error)
    }
}

// Update answer option - REDUNDANT?
/* const updateAnswerOption = async (id, contents, is_correct) => {
    console.log("queries.js, updateAnswerOption id =", id)
    console.log("queries.js, updateAnswerOption contents =", contents)
    console.log("queries.js, updateAnswerOption is_correct =", is_correct)
    const text = (`UPDATE answer_option SET contents = '${contents}', is_correct = '${is_correct}' WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
} */

// - - - Patches - - -

// Update answer option contents
const updateAnswerOptionContents = async (id, contents) => {
    console.log("queries.js, updateAnswerOptionContents id =", id)
    console.log("queries.js, updateAnswerOptionContents contents =", contents)
    const text = (`UPDATE answer_option SET contents '${contents}' WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
}

// Toggle correct answer option
const toggleCorrectAnswerOption = async (id, is_correct) => {
    console.log("queries.js, toggleCorrectAnswerOption id =", id)
    console.log("queries.js, toggleCorrectAnswerOption contents =", contents)
    const text = (`UPDATE answer_option SET is_correct '${is_correct}' WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error)
    }
}


// - - - Deletes - - -

// Delete user
const deleteUser = async (id) => {
    console.log("queries.js deleteUser parameter id =", id)
    const text = `DELETE FROM user_data WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete exam
const deleteExam = async (id) => {
    // console.log("queries.js deleteExam parameter id =", id)
    const text = `DELETE FROM exam WHERE id=${id}`
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete question
const deleteQuestion = async (id) => {
    const text = (`DELETE FROM question WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// Delete answer option
const deleteAnswerOption = async (id) => {
    const text = (`DELETE FROM answer_option WHERE id=${id}`)
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}



module.exports = {
    signUp,
    login,
    adminCheck,
    getUsers,
    getExams,
    getQuestions,
    getAnswerOptions,
    getQuestionsForExam,
    getAnswerOptionsForQuestion,
    getAnswerOptionsForExam,
    getUser,
    getExam,
    getQuestion,
    getAnswerOption,
    createUser,
    createExam,
    createQuestion,
    createAnswerOption,
    updateUser,
    updateExamTitle,
    updateQuestionContents,
    updateQuestionPoints,
    // updateAnswerOption, REDUNDANT???
    updateAnswerOptionContents,
    toggleCorrectAnswerOption,
    deleteUser,
    deleteExam,
    deleteQuestion,
    deleteAnswerOption
}