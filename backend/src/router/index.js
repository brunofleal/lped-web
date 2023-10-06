const express = require('express');

const router = express.Router();
const playerRoutes = require('./player.router.js');

router.get('/status', (req, res) => res.send('OK'));

router.use('/player', playerRoutes);

module.exports = router;