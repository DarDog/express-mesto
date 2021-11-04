const router = require('express').Router();
const { getUsers, getUserById, setUser } = require('../models/user');

router.get('/', getUsers);
router.get('/user', getUserById);
router.post('users', setUser)

module.exports = router;