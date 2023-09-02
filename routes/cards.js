const router = require('express').Router();
const { createCard, findCards, deleteCard } = require('../controllers/cards');

router.get('/', findCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
