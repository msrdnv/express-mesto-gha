const mongoose = require('mongoose');

module.exports.handleErrors = ((err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: 'Переданы некорректные данные' });
    return;
  }
  console.error(err);
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});
