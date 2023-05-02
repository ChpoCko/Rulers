const express = require('express');
const cardControllers = require('../Controllers/cardControllers');
const authenticateToken = require('../middleware/authorization.js');

const router = express.Router();

router.route('/collection').get(authenticateToken, cardControllers.getUserCollection)
router.route('/all-cards').get(cardControllers.getAllCards);
router.route('/game').get(authenticateToken, cardControllers.getThreeCards).post(authenticateToken, cardControllers.insertCard)
router.route('/:id').post(authenticateToken, cardControllers.buyCard)

module.exports = router;
