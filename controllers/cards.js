const Card = require('../models/card');
const { handleValidationError, handleCastTypeErrors } = require('../utils/utils');

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
    .catch((err) => handleValidationError(err, req, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => handleCastTypeErrors(err, req, res, next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => handleCastTypeErrors(err, req, res, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((data) => res.send(returnCardInfo(data)))
    .catch((err) => handleCastTypeErrors(err, req, res, next));
};
