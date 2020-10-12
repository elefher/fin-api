const AccountTypeService = require('@services/AccountTypesService')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

const list = async (req, res, next) => {
  const allAccountTypes = await AccountTypeService.fetchAll()

  return Boom.isBoom(allAccountTypes)
    ? next(allAccountTypes)
    : res.status(StatusCodes.OK).json({
        data: allAccountTypes,
      })
}

const view = async (req, res, next) => {
  const accountType = await AccountTypeService.fetchById(req.params.id)

  return Boom.isBoom(accountType)
    ? next(accountType)
    : res.status(StatusCodes.OK).json({
        data: accountType,
      })
}

const create = async (req, res, next) => {
  const newAccountType = await AccountTypeService.create(req.body)

  return Boom.isBoom(newAccountType)
    ? next(newAccountType)
    : res.status(StatusCodes.CREATED).json({
        message: 'Account type created',
        data: newAccountType,
      })
}

const update = async (req, res, next) => {
  const updatedAccountType = await AccountTypeService.update(
    req.params.id,
    req.body,
  )

  return Boom.isBoom(updatedAccountType)
    ? next(updatedAccountType)
    : res.status(StatusCodes.OK).json({
        message: 'Account type updated',
        data: updatedAccountType,
      })
}

const remove = async (req, res, next) => {
  const delAccountType = await AccountTypeService.deleteById(req.params.id)

  return Boom.isBoom(delAccountType)
    ? next(delAccountType)
    : res.status(StatusCodes.ACCEPTED).json({
        message: 'Account type updated',
      })
}

module.exports = { list, view, create, update, remove }
