const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');

module.exports = (req, res, next) => {
  let payload;
  try {
    payload = jwt.verify(req.headers.authorization, 'e358ba70e8bff480040c82f19fec72ce1c27bb7a14a2a37002280a9b26559525');
  } catch (err) {
    next(new UnautorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
