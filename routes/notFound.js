const router = require('express').Router();
const { NotFoundErr } = require('../errors/not-found-err');

app.use((req, res, next) => {
  next(new NotFoundErr('Запрашиваемый ресурс не найден'))
})

module.exports = router;
