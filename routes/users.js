const router = require('express').Router();
const {
  getUsers, getUserById, getCurrentUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate')

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo)
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true)
}), getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
