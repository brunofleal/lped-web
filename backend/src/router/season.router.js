const express = require('express');
const router = express.Router();
const seasonController = require('../controllers/season.controller');

router.get('/status', (req, res) => res.send('Season OK'));

router
    .route('/')
    .get(seasonController.getCurrentSeason);

module.exports = router;