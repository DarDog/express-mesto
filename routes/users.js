const router = require('express')
  .Router();
const {
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');
const regExp = require('../regExp/regExp');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .length(24)
        .hex(),
    })
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    avatar: Joi.string()
      .pattern(regExp)
      .required(),
  })
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .pattern(regExp)
        .required(),
    })
}), updateUserAvatar);

module.exports = router;
