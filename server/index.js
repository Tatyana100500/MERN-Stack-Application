const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const cors = require('cors')
var path = require('path');

const db = require('./db')
const accountRouter = require('./routes/account-router')

const app = express()
const apiPort = 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static('upload'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/', accountRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))