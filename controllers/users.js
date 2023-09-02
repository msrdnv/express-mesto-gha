const User = require('../models/user');

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const user = req.user._id;
  User.findByIdAndUpdate(user, { name, about }, { new: true, runValidators: true })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const user = req.user._id;
  User.findByIdAndUpdate(user, { avatar }, { new: true, runValidators: true })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};
