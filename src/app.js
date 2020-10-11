const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
require('module-alias/register')
require('dotenv').config()
const { getConnection } = require('@db')
const { auth0 } = require('@authentication')
const { errorHandler } = require('@middlewares/ErrorHandler')
const bodyParser = require('body-parser')

const db = getConnection()
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const indexRouter = require('@routes/index')
const apiRouters = require('@routes/apiRoutes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
}

if ('PROD' === process.env.ENVIROMENT) {
  sessionOptions.cookie.secure = true
}

app.use(session(sessionOptions))

app.use(cors())

auth0(app)

app.use('/', indexRouter)
app.use('/api', apiRouters)

errorHandler(app)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '@root/public')))

module.exports = app
