const TransactionCategory = require('@http/controllers/TransactionCategoryController')
const TransactionCategoryService = require('@services/TransactionCategoryService')
const httpMocks = require('node-mocks-http')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

TransactionCategoryService.create = jest.fn()
TransactionCategoryService.update = jest.fn()
TransactionCategoryService.deleteById = jest.fn()
TransactionCategoryService.fetchByType = jest.fn()
TransactionCategoryService.fetchByUser = jest.fn()
TransactionCategoryService.fetchByUserAndType = jest.fn()
TransactionCategoryService.fetchById = jest.fn()
TransactionCategoryService.fetchAll = jest.fn()

describe('Testing AccountsController', () => {
  const errorMessage = 'Error message'
  const BoomNotFoundError = Boom.notFound(errorMessage)
  const BoomBadDataError = Boom.badData(errorMessage)
  let req, res, next

  beforeEach(() => {
    req = httpMocks.createRequest()
    req.body = {}
    res = httpMocks.createResponse()
    next = jest.fn().mockImplementation(err => {
      return Boom.isBoom(err)
        ? res.status(err.output.statusCode).json(err.output.payload)
        : res.status(err.status || 500).json({ message: err.message })
    })
  })

  describe('Create transaction category', () => {
    it('should call TransactionCategoryService.create', async () => {
      await TransactionCategory.create(req, res, next)
      expect(TransactionCategoryService.create).toBeCalledWith(req.body)
    })

    it('should call TransactionCategoryService.create with user in body when private is set as true', async () => {
      req.body.name = 'categoryName'
      req.body.user = 123
      req.body.private = true
      await TransactionCategory.create(req, res, next)
      expect(TransactionCategoryService.create).toBeCalledWith(req.body)
      expect(req.body).toMatchObject(req.body)
    })

    it('should call TransactionCategoryService.create without user in body when private is set as false', async () => {
      req.body.name = 'categoryName'
      req.body.user = 123
      req.body.private = false
      await TransactionCategory.create(req, res, next)
      expect(TransactionCategoryService.create).toBeCalledWith(req.body)
      expect(req.body).toMatchObject({ name: 'categoryName', private: false })
    })

    it('should return CREATED response code', async () => {
      await TransactionCategory.create(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.CREATED)
    })

    it('should return error', async () => {
      TransactionCategoryService.create.mockReturnValue(BoomBadDataError)

      await TransactionCategory.create(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Update transaction category', () => {
    it('should call TransactionCategory.update', async () => {
      req.params.id = 1
      await TransactionCategory.update(req, res, next)
      expect(TransactionCategoryService.update).toBeCalledWith(
        req.params.id,
        req.body,
      )
    })

    it('should call TransactionCategoryService.update with user in body when private is set as true', async () => {
      req.body.name = 'categoryName'
      req.body.user = 123
      req.body.private = true
      await TransactionCategory.update(req, res, next)
      expect(TransactionCategoryService.create).toBeCalledWith(req.body)
      expect(req.body).toMatchObject(req.body)
    })

    it('should call TransactionCategoryService.update without user in body when private is set as false', async () => {
      req.body.name = 'categoryName'
      req.body.user = 123
      req.body.private = false
      await TransactionCategory.update(req, res, next)
      expect(TransactionCategoryService.create).toBeCalledWith(req.body)
      expect(req.body).toMatchObject({ name: 'categoryName', private: false })
    })

    it('should return OK response code', async () => {
      await TransactionCategory.update(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.update.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.update(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Remove transaction category', () => {
    it('should call TransactionCategoryService.deleteById', async () => {
      req.params.id = 1
      await TransactionCategory.remove(req, res, next)
      expect(TransactionCategoryService.deleteById).toBeCalledWith(
        req.params.id,
      )
    })

    it('should return ACCEPTED response code', async () => {
      await TransactionCategory.remove(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.ACCEPTED)
    })

    it('should return Boom error', async () => {
      TransactionCategoryService.deleteById.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.remove(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalledWith(BoomNotFoundError)
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Fetch all transaction categories', () => {
    it('should call TransactionCategoryService.fetchAll', async () => {
      await TransactionCategory.list(req, res, next)
      expect(TransactionCategoryService.fetchAll).toBeCalled()
    })

    it('should return OK response code', async () => {
      await TransactionCategory.list(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.fetchAll.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.list(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('View transaction category', () => {
    it('should call TransactionCategoryService.fetchById', async () => {
      req.params.id = 1
      await TransactionCategory.view(req, res, next)
      expect(TransactionCategoryService.fetchById).toBeCalledWith(req.params.id)
    })

    it('should return OK response code', async () => {
      await TransactionCategory.view(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.fetchById.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.view(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Fetch transaction category by user id', () => {
    it('should call TransactionCategoryService.fetchByUser', async () => {
      req.params.id = 1
      await TransactionCategory.fetchByUser(req, res, next)
      expect(TransactionCategoryService.fetchByUser).toBeCalledWith(
        req.params.id,
      )
    })

    it('should return OK response code', async () => {
      await TransactionCategory.fetchByUser(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.fetchByUser.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.fetchByUser(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Fetch transaction category by type name', () => {
    it('should call TransactionCategoryService.fetchByType', async () => {
      req.params.typeName = 'categoryTypeName'
      await TransactionCategory.fetchByType(req, res, next)
      expect(TransactionCategoryService.fetchByType).toBeCalledWith(
        req.params.typeName,
      )
    })

    it('should return OK response code', async () => {
      await TransactionCategory.fetchByType(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.fetchByType.mockReturnValue(BoomNotFoundError)

      await TransactionCategory.fetchByType(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })

  describe('Fetch transaction category by type name and user id', () => {
    it('should call TransactionCategoryService.fetchByUserAndType', async () => {
      req.params.id = '123'
      req.params.typeName = 'categoryTypeName'
      await TransactionCategory.fetchByUserAndType(req, res, next)
      expect(TransactionCategoryService.fetchByUserAndType).toBeCalledWith(
        req.params.id,
        req.params.typeName,
      )
    })

    it('should return OK response code', async () => {
      await TransactionCategory.fetchByUserAndType(req, res, next)
      expect(res._isEndCalled()).toBeTruthy()
      expect(res.statusCode).toBe(StatusCodes.OK)
    })

    it('should return error', async () => {
      TransactionCategoryService.fetchByUserAndType.mockReturnValue(
        BoomNotFoundError,
      )

      await TransactionCategory.fetchByUserAndType(req, res, next)

      const jsonResponse = JSON.parse(res._getData())
      expect(next).toBeCalled()
      expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(jsonResponse.message).toBe(errorMessage)
    })
  })
})
