const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64f358b939b9fc4d6062d897',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ message: err.message || 'На сервере произошла ошибка' });
  next();
});
app.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
