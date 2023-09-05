const User = require('../models/user');

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
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(returnUserInfo(data)))
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  if (req.body.name || req.body.about) {
    const { name, about } = req.body;
    const user = req.user._id;
    User.findByIdAndUpdate(user, { name, about }, { new: true, runValidators: true })
      .then((data) => res.send(returnUserInfo(data)))
      .catch((err) => next(err));
  } else {
    res.status(400).send({ message: 'Ошибка: Проверьте параметры запроса' });
  }
};

module.exports.updateAvatar = (req, res, next) => {
  if (req.body.avatar) {
    const { avatar } = req.body;
    const user = req.user._id;
    User.findByIdAndUpdate(user, { avatar }, { new: true, runValidators: true })
      .then((data) => res.send(returnUserInfo(data)))
      .catch((err) => next(err));
  } else {
    res.status(400).send({ message: 'Ошибка: Проверьте параметры запроса' });
  }
};
