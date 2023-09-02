const Card = require('../models/card');

module.exports.findCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      res.send(data);
      console.log('Карточка удалена');
    })
    .catch((err) => console.log(err));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};
