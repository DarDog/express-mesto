const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, '45ea781744ec7b4e07a1ff7e4adbd95bacff89e3d0266bb0e17a9f12ff31e01e')
  } catch ( err ) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
}
