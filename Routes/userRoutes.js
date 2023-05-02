const express = require('express');
const userControllers = require('../Controllers/userControllers');
const authenticateToken = require('../middleware/authorization.js');

const router = express.Router();

router.get('/checkauth', userControllers.checkAuth);

router.route('/sign-up').post(userControllers.signUp);

router.route('/login').post(userControllers.login);

router.route('/logout').post(userControllers.logout);

router.route('/freegems').post(authenticateToken, userControllers.freeGems);

router.route('/profile').post(authenticateToken, userControllers.changePassword);

module.exports = router;
