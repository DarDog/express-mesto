module.exports.getNotFound = (req, res) => {
  const ERROR_CODE = 404;
  res.status(ERROR_CODE).send({message: 'Запрашиваемый ресурс не найден'});
}

module.exports.postNotFound = (req, res) => {
  const ERROR_CODE = 404;
  res.status(ERROR_CODE).send({message: 'Запрашиваемый ресурс не найден'});
}