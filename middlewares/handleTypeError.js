const ERR_CODE = 404;

module.exports.handleTypeError = (err, req, res, next) => {
  if (err.name === 'TypeError') {
    res.status(ERR_CODE).send({ message: 'Запрашиваемый пользователь или карточка не найдены' });
    return;
  }
  next(err);
};
