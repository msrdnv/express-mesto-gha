const handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Ошибка: Проверьте параметры запроса' });
    return;
  }
  next(err);
};

const handleCastTypeErrors = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'TypeError') {
    res.status(404).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  next(err);
};

module.exports = {
  handleValidationError,
  handleCastTypeErrors,
};
