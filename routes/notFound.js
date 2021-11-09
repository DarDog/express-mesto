const router = require('express').Router();
const { getNotFound, postNotFound } = require('../controllers/notFound')

router.get('/', getNotFound);
router.get('/*', getNotFound);
router.post('/', postNotFound);
router.post('/*', postNotFound);

module.exports = router;