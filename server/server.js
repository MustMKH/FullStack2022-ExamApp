// const bodyparser = require('body-parser')
const fs = require('fs')
const https = require('https')
const cors = require('cors')
const port = process.env.PORT || 8080
const express = require('express')
const app = express()
const router = require('./routes')
/* const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exam',
    password: 'admin',
    port: 5432,
}) */

// - - - M I D D L E W A R E - - -

// This middleware tells express that we are expecting requests to come in as json
app.use(express.json())
app.use(cors())

// app.use(bodyparser.urlencoded( {extended:false} ))
// app.use(bodyparser.json())

// When the request starts with the path /api, use the routes inside of the routes.js file
app.use('/api', router)



// - - - DATA FROM FILE - - -
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

/* const options = {
    key: 'exam-app.key',
    cert: 'exam-app.crt'
}

const sslServer=https.createServer(options,app)

sslServer.listen(port, () => {
    console.log(`Secure API server listening on port ${port}`)
}) */

https
    .createServer(
        {
            key: fs.readFileSync("exam-app.key"),
            cert: fs.readFileSync("exam-app.crt")
        },
        app
    ).listen(port, () => console.log(`Exam App API listening on port ${port}.`))

/* app.listen(port, () => console.log(`Exam API listening on port ${port}`)) */