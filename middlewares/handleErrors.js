const mongoose = require('mongoose');
const httpConstants = require('http2').constants;
const { CelebrateError } = require('celebrate');
const BadRequestError = require('../utils/BadRequestError');
const UnautorizedError = require('../utils/UnautorizedError');

module.exports.handleErrors = ((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError
    || err instanceof mongoose.Error.ValidationError
    || err instanceof BadRequestError
    || err instanceof CelebrateError) {
    console.log(err.details);
    res.status(httpConstants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err instanceof UnautorizedError) {
    res.status(httpConstants.HTTP_STATUS_UNAUTHORIZED).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(httpConstants.HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    res.status(httpConstants.HTTP_STATUS_CONFLICT).send({ message: 'Пользователь с таким email уже зарегистрирован' });
    return;
  }
  console.log(err.name);
  console.error(err);
  res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  next();
});
