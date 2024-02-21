const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { requireAuth } = require('../middleware/auth');

router.get('/', userController.getAllUsers);
router.post('/signUp', userController.signUpUser);
router.post('/signIn', userController.signInUser);
router.get('/cart', requireAuth, userController.cartAccess);
module.exports = router;
