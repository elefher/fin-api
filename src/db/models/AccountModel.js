const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

module.exports = mongoose.model('Account', AccountSchema)
