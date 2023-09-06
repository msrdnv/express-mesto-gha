const ERR_CODE = 404;

module.exports.handleNotFoundPage = (req, res) => {
  res.status(ERR_CODE).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
};
