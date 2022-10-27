const fs = require('fs');
const express = require('express')  // install express if needed: "npm install express"
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors()) // install cors if needed: "npm install cors"
// Ja jos haluaa bodyn suoraan req argumentista, niin pitää lisätä:
app.use(express.json());  // this can be done after app has received a value

app.get('/', (req, res) => {
  // tiedon luku asynkronisesti
  console.log("Data has been requested from the server")
  const data = fs.readFileSync('./examdata.json', {encoding: 'utf8', flag: 'r'}); //This can last several seconds
  res.send(data)
})

app.post('/', (req, res) => {
  // writing data asyncronically
  console.log("The server has received a save request for data")
  fs.writeFileSync('examdata.json', JSON.stringify(req.body))
  res.send('Congratulations! Data has been saved as per request.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})