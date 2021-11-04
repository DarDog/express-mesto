const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send({ cards: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.setCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Cards.create({ name, link, owner: _id })
    .then(card => res.send({ card: card }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .then(card => res.send({ card: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.addLikeOnCard = (req, res) => {
  const userId = req.user._id;
  Cards.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .then(card => res.send({ card: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}

module.exports.removeLikeOnCard = (req, res) => {
  const userId = req.user._id;
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .then(card => res.send({ card: card }))
    .catch(err => res.status(500).send({ message: err.message }))
}