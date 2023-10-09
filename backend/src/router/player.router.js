const express = require('express');
const playerController = require('../controllers/player.controller');
const router = express.Router();


router.get('/status', (req, res) => res.send('Players OK'));


router
    .route('/')
    .post(playerController.createPlayer)
    .get(playerController.getPlayers);

router
    .route('/:dotaId')
    .get(playerController.getPlayer)
    .patch(playerController.updatePlayer)
    .delete(playerController.deletePlayer);

module.exports = router;