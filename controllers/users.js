const User = require('../models/user');

const ERROR_CODE = 400;
const ERR_MSG = { message: 'Ошибка: Проверьте параметры запроса' };

const handleValidationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(ERROR_CODE).send(ERR_MSG);
    return;
  }
  next(err);
};

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
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        res.status(404).send({ message: 'Такого пользователя нет' });
        return;
      }
      next(err);
    });
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
    res.status(ERROR_CODE).send(ERR_MSG);
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
    res.status(ERROR_CODE).send(ERR_MSG);
  }
};
