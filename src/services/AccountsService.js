const Account = require('@db/models/AccountModel')
const Boom = require('@hapi/boom')

const fetchAllByUser = async (user) => {
  try {
    return await Account.find({ user: user }).populate('type user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchByIdAndUser = async (accountId, user) => {
  try {
    return await Account.find({ _id: accountId, user: user }).populate('type user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const create = async ({ name, currency, balance, notes, type, user }) => {
  const account = new Account()
  account.name = name
  account.currency = currency
  account.balance = balance
  account.notes = notes
  account.type = type
  account.user = user

  try {
    return await account.save()
  } catch (e) {
    return Boom.badData(e)
  }
}

const update = async (accountId, account) => {
  try {
    return await Account.findOneAndUpdate({ _id: accountId }, account, {
      new: true,
    }).populate('type user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const deleteByIdAndUser = async (accountId, user) => {
  try {
    return await Account.findOneAndDelete({ _id: accountId, user: user })
  } catch (e) {
    return Boom.notFound(e)
  }
}

module.exports = { fetchAllByUser, fetchByIdAndUser, update, create, deleteByIdAndUser }
