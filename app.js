const http = require('http');
const server = http.createServer();
const express = require('express')
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use('users', require('./routes/users'))

app.listen(PORT, () => {
  console.log(`App listening on port:${ PORT }`)
})
