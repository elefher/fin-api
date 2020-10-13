const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AccountType = require('@db/models/AccountTypeModel')
const User = require('@db/models/UserModel')

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  balance: {
    type: Number,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'AccountType',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

AccountSchema.index({ name: 1, user: 1 }, { unique: true })

AccountSchema.pre('save', async function (next) {
  const accountType = await AccountType.findById(this.type)
  const user = await User.findById(this.user)

  if (!user) {
    return next(new Error(`User ${this.user} cannot be found`))
  } else if (!accountType) {
    return next(new Error(`Account type ${this.type} cannot be found`))
  }
  return next()
})

module.exports = mongoose.model('Account', AccountSchema)
