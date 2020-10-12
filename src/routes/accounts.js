const express = require('express')
const router = express.Router()
const AccountsController = require('@http/controllers/AccountsController')
const { accountRules, validate } = require('@middlewares/RequestValidator')
const { isLoggedIn } = require('@middlewares/Authentication')

router.get('/', [isLoggedIn], AccountsController.list)

router.get('/:id', [isLoggedIn], AccountsController.view)

router.post(
  '/',
  [isLoggedIn, accountRules(), validate],
  AccountsController.create,
)

router.put(
  '/:id',
  [isLoggedIn, accountRules(), validate],
  AccountsController.update,
)

router.delete('/:id', [isLoggedIn], AccountsController.remove)

module.exports = router
