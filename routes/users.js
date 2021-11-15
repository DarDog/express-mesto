const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo)
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
