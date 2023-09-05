const ERR_CODE = 500;

module.exports.handleServerError = ((err, req, res, next) => {
  res.status(err.status || ERR_CODE).send({ message: err.message || 'На сервере произошла ошибка' });
  next();
});
