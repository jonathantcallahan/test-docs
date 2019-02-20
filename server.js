const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 8081

const api = require('./controllers/api')
api(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))