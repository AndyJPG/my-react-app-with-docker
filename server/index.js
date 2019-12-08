const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const db = require('../queries')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(pino);

app.get('/', (req, res) => {
    const user = req.query.user || 'Andy Jiang'
    res.json({ user: user, info : 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})