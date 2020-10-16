const express = require('express')
const router = express.Router()
const TransactionCategoryController = require('@http/controllers/TransactionCategoryController')
const {
  transactionCategoryRules,
  validate,
} = require('@middlewares/RequestValidator')
const { isLoggedIn } = require('@middlewares/Authentication')

router.get('/', [isLoggedIn], TransactionCategoryController.list)

router.get('/:id', [isLoggedIn], TransactionCategoryController.view)

router.get('/user/:id', [isLoggedIn], TransactionCategoryController.fetchByUser)

router.get(
  '/type/:typeName',
  [isLoggedIn],
  TransactionCategoryController.fetchByType,
)

router.get(
  '/user/:id/type/:typeName',
  [isLoggedIn],
  TransactionCategoryController.fetchByUserAndType,
)

router.post(
  '/',
  [isLoggedIn, transactionCategoryRules(), validate],
  TransactionCategoryController.create,
)

router.put(
  '/:id',
  [isLoggedIn, transactionCategoryRules(), validate],
  TransactionCategoryController.update,
)

router.delete('/:id', [isLoggedIn], TransactionCategoryController.remove)

module.exports = router
