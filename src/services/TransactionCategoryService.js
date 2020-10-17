const TransactionCategory = require('@db/models/TransactionCategoryModel')
const Boom = require('@hapi/boom')

const fetchAll = async () => {
  try {
    return await TransactionCategory.find().populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchById = async id => {
  try {
    return await TransactionCategory.find({ _id: id }).populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchByUser = async user => {
  try {
    return await TransactionCategory.find({ user }).populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchByType = async type => {
  try {
    return await TransactionCategory.find({ type }).populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const fetchByUserAndType = async (user, type) => {
  try {
    return await TransactionCategory.find({ user, type }).populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const create = async ({ name, type, user }) => {
  const category = new TransactionCategory()
  category.name = name
  category.type = type

  if (user != null) {
    category.user = user
  }

  try {
    return await category.save()
  } catch (e) {
    return Boom.badData(e)
  }
}

const update = async (id, payload) => {
  try {
    return await TransactionCategory.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).populate('user')
  } catch (e) {
    return Boom.notFound(e)
  }
}

const deleteById = async id => {
  try {
    return await TransactionCategory.findOneAndDelete({ _id: id })
  } catch (e) {
    return Boom.notFound(e)
  }
}

module.exports = {
  fetchAll,
  fetchById,
  fetchByUser,
  fetchByType,
  fetchByUserAndType,
  update,
  create,
  deleteById,
}
