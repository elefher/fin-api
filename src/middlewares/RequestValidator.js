const { body, validationResult } = require('express-validator')
const Boom = require('@hapi/boom')

const accountTypesRules = () => {
  return [body('name').exists()]
}

const accountRules = () => {
  return [
    body('name').isString().exists(),
    body('balance').isNumeric().exists(),
    body('currency').isString().exists(),
    body('type').isString().exists(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return next(Boom.badRequest(JSON.stringify({ errors: errors.array() })))
}

module.exports = {
  accountTypesRules,
  accountRules,
  validate,
}
