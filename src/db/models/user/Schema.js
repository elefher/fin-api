const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  familyName: {
    type: String,
    required: true,
    trim: true,
  },
  givenName: {
    type: String,
    required: true,
    trim: true,
  },
  providerId: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
  },
})

module.exports = mongoose.model('User', UserSchema)
