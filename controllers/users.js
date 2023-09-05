const User = require('../models/user');
const { handleValidationError, handleCastTypeErrors, ERR_CODE } = require('../utils/utils');

const returnUserInfo = (data) => ({
  name: data.name, about: data.about, avatar: data.avatar, _id: data._id,
});

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data.map((item) => returnUserInfo(item))))
    .catch((err) => next(err));
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => res.send(returnUserInfo(data)))
    .catch((err) => handleCastTypeErrors(err, req, res, next));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(returnUserInfo(data)))
    .catch((err) => handleValidationError(err, req, res, next));
};

module.exports.updateProfile = (req, res, next) => {
  if (req.body.name || req.body.about) {
    const { name, about } = req.body;
    const user = req.user._id;
    User.findByIdAndUpdate(user, { name, about }, { new: true, runValidators: true })
      .then((data) => res.send(returnUserInfo(data)))
      .catch((err) => handleValidationError(err, req, res, next));
  } else {
    res.status(ERR_CODE).send({ message: 'Ошибка: Проверьте параметры запроса' });
  }
};

module.exports.updateAvatar = (req, res, next) => {
  if (req.body.avatar) {
    const { avatar } = req.body;
    const user = req.user._id;
    User.findByIdAndUpdate(user, { avatar }, { new: true, runValidators: true })
      .then((data) => res.send(returnUserInfo(data)))
      .catch((err) => handleValidationError(err, req, res, next));
  } else {
    res.status(ERR_CODE).send({ message: 'Ошибка: Проверьте параметры запроса' });
  }
};
