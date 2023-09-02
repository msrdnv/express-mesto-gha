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
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {
      console.log('Карточка удалена');
      res.end();
    })
    .catch((err) => console.log(err));
};
