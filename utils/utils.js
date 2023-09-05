const ERR_CODE = 400;

const handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(ERR_CODE).send({ message: 'Ошибка: Проверьте параметры запроса' });
    return;
  }
  next(err);
};

const handleCastTypeErrors = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'TypeError') {
    res.status(ERR_CODE).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  next(err);
};

module.exports = {
  handleValidationError,
  handleCastTypeErrors,
  ERR_CODE,
};
