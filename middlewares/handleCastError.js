const ERR_CODE = 400;

module.exports.handleCastError = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(ERR_CODE).send({ message: 'Переданы некорректные данные' });
    return;
  }
  next(err);
};
