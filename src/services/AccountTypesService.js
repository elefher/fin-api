const AccountType = require('@db/models/AccountTypeModel')
const Boom = require('@hapi/boom')

const fetchAll = async () => {
  try {
    return await AccountType.find()
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchById = async accountTypeId => {
  try {
    return await AccountType.find({ _id: accountTypeId })
  } catch (e) {
    return Boom.notFound(e)
  }
}

const create = async ({ name, notes }) => {
  const accountType = new AccountType()
  accountType.name = name
  accountType.notes = notes

  try {
    return await accountType.save()
  } catch (e) {
    return Boom.badData(e)
  }
}

const update = async (accountTypeId, accountType) => {
  try {
    return await AccountType.findOneAndUpdate(
      { _id: accountTypeId },
      accountType,
      { new: true },
    )
  } catch (e) {
    return Boom.notFound(e)
  }
}

const deleteById = async accountTypeId => {
  try {
    return await AccountType.findOneAndDelete({ _id: accountTypeId })
  } catch (e) {
    return Boom.notFound(e)
  }
}

module.exports = { fetchAll, fetchById, update, create, deleteById }
