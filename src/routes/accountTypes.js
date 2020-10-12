const express = require('express')
const router = express.Router()
const AccountTypes = require('@http/controllers/AccountTypesController')
const { accountTypesRules, validate } = require('@middlewares/RequestValidator')

router.get('/', AccountTypes.list)

router.get('/:id', AccountTypes.view)

router.post('/', [accountTypesRules(), validate], AccountTypes.create)

router.put('/:id', [accountTypesRules(), validate], AccountTypes.update)

router.delete('/:id', AccountTypes.remove)

module.exports = router
