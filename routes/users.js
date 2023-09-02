const router = require('express').Router();
const {
  findUsers, findUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', findUser);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
