const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new UnautorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  } catch (err) {
    next(new UnautorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
