const NotFoundError = require('../errors/not-found-err')

module.exports.getNotFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'))
};

module.exports.postNotFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'))
};
