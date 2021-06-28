const router = require('express').Router();
const {
    getAllUser, createUser, getUserById, deleteUserById, updateUserById
} = require('../controllers');
const {
    checkIsUserPresent, changeUserValidator, checkNewUser
} = require('../middlewares');

router.get('/', getAllUser);

router.post('/', changeUserValidator, checkNewUser, createUser);

router.get('/:id', checkIsUserPresent, getUserById);

router.delete('/:id', checkIsUserPresent, deleteUserById);

router.patch('/:id', changeUserValidator, updateUserById);

module.exports = router;
