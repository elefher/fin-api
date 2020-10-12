const express = require('express')
const router = express.Router()

const usersRouter = require('@routes/users')
const accountsRouter = require('@routes/accounts')
const accountTypesRouter = require('@routes/accountTypes')

router.use('/users', usersRouter)
router.use('/accountTypes', accountTypesRouter)
router.use('/accounts', accountsRouter)

module.exports = router
