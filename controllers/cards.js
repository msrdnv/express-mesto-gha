const Card = require('../models/card');

const returnCardInfo = (data) => ({
  likes: data.likes,
  _id: data.id,
  name: data.name,
  link: data.link,
  owner: data.owner,
  createdAt: data.createdAt,
});

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data.map((item) => returnCardInfo(item))))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((data) => {
      if (data.deletedCount === 1) {
        res.status(200).send({ message: 'Карточка удалена' });
        return;
      }
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => next(err));
};
