const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({message: 'Ошибка на стороне сервера'})
    });
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404
        res.status(ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' })
        return
      }
      const ERROR_CODE = 500
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' })
    });
}

module.exports.setUser = (req, res) => {
  console.log(req.body)
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => {
        if (err.name === 'ValidationError') {
          const ERROR_CODE = 400
          res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' })
          return
        }
      const ERROR_CODE = 500
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' })
      }
    );
}
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' })
        return
      }
      if (err.name === 'CastError') {
        const ERROR_CODE = 404
        res.status(ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' })
        return
      }
      const ERROR_CODE = 500
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' })
    });
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' })
        return
      }
      if (err.name === 'CastError') {
        const ERROR_CODE = 404
        res.status(ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' })
        return
      }
      const ERROR_CODE = 500
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' })
    });
}