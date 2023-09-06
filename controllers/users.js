const User = require('../models/user');

const returnUserInfo = (data) => ({
  name: data.name, about: data.about, avatar: data.avatar, _id: data._id,
});

const updateUserInfo = ({ cond }, update, req, res, next) => {
  if (cond) {
    User.findByIdAndUpdate(req.user._id, update, { new: true })
      .then((data) => res.send(returnUserInfo(data)))
      .catch((err) => next(err));
  } else {
    res.status(400).send({ message: 'Ошибка: Проверьте параметры запроса' });
  }
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data.map((item) => returnUserInfo(item))))
    .catch((err) => next(err));
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((data) => res.send(returnUserInfo(data)))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(returnUserInfo(data)))
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  updateUserInfo(
    { cond: req.body.name || req.body.about },
    { name: req.body.name, about: req.body.about },
    req,
    res,
    next,
  );
};

module.exports.updateAvatar = (req, res, next) => {
  updateUserInfo(
    { cond: req.body.avatar },
    { avatar: req.body.avatar },
    req,
    res,
    next,
  );
};
