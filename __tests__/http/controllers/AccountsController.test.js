const Accounts = require('@http/controllers/AccountsController')
const AccountsService = require('@services/AccountsService')
const httpMocks = require('node-mocks-http')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

AccountsService.create = jest.fn()
AccountsService.update = jest.fn()
AccountsService.fetchAllByUser = jest.fn()
AccountsService.fetchByIdAndUser = jest.fn()
AccountsService.deleteByIdAndUser = jest.fn()

const errorMessage = 'Error message'
const BoomNotFoundError = Boom.notFound(errorMessage)
const BoomBadDataError = Boom.badData(errorMessage)

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  req.body = { user: 'userId123' }
  res = httpMocks.createResponse()
  next = jest.fn().mockImplementation(err => {
    return Boom.isBoom(err)
      ? res.status(err.output.statusCode).json(err.output.payload)
      : res.status(err.status || 500).json({ message: err.message })
  })
})

describe('Create account', () => {
  it('should have a create function', () => {
    expect(typeof Accounts.create).toBe('function')
  })

  it('should call AccountsService.create', async () => {
    await Accounts.create(req, res, next)
    expect(AccountsService.create).toBeCalledWith(req.body)
  })

  it('should return CREATED response code', async () => {
    await Accounts.create(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.CREATED)
  })

  it('should return Boom error', async () => {
    AccountsService.create.mockReturnValue(BoomBadDataError)

    await Accounts.create(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomBadDataError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Update account types', () => {
  it('should have an update function', () => {
    expect(typeof Accounts.update).toBe('function')
  })

  it('should call AccountService.update', async () => {
    req.params.id = 1
    await Accounts.update(req, res, next)
    expect(AccountsService.update).toBeCalledWith(req.params.id, req.body)
  })

  it('should return OK response code', async () => {
    await Accounts.update(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountsService.update.mockReturnValue(BoomNotFoundError)

    await Accounts.update(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Remove account', () => {
  it('should have a remove function', () => {
    expect(typeof Accounts.remove).toBe('function')
  })

  it('should call AccountsService.deleteByIdAndUser', async () => {
    req.params.id = 1
    await Accounts.remove(req, res, next)
    expect(AccountsService.deleteByIdAndUser).toBeCalledWith(
      req.params.id,
      req.body.user,
    )
  })

  it('should return ACCEPTED response code', async () => {
    await Accounts.remove(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.ACCEPTED)
  })

  it('should return Boom error', async () => {
    AccountsService.deleteByIdAndUser.mockReturnValue(BoomNotFoundError)

    await Accounts.remove(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('Fetch all account types', () => {
  it('should have a list function', () => {
    expect(typeof Accounts.list).toBe('function')
  })

  it('should call AccountService.fetchAllByUser', async () => {
    await Accounts.list(req, res, next)
    expect(AccountsService.fetchAllByUser).toBeCalled()
  })

  it('should return OK response code', async () => {
    await Accounts.list(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountsService.fetchAllByUser.mockReturnValue(BoomNotFoundError)

    await Accounts.list(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})

describe('View account type', () => {
  it('should have a view function', () => {
    expect(typeof Accounts.view).toBe('function')
  })

  it('should call AccountService.fetchByIdAndUser', async () => {
    req.params.id = 1
    req.body.user = 'userid123'
    await Accounts.view(req, res, next)
    expect(AccountsService.fetchByIdAndUser).toBeCalledWith(
      req.params.id,
      req.body.user,
    )
  })

  it('should return OK response code', async () => {
    await Accounts.view(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res.statusCode).toBe(StatusCodes.OK)
  })

  it('should return Boom error', async () => {
    AccountsService.fetchByIdAndUser.mockReturnValue(BoomNotFoundError)

    await Accounts.view(req, res, next)

    const jsonResponse = JSON.parse(res._getData())
    expect(next).toBeCalledWith(BoomNotFoundError)
    expect(jsonResponse.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(jsonResponse.message).toBe(errorMessage)
  })
})
