const fs = require('fs')
const { Pool } = require('pg')
/* const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
}) */

// can the records be stored both to db and json file?
let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' })

// getExams

const getExams = async () => {
    const text = 'SELECT * FROM exam'
    try {
        const result = await pool.query(text)
    } catch (error) {
        console.log("There was an error:", error.stack)
    }
}

// getQuestions

// getAnswerOptions

// getExam

// getQuestion

// getAnswerOption

// createExam

// createQuestion

// createAnswerOption

// updateExam

// updateQuestion

// updateAnswerOption

// deleteExam

// deleteQuestion

// deleteAnswerOption

/* module.exports = {
    getExams
    getQuestions
    getAnswerOptions    
    getExam
    getQuestion
    getAnswerOption
    createExam,
    createQuestion,
    createAnswerOption
    updateExam
    updateQuestion
    updateAnswerOption
    deleteExam
    deleteQuestion
    deleteAnswerOption
} */