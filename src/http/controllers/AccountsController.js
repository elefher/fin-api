const AccountsService = require('@services/AccountsService')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

const list = async (req, res, next) => {
  const allAccounts = await AccountsService.fetchAllByUser(req.user)

  return Boom.isBoom(allAccounts)
    ? next(allAccounts)
    : res.status(StatusCodes.OK).json({
        data: allAccounts,
      })
}

const view = async (req, res, next) => {
  const account = await AccountsService.fetchByIdAndUser(
    req.params.id,
    req.body.user,
  )

  return Boom.isBoom(account)
    ? next(account)
    : res.status(StatusCodes.OK).json({
        data: account,
      })
}

const create = async (req, res, next) => {
  const newAccount = await AccountsService.create(req.body)

  return Boom.isBoom(newAccount)
    ? next(newAccount)
    : res.status(StatusCodes.CREATED).json({
        message: 'Account created',
        data: newAccount,
      })
}

const update = async (req, res, next) => {
  const updatedAccount = await AccountsService.update(req.params.id, req.body)

  return Boom.isBoom(updatedAccount)
    ? next(updatedAccount)
    : res.status(StatusCodes.OK).json({
        message: 'Account updated',
        data: updatedAccount,
      })
}

const remove = async (req, res, next) => {
  const delAccount = await AccountsService.deleteByIdAndUser(
    req.params.id,
    req.body.user,
  )

  return Boom.isBoom(delAccount)
    ? next(delAccount)
    : res.status(StatusCodes.ACCEPTED).json({
        message: 'Account deleted',
      })
}

module.exports = { list, view, create, update, remove }
