// const bodyparser = require('body-parser')
// const fs = require('fs')
// const cors = require('cors')
// const port = 8080
const express = require('express')
const app = express()
const routes = require('./routes')
const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: 'admin',
    port: 5432,
})

// - - - M I D D L E W A R E - - -

// This middleware tells express that we are expecting requests to come in as json
app.use(express.json())

// app.use(cors())
// app.use(bodyparser.urlencoded( {extended:false} ))
// app.use(bodyparser.json())

// When the request starts with the path /api, use the routes inside of the routes.js file
app.use('/api', routes)

// - - - DATA - - -
// let data = fs.readFileSync('./examdata.json', { encoding: 'utf8', flag: 'r' })

// - - - GLOBAL ERROR HANDLING - - -

app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(3000, () => console.log('Exam API listening on port 3000.'))