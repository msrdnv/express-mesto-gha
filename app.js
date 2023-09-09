const express = require('express');
const mongoose = require('mongoose');
const index = require('./routes/index');

const { handleErrors } = require('./middlewares/handleErrors');
const { handleNotFoundPage } = require('./middlewares/handleNotFoundPage');
const { createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64f8810dfe23fb6e255c89d1',
  };

  next();
});
// app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', index);
app.use(handleErrors);
app.use('*', handleNotFoundPage);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
