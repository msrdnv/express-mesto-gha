module.exports.notFoundErrorHandler = (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден. Проверьте URL и метод запроса' });
};
