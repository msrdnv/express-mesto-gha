const mongoose = require('mongoose');
const httpConstants = require('http2').constants;

module.exports.handleErrors = ((err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    console.error(err);
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  console.error(err);
  res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  next();
});
