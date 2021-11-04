const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send({ cards: cards }))
    .catch(err => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({message: 'Ошибка на стороне сервера'})
    });
}

module.exports.setCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then(card => res.send({ card: card }))
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

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .then(card => res.send({ card: card }))
    .catch(err => {
      if (err.name === 'CastError') {
        const ERROR_CODE = 404
        res.status(ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' })
        return
      }
      const ERROR_CODE = 500
      res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' })
    });
}

module.exports.addLikeOnCard = (req, res) => {
  const userId = req.user._id;
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(card => res.send({ card: card }))
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

module.exports.removeLikeOnCard = (req, res) => {
  const userId = req.user._id;
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .then(card => res.send({ card: card }))
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