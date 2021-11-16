const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

module.exports.getCurrentUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user)
    })
    .catch(err => {
      res.status(500).send({ message: 'ошибка на стороне сервера' })
    })
}

module.exports.setUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    }))
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      const matched = bcrypt.compare(password, user.password)
      const token = jwt.sign(
        { _id: user._id.toString() },
        '45ea781744ec7b4e07a1ff7e4adbd95bacff89e3d0266bb0e17a9f12ff31e01e',
        { expiresIn: '7d' }
      );

      return { matched, token };
    })
    .then(result => {
      if (!result.matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      res.cookie('token', result.token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })

        .end();
    })
    .catch(err => {
      res
        .status(401)
        .send({ message: err.message })
    })
}
