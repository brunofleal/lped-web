const express = require('express');
const teamController = require('../controllers/team.controller');
const router = express.Router();

router.get('/status', (req, res) => res.send('Teams OK'));


router
    .route('/')
    .post(teamController.createTeam)
    .get(teamController.getTeams);

router
    .route('/:id')
    .get(teamController.getTeams)
    .patch(teamController.updateTeam)
    .delete(teamController.deleteTeam);

module.exports = router;