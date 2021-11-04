const router = require('express').Router();
const { getCards, setCard, deleteCardById } = require('../controllers/cards')

router.get('/', getCards);
router.post('/', setCard);
router.delete('/:cardId', deleteCardById)

module.exports = router;