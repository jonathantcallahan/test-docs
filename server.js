const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
const PORT = 8081

const api = require('./controllers/api')
api(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))