const express = require('express')
const router = express.Router()

const accountsRouter = require('@routes/accounts')
const accountTypesRouter = require('@routes/accountTypes')

router.use('/accountTypes', accountTypesRouter)
router.use('/accounts', accountsRouter)

module.exports = router
