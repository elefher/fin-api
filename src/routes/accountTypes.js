const express = require('express')
const router = express.Router()
const AccountTypes = require('@http/controllers/AccountTypesController')
const { accountTypesRules, validate } = require('@middlewares/RequestValidator')
const { isLoggedIn } = require('@middlewares/Authentication')

router.get('/', [isLoggedIn], AccountTypes.list)

router.get('/:id', [isLoggedIn], AccountTypes.view)

router.post(
  '/',
  [isLoggedIn, accountTypesRules(), validate],
  AccountTypes.create,
)

router.put(
  '/:id',
  [isLoggedIn, accountTypesRules(), validate],
  AccountTypes.update,
)

router.delete('/:id', [isLoggedIn], AccountTypes.remove)

module.exports = router
