const router = require('express').Router();
const {
  createCard, findCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', findCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
