const mongoose = require('mongoose');

const cardsSchema = new mongoose.Shema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true
  },
  link: {
    type: ObjectId,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    rew: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('card', cardsSchema);