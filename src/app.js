const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
require('module-alias/register')
require('dotenv').config()
const { getConnection } = require('@db')
const { facebookInit } = require('@authentication')

const db = getConnection()
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const indexRouter = require('@routes/index')
const usersRouter = require('@routes/users')
const authRouter = require('@routes/auth')

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)

app.use(cors())

facebookInit(app)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '@root/public')))

module.exports = app
