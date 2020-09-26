const UserModel = require('./Schema')

const upsertUser = async (filter, update) => {
  try {
    return UserModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = { upsertUser }
