const ERR_CODE = 400;

module.exports.handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(ERR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }
  next(err);
};
