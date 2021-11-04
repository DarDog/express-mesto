const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send({ user: user }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.setUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: err.message }))
}