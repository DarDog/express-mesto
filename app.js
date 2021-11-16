const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { login, setUser } = require('./controllers/users')
const auth = require('./middlewares/auth')
const { errorHandler } = require('./middlewares/errors')
const { celebrate, Joi, errors } = require('celebrate')

const { PORT = 3000 } = process.env;
const app = express();
const regExp = /^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8).max(35),
  })
}), setUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/notFound'));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port:${PORT}`);
});
