const { body, validationResult } = require('express-validator')
const Boom = require('@hapi/boom')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return next(Boom.badRequest(JSON.stringify({ errors: errors.array() })))
}

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

const transactionCategoryRules = () => {
  return [
    body('name').isString().exists(),
    body('type').isString().exists(),
    body('private').isBoolean().optional(),
  ]
}

module.exports = {
  validate,
  accountTypesRules,
  accountRules,
  transactionCategoryRules,
}
