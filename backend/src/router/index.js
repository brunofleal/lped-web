const express = require('express');

const router = express.Router();
const playerRouter = require('./player.router.js');
const teamRouter = require('./team.router.js');
const matchRouter = require('./match.router.js');

const authRouter = require('./auth.router.js');


router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRouter);
router.use('/player', playerRouter);
router.use('/team', teamRouter);
router.use('/match', matchRouter);

module.exports = router;