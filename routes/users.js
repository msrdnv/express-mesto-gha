const router = require('express').Router();
const { findUsers, findUser, createUser } = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', findUser);
router.post('/', createUser);

module.exports = router;
