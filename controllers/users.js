const User = require('../models/user');

module.exports.findUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};
