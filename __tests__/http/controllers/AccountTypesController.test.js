const AccountTypes = require('@http/controllers/AccountTypesController')
const AccountTypeService = require('@services/AccountTypesService')
const httpMocks = require('node-mocks-http')
const newAccountType = require('../../mock-data/newAccountType.json')
const { StatusCodes } = require('http-status-codes')
const Boom = require('@hapi/boom')

AccountTypeService.create = jest.fn()

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = null
})

describe('Account types create', () => {
  it('should have a create function', () => {
    expect(typeof AccountTypes.create).toBe('function')
  })

  it('should call AccountTypeService.create', async () => {
    req.body = newAccountType
    await AccountTypes.create(req, res, next)
    expect(AccountTypeService.create).toBeCalledWith(newAccountType)
  })

  it('should return 201 response code', async () => {
    req.body = newAccountType
    await AccountTypes.create(req, res, next)
    expect(res.statusCode).toBe(StatusCodes.CREATED)
  })

  it('should return Boom error', async () => {
    AccountTypeService.create.mockReturnValue('skata')

    await AccountTypes.create(req, res, next)
    expect(res._isEndCalled()).toBeTruthy()
    expect(res).toBe('')
  })
})
