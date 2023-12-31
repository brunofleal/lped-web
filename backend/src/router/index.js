const express = require('express');

const router = express.Router();
const playerRouter = require('./player.router.js');
const teamRouter = require('./team.router.js');
const authRouter = require('./auth.router.js');


router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRouter);
router.use('/player', playerRouter);
router.use('/team', teamRouter);

module.exports = router;