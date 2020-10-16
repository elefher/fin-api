const TransactionCategoryService = require('@services/TransactionCategoryService')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

const list = async (req, res, next) => {
  const allTransactionCategories = await TransactionCategoryService.fetchAll()

  return Boom.isBoom(allTransactionCategories)
    ? next(allTransactionCategories)
    : res.status(StatusCodes.OK).json({
        data: allTransactionCategories,
      })
}

const view = async (req, res, next) => {
  const transactionCategory = await TransactionCategoryService.fetchById(
    req.params.id,
  )

  return Boom.isBoom(transactionCategory)
    ? next(transactionCategory)
    : res.status(StatusCodes.OK).json({
        data: transactionCategory,
      })
}

const fetchByUser = async (req, res, next) => {
  const transactionCategories = await TransactionCategoryService.fetchByUser(
    req.params.id,
  )

  return Boom.isBoom(transactionCategories)
    ? next(transactionCategories)
    : res.status(StatusCodes.OK).json({
        data: transactionCategories,
      })
}

const fetchByType = async (req, res, next) => {
  const transactionCategories = await TransactionCategoryService.fetchByType(
    req.params.typeName,
  )

  return Boom.isBoom(transactionCategories)
    ? next(transactionCategories)
    : res.status(StatusCodes.OK).json({
        data: transactionCategories,
      })
}

const fetchByUserAndType = async (req, res, next) => {
  const transactionCategories = await TransactionCategoryService.fetchByUserAndType(
    req.params.id,
    req.params.typeName,
  )

  return Boom.isBoom(transactionCategories)
    ? next(transactionCategories)
    : res.status(StatusCodes.OK).json({
        data: transactionCategories,
      })
}

const create = async (req, res, next) => {
  if (!req.body.private) {
    delete req.body.user
  }

  const category = await TransactionCategoryService.create(req.body)

  return Boom.isBoom(category)
    ? next(category)
    : res.status(StatusCodes.CREATED).json({
        message: 'Transaction category created',
        data: category,
      })
}

const update = async (req, res, next) => {
  if (!req.body.private) {
    delete req.body.user
  }

  const updatedTransaction = await TransactionCategoryService.update(
    req.params.id,
    req.body,
  )

  return Boom.isBoom(updatedTransaction)
    ? next(updatedTransaction)
    : res.status(StatusCodes.OK).json({
        message: 'Transaction category updated',
        data: updatedTransaction,
      })
}

const remove = async (req, res, next) => {
  const delTransactionCategory = await TransactionCategoryService.deleteById(
    req.params.id,
  )

  return Boom.isBoom(delTransactionCategory)
    ? next(delTransactionCategory)
    : res.status(StatusCodes.ACCEPTED).json({
        message: 'Transaction category deleted',
      })
}

module.exports = {
  list,
  view,
  fetchByUser,
  fetchByType,
  fetchByUserAndType,
  create,
  update,
  remove,
}
