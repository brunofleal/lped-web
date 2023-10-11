const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/status', (req, res) => res.send('Auth OK'));

router.route('/:token').get(authController.auth);


module.exports = router;