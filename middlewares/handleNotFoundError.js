const ERR_CODE = 404;

module.exports.handleNotFoundError = (req, res) => {
  res.status(ERR_CODE).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
};
