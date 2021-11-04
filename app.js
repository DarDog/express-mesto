const express = require('express')
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', )

app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(`App listening on port:${ PORT }`)
})
