module.exports.errorHandler = ((err, req, res, next) => {
  if (err.status === 404) {
    next(err);
    return;
  }
  res.status(err.status || 500).send({ message: err.message || 'На сервере произошла ошибка' });
});
