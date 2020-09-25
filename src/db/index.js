const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
  const mongoDB = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
}

const getConnection = () => {
  connect()
  return mongoose.connection
}

module.exports = { getConnection }
