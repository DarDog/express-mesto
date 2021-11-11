const router = require('express').Router();
const {
  getCards, setCard, deleteCardById, addLikeOnCard, removeLikeOnCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', setCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', addLikeOnCard);
router.delete('/:cardId/likes', removeLikeOnCard);

module.exports = router;
