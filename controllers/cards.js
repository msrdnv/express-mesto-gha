const Card = require('../models/card');

const returnCardInfo = (data) => ({
  likes: data.likes,
  _id: data.id,
  name: data.name,
  link: data.link,
  owner: data.owner,
  createdAt: data.createdAt,
});

const updateCardInfo = (update, req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, update, { new: true })
    .orFail()
    .then((data) => res.send(returnCardInfo(data)))
    .catch(next);
};

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data.map((item) => returnCardInfo(item))))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((data) => res.send(returnCardInfo(data)))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  updateCardInfo({ $addToSet: { likes: req.user._id } }, req, res, next);
};

module.exports.dislikeCard = (req, res, next) => {
  updateCardInfo({ $pull: { likes: req.user._id } }, req, res, next);
};
