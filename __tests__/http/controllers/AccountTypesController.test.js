const AccountTypes = require('@http/controllers/AccountTypesController')
const AccountTypeService = require('@services/AccountTypesService')
const httpMocks = require('node-mocks-http')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

AccountTypeService.create = jest.fn()
AccountTypeService.update = jest.fn()
AccountTypeService.fetchAll = jest.fn()
AccountTypeService.fetchById = jest.fn()
AccountTypeService.deleteById = jest.fn()

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

describe('Create account types', () => {
  it('should have a create function', () => {
    expect(typeof AccountTypes.create).toBe('function')
  })

  it('should call AccountTypeService.create', async () => {
    await AccountTypes.create(req, res, next)
    expect(AccountTypeService.create).toBeCalledWith(req.body)
  })

  it('should return CREATED response code', async () => {
    await AccountTypes.create(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.CREATED)
  })

  it('should return Boom error', async () => {
    AccountTypeService.create.mockReturnValue(BoomBadDataError)

    await AccountTypes.create(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomBadDataError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Update account types', () => {
  it('should have an update function', () => {
    expect(typeof AccountTypes.update).toBe('function')
  })

  it('should call AccountTypeService.update', async () => {
    req.params.id = 1
    await AccountTypes.update(req, res, next)
    expect(AccountTypeService.update).toBeCalledWith(req.params.id, req.body)
  })

  it('should return OK response code', async () => {
    await AccountTypes.update(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountTypeService.update.mockReturnValue(BoomNotFoundError)

    await AccountTypes.update(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Remove account type', () => {
  it('should have a remove function', () => {
    expect(typeof AccountTypes.remove).toBe('function')
  })

  it('should call AccountTypeService.deleteById', async () => {
    req.params.id = 1
    await AccountTypes.remove(req, res, next)
    expect(AccountTypeService.deleteById).toBeCalledWith(req.params.id)
  })

  it('should return ACCEPTED response code', async () => {
    await AccountTypes.remove(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.ACCEPTED)
  })

  it('should return Boom error', async () => {
    AccountTypeService.deleteById.mockReturnValue(BoomNotFoundError)

    await AccountTypes.remove(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Fetch all account types', () => {
  it('should have a list function', () => {
    expect(typeof AccountTypes.list).toBe('function')
  })

  it('should call AccountTypeService.fetchAll', async () => {
    await AccountTypes.list(req, res, next)
    expect(AccountTypeService.fetchAll).toBeCalled()
  })

  it('should return OK response code', async () => {
    await AccountTypes.list(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountTypeService.fetchAll.mockReturnValue(BoomNotFoundError)

    await AccountTypes.list(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('View account type', () => {
  it('should have a view function', () => {
    expect(typeof AccountTypes.view).toBe('function')
  })

  it('should call AccountTypeService.fetchById', async () => {
    req.params.id = 1
    await AccountTypes.view(req, res, next)
    expect(AccountTypeService.fetchById).toBeCalledWith(req.params.id)
  })

  it('should return OK response code', async () => {
    await AccountTypes.view(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountTypeService.fetchById.mockReturnValue(BoomNotFoundError)

    await AccountTypes.view(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})
