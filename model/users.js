const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First Name is required']
  },
  last_name: {
    type: String,
    required: [true, 'Last Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: String,
    default: 'SYSTEM'
  },
  updated_by: {
    type: String,
    default: 'SYSTEM'
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'users'
})

module.exports = mongoose.model('users', userSchema)
