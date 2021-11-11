const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({ message: 'Пользователь с таким _id не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
        return;
      }
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.setUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(400).send({ message: 'Поля name и about должны быть заполнены' });
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      if (err.name === 'CastError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(400).send({ message: 'Поле avatar должно быть заполнено' });
    return;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      if (err.name === 'CastError') {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
    });
};
