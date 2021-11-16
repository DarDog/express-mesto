const router = require('express').Router();
const {
  getCards, setCard, deleteCardById, addLikeOnCard, removeLikeOnCard,
} = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  })
}), setCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
}), deleteCardById);
router.put('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
}), addLikeOnCard);
router.delete('/:cardId/likes',celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
}), removeLikeOnCard);

module.exports = router;
