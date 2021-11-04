const mongoose = require('mongoose');

const userShema = new mongoose.Shema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('user', userShema);