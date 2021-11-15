const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { login, setUser } = require('./controllers/users')

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6183a7100cf93744add39ce2',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', setUser)

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/notFound'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port:${PORT}`);
});
