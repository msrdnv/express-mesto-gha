const Card = require('../models/card');

const returnCardInfo = (data) => ({
  likes: data.likes,
  _id: data.id,
  name: data.name,
  link: data.link,
  owner: data.owner,
  createdAt: data.createdAt,
});

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data.map((item) => returnCardInfo(item))))
    .catch((err) => console.log(err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => console.log(err));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((err) => console.log(err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => console.log(err));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => console.log(err));
};
