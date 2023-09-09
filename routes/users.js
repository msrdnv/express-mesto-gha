const router = require('express').Router();
const {
  findUsers, getCurrentUserInfo, findUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/me', getCurrentUserInfo);
router.get('/:userId', findUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
