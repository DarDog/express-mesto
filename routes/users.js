const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate')

const regExp = /^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/;

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo)
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true)
}), getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExp)
})
}), updateUserAvatar);

module.exports = router;
