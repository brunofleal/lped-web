const express = require('express');
const stratzController = require('../controllers/stratz.controller');
const router = express.Router();

router.get('/status', (req, res) => res.send('Stratz OK'));

router
    .route('/:id')
    .get(stratzController.getStratzPlayerData);

module.exports = router;