const express = require('express');
const matchController = require('../controllers/match.controller');
const router = express.Router();

router.get('/status', (req, res) => res.send('Matches OK'));


router
    .route('/')
    .post(matchController.createMatch)
    .get(matchController.getMatches);

router
    .route('/:id')
    .get(matchController.getMatch)
    .patch(matchController.updateMatch)
    .delete(matchController.deleteMatch);

module.exports = router;