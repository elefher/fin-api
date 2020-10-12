const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const connect = () => {
  const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  })
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
