const express = require('express');
const router = express.Router();
const winnerController = require('../controllers/winnerController');

// Add or update winners for an event
router.post('/:eventId', winnerController.addOrUpdateWinners);

// Get winners for an event
router.get('/:eventId', winnerController.getWinners);

// Delete winners for an event
router.delete('/:eventId', winnerController.deleteWinners);

module.exports = router; 