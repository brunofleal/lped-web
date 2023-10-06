const express = require('express');
const router = express.Router();


router.get('/status', (req, res) => res.send('Players OK'));


module.exports = router; ``;