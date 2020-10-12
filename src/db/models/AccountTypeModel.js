const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  notes: {
    type: String,
  },
})

module.exports = mongoose.model('AccountType', AccountTypeSchema)
