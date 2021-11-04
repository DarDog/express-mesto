const express = require('express')
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', )

app.use((req, res, next) => {
  req.user = {
    _id: '6183a7100cf93744add39ce2'
  };

  next();
})

app.use('/users', require('./routes/users'))
app.use('/cards', require('./routes/cards'))

app.listen(PORT, () => {
  console.log(`App listening on port:${ PORT }`)
})
