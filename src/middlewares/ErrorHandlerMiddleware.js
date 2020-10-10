const Boom = require('@hapi/boom')

const errorHandlerMiddleware = app => {
  app.use((err, req, res, next) => {
    return Boom.isBoom(err)
      ? res.status(err.output.statusCode).json(err.output.payload)
      : res.status(err.status || 500).json({ message: err.message })
  })
}

module.exports = { errorHandlerMiddleware }
