const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const setUserId = require('./middlewares/setUserId');
const errorHandler = require('./middlewares/errorHandler');
const notFoundErrorHandler = require('./middlewares/notFoundErrorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setUserId);
app.use('/users', users);
app.use('/cards', cards);
app.use(errorHandler);
app.use(notFoundErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
