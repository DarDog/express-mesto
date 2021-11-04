const router = require('express').Router();
const { getUsers, getUserById, setUser, updateUser, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/user/:userId', getUserById);
router.post('/', setUser);
router.patch('/me', updateUser)
router.patch('/me/avatar', updateUserAvatar)

module.exports = router;