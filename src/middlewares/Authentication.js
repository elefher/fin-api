const Boom = require('@hapi/boom')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.body.user = req.user._id
    return next()
  }

  return next(
    Boom.unauthorized("Authentication failed"),
  )
}

module.exports = {
  isLoggedIn,
}
