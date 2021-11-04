const router = require('express').Router();
const { getUsers, getUserById, setUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/user', getUserById);
router.post('/', setUser);

module.exports = router;