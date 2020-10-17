const express = require('express')
const router = express.Router()

const accountsRouter = require('@routes/accounts')
const accountTypesRouter = require('@routes/accountTypes')
const TransactionCategoryRouter = require('@routes/TransactionCategory')

router.use('/accountTypes', accountTypesRouter)
router.use('/accounts', accountsRouter)
router.use('/TransactionCategory', TransactionCategoryRouter)

module.exports = router
