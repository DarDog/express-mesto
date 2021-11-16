const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { login, setUser } = require('./controllers/users')
const auth = require('./middlewares/auth')
const { errorHandler } = require('./middlewares/errors')
const { errors } = require('celebrate')

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', setUser);

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
