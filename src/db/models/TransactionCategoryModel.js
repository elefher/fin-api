const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('@db/models/UserModel')

const TransactionCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

TransactionCategorySchema.index(
  { name: 1, type: 1, user: 1 },
  { unique: true, sparse: true },
)

TransactionCategorySchema.pre('save', async function (next) {
  if (this.user && !(await User.findById(this.user))) {
    return next(new Error(`User ${this.user} cannot be found`))
  }
  return next()
})

module.exports = mongoose.model(
  'TransactionCategory',
  TransactionCategorySchema,
)
